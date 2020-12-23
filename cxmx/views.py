from django.shortcuts import render
from django.views.generic.base import TemplateView
from .models import Network, Site, Cluster
from django.contrib.auth.mixins import LoginRequiredMixin
# Create your views here.
class homeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context=super().get_context_data(**kwargs)
        context['networkList'] = Network.objects.all
        context['siteList'] = Site.objects.all
        context['clusterList'] = Cluster.objects.filter()
        return context