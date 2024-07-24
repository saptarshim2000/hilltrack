from django.contrib import admin
from .models import VehicleInfo

class VehicleInfoAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'contact_number', 'vehicle_number', 'number_of_parcels')

admin.site.register(VehicleInfo, VehicleInfoAdmin)
