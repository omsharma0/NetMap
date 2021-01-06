
from django.contrib.auth.decorators import login_required, permission_required
from cxmx.views import addNEView, homeView, addNEView, subnetCreateView
from django.urls import path
from . import views
urlpatterns = [ 
    path('', login_required(homeView.as_view()) , name='home'),
    path('addNE/', login_required(addNEView.as_view()) , name='addNE'),
    path('subnet/add/', subnetCreateView.as_view(), name='subnetCreate')
]