import csv
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import DriverInfo
from .serializers import DriverInfoSerializer
from django.http import JsonResponse
from django.shortcuts import render
from django.http import HttpResponse


def home(request):
    return HttpResponse("<h1>Welcome to Hilltrack</h1>")

class DriverInfoViewSet(viewsets.ModelViewSet):
    queryset = DriverInfo.objects.all()
    serializer_class = DriverInfoSerializer

    def perform_create(self, serializer):
        serializer.save()

@api_view(['GET'])
def get_driver_info(request):
    driver_info_list = DriverInfo.objects.all()
    serializer = DriverInfoSerializer(driver_info_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def export_driver_info_csv(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="driver_info.csv"'

    writer = csv.writer(response)
    writer.writerow(['First Name', 'Last Name', 'Contact Number', 'Vehicle Number', 'Number of Parcels', 'Notes', 'Signatures'])

    driver_info_list = DriverInfo.objects.all()
    for driver_info in driver_info_list:
        writer.writerow([
            driver_info.first_name,
            driver_info.last_name,
            driver_info.contact_number,
            driver_info.vehicle_number,
            driver_info.number_of_parcels,
            driver_info.notes,
            driver_info.signatures
        ])

    return response
