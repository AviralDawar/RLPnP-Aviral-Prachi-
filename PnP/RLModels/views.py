from django.shortcuts import render
from django.http import Http404, HttpResponse
from RLModels.serializers import uploadFileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import RLInput, uploadFile
import pandas as pd
from .utils import get_plot
import random
import json

import sys
sys.path.insert(1, '../rl_libs/')
from data_driven import data_run


saveFile = ""

class upList(APIView):
    def get(self, request, format=None):
        docs = uploadFile.objects.all()
        serializer = uploadFileSerializer(docs, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = uploadFileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class upDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return uploadFile.objects.get(pk=pk)
        except uploadFile.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        uploadFile = self.get_object(pk)
        serializer = uploadFileSerializer(uploadFile)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        uploadFile = self.get_object(pk)
        serializer = uploadFileSerializer(uploadFile, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        uploadFile = self.get_object(pk)
        uploadFile.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Create your views here.


def index(request):
    return render(request, "index.html")


@api_view(['GET', 'POST'])
def disp(request):
    print("CALLED VIEWS.DISPLAY")
    if(request.method == 'POST'):
        temp = request.POST
        filename = './dataset/' + temp.get('filename', 'abc.csv')
        print("Filename ", filename)
        f = request.FILES.get('filename')
        print("File: ", f)
        if (f != None):
            with open(filename, 'wb+') as destination:
                for chunk in f.chunks():
                    destination.write(chunk)
        else:
            return render(request, 'index.html')

        data = pd.read_csv(filename)
        cols = list(data.columns)
        saveFile = filename
        my_dict = {
            'cols': cols,
            'df': data.to_json(),
            'filename': filename,
        }

    return HttpResponse(json.dumps(my_dict))



def run(request):
    print("CALLED VIEWS.RUN")
    if(request.method == 'POST'):
        temp = request.POST
        print(f"temp: {temp}")

        print("calling data_run")
        best_actions, best_rewards, output_file = data_run(temp)

        

        data = pd.read_csv('../PnP/dataset/abc.csv')
        distribution_area = temp['rewards.value']
        quantity = int(temp['quantity'])

        num_states = len(data[distribution_area].unique())
        titles = data[distribution_area].unique()

        xax = titles.tolist()
        yax = best_actions.tolist()
        
        print(type(xax))
        print(type(yax))

        data = {'xax': xax, 'yax': yax}


    return HttpResponse(json.dumps(data))

