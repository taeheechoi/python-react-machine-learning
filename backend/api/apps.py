import joblib
from django.apps import AppConfig
from django.conf import settings


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    MODEL_FILE = settings.MODELS / 'WeightPredictionLinRegModel.joblib'
    model = joblib.load(MODEL_FILE)  # the trained model is loaded only once
