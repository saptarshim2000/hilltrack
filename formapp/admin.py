from django.contrib import admin
from .models import DriverInfo, VehicleInfo

class VehicleInfoAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'contact_number', 'vehicle_number', 'number_of_parcels')
    search_fields = ('first_name', 'last_name', 'vehicle_number')
    list_filter = ('vehicle_number',)

admin.site.register(DriverInfo)
admin.site.register(VehicleInfo, VehicleInfoAdmin)
