from rest_framework import serializers
from .models import OCRFile


class OCRFileSerializer(serializers.ModelSerializer):
    file_name = serializers.SerializerMethodField()

    class Meta():
        model = OCRFile
        fields = ('file', 'timestamp', 'file_name')

    def get_file_name(self, obj):
        return f'{obj.file}'

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)
    #     representation['result'] = self.context['result']

    #     return representation
