from rest_framework import serializers
from .models import RLInput,uploadFile

class uploadFileSerializer(serializers.ModelSerializer):
    class Meta:
        model = uploadFile
        fields = ['docfile']

class RLInputSerializer(serializers.ModelSerializer):
    class Meta:
        model = RLInput
        fields = ['alias','states','attributes','bucket_size','episodes','epochs','total_available','file_name']