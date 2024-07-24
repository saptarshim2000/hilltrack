from rest_framework import serializers
from .models import DriverInfo

class DriverInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DriverInfo
        fields = ['first_name', 'last_name', 'contact_number', 'vehicle_number', 'number_of_parcels', 'notes', 'signatures']
