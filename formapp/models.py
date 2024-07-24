from django.db import models

class DriverInfo(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    vehicle_number = models.CharField(max_length=100)
    number_of_parcels = models.IntegerField()
    notes = models.TextField(blank=True, null=True)
    signatures = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class VehicleInfo(models.Model):
    vehicle_number = models.CharField(max_length=100)
    vehicle_type = models.CharField(max_length=100)
    driver_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    registration_date = models.DateField()
    last_service_date = models.DateField()

    def __str__(self):
        return self.vehicle_number
