from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from formapp.views import DriverInfoViewSet, VehicleInfoViewSet, get_driver_info, export_driver_info_csv, index

router = DefaultRouter()
router.register(r'driverinfo', DriverInfoViewSet)
router.register(r'vehicleinfo', VehicleInfoViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/driverinfo/', get_driver_info, name='get_driver_info'),
    path('api/export/', export_driver_info_csv, name='export_driver_info_csv'),
    path('', index, name='index'),
]
