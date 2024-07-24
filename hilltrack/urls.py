from django.contrib import admin
from django.urls import path, include
from formapp.views import index

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('formapp.urls')),
    path('', index, name='index'),
]
