from typing import ClassVar
from django import template
from cxmx.models import Cluster, Site


register = template.Library()

@register.filter(name='clustersOfSite')

def clustersOfSite(site_id):
    site = Site.objects.get(id=site_id)
    cluster_list = Cluster.objects.filter(site = site )
    return cluster_list
