from django.contrib import admin
from django.urls import path, include
from formapp.views import index  # Import the correct view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('formapp.urls')),
    path('', index, name='index'),  # Use the correct view
]
