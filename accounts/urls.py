from django.conf.urls import include
from accounts.views import Registration, Welcome
from django.urls import path, include
from . import views
urlpatterns = [ 
    path('', include('django_registration.backends.activation.urls')),
    path('', include('django.contrib.auth.urls'))
    
]