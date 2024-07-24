from django.contrib import admin
from .models import DriverInfo

@admin.register(DriverInfo)
class DriverInfoAdmin(admin.ModelAdmin):
    list_display = ['first_name', 'last_name', 'contact_number', 'vehicle_number', 'number_of_parcels', 'notes', 'signatures']
