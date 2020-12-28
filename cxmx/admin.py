from django.contrib import admin
from .models import Cluster, ClusterComment, Domain, Interface, NEComment, Net, Network, NetworkElement, NetworkFunction, Site, SiteComment, Subnet, Tenant, Zone
# Register your models here.
admin.site.register(Network)
admin.site.register(Site)
admin.site.register(NetworkElement)
admin.site.register(NetworkFunction)
admin.site.register(Interface)
admin.site.register(Cluster)
admin.site.register(SiteComment)
admin.site.register(ClusterComment)
admin.site.register(NEComment)
admin.site.register(Tenant)
admin.site.register(Domain)
admin.site.register(Zone)
admin.site.register(Net)
admin.site.register(Subnet)