import easyocr
import numpy as np
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .apps import ApiConfig
from .serializers import OCRFileSerializer

# Create your views here.


class WeightPrediction(APIView):
    def post(self, request):

        data = request.data
        height = data['height']
        gender = data['gender']

        if gender == 'male':
            gender = 0
        elif gender == 'female':
            gender = 1
        else:
            return Response('Gender field is invalid', status=status.HTTP_400_BAD_REQUEST)

        lin_reg_model = ApiConfig.model
        weight_predicted = lin_reg_model.predict([[gender, height]])[0][0]
        weight_predicted = np.round(weight_predicted, 1)
        response_dict = {'weight': weight_predicted}
        return Response(response_dict, status=status.HTTP_200_OK)


class FileView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def read(self, file_path):
        THRESHOLD = 0.5
        reader = easyocr.Reader(['ko', 'en'])
        texts = reader.readtext(file_path)
        result = []

        for bbox, text, conf in texts:
            if conf > THRESHOLD:
                result.append(text)

        return ','.join(result)

    def post(self, request, *args, **kwargs):
        file_serializer = OCRFileSerializer(data=request.data, context={'request': request})
        # https://stackoverflow.com/questions/35522768/django-serializer-imagefield-to-get-full-url

        if file_serializer.is_valid():
            file_serializer.save()
            # file_path = settings.MEDIA_ROOT / file_serializer.data.get("file_name")
            data = file_serializer.data
            data['result'] = self.read(file_serializer.data.get('file'))
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
