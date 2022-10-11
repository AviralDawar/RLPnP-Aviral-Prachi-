from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from RLModels import views

urlpatterns = [
    path('rlmodels/', views.index),
    path('rlmodels/upfile',views.disp,name='call'),
    path('rlmodels/runmodel',views.run, name='run'),
]

urlpatterns = format_suffix_patterns(urlpatterns)