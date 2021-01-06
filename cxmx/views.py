from re import template
from django.shortcuts import render
from django.urls import reverse, reverse_lazy
from django.views.generic.base import TemplateView
from django.views.generic.edit import CreateView, DeleteView, UpdateView
from .models import Network, Site, Cluster, Subnet 
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.messages.views import SuccessMessageMixin
# Create your views here.
class homeView(TemplateView):
    template_name = "home.html"

    def get_context_data(self, **kwargs):
        context=super().get_context_data(**kwargs)
        context['networkList'] = Network.objects.all
        context['siteList'] = Site.objects.all
        context['clusterList'] = Cluster.objects.all
        return context

class addNEView(TemplateView):
    template_name = 'addNE.html'

class subnetCreateView(LoginRequiredMixin, SuccessMessageMixin, CreateView):
    model = Subnet
    fields = ['name', 'tenant', 'domain', 'net', 'zone', 'ipV4Net', 'ipv6Net', 'dhcp']
    template_name = 'subnet.html'
    success_url = reverse_lazy('subnetCreate')
    success_message = "%(name)s was created successfully"

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super().form_valid(form)
