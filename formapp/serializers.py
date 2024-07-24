from rest_framework import serializers
from .models import DriverInfo, VehicleInfo

class DriverInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverInfo
        fields = '__all__'

class VehicleInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = VehicleInfo
        fields = '__all__'
