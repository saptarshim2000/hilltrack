from django.db import models

class VehicleInfo(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    contact_number = models.CharField(max_length=15)
    vehicle_number = models.CharField(max_length=20)
    number_of_parcels = models.IntegerField()
    notes = models.TextField(blank=True, null=True)
    signatures = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.vehicle_number}"
