
from django.contrib.auth.decorators import login_required, permission_required
from cxmx.views import homeView
from django.urls import path
from . import views
urlpatterns = [ 
    path('', login_required(homeView.as_view()) , name='home')
]