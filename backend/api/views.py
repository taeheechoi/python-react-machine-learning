import numpy as np
from rest_framework.response import Response
from rest_framework.views import APIView

from .apps import ApiConfig

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
            return Response('Gender field is invalid', status=400)

        lin_reg_model = ApiConfig.model
        weight_predicted = lin_reg_model.predict([[gender, height]])[0][0]
        weight_predicted = np.round(weight_predicted, 1)
        response_dict = {'weight': weight_predicted}
        return Response(response_dict, status=200)
