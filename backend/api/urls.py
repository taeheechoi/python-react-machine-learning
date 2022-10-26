from django.urls import path
from .views import FileView, WeightPrediction


urlpatterns = [
    path('weight/', WeightPrediction.as_view(), name='weight_prediction'),
    path('ocr-file/', FileView.as_view(), name='ocr-file')
]
