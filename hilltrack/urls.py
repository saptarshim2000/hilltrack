from django.contrib import admin
from django.urls import path, include
from formapp.views import home  # Import the home view

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('formapp.urls')),
    path('', home, name='home'),  # Add the home view for the root URL
]
