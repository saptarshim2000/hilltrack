from django.urls import path
from .views import DriverInfoViewSet, export_driver_info_csv, get_driver_info
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'driverinfo', DriverInfoViewSet, basename='driverinfo')

urlpatterns = router.urls + [
    path('export/csv/', export_driver_info_csv, name='export_driver_info_csv'),
    path('get_driver_info/', get_driver_info, name='get_driver_info'),
]
