from django.contrib import admin
from .models import Cluster, ClusterComment, Interface, NEComment, Network, NetworkElement, NetworkFunction, Site, SiteComment
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