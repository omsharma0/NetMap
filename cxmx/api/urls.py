from django.conf.urls import url
from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views
urlpatterns = [ 
    path('', views.NetworkList.as_view()),
    path('getMyNetworks/', views.NetworkList.as_view()),
    path('getClusterDetail/<int:pk>/', views.CusterDetail.as_view()),
    path('getSiteDetail/<int:pk>/', views.SiteDetail.as_view()),
    path('getNEDetail/<int:pk>/', views.NEDetail.as_view()),
    path('createSiteComment/', views.SiteComment.as_view()),
    path('createNEComment/', views.NEComment.as_view()),
    path('createClusterComment/', views.ClusterComment.as_view()),
    ]
urlpatterns = format_suffix_patterns(urlpatterns)