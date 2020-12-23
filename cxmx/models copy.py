from django.db import models
from django.conf import settings
from rest_framework.fields import JSONField

class CommonInfo(models.Model):
    created_at = models.DateTimeField(
        'Created at',
        auto_now_add=True,
        db_index=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name='Created by',
        blank=True, null=True,
        related_name="%(app_label)s_%(class)s_created",
        on_delete=models.SET_NULL)
    lastmodified_at = models.DateTimeField(
        'Last modified at',
        auto_now=True,
        db_index=True)
    lastmodified_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name='Last modified by',
        blank=True, null=True,
        related_name="%(app_label)s_%(class)s_lastmodified",
        on_delete=models.SET_NULL)

    class Meta:
        abstract = True

# ----------------Node Common Info --------------------------------------

class CommonInfoNetwork(CommonInfo):
    name = models.CharField(max_length=40)
    STATUS_OPTIONS = (
        ('DRAFT', 'Draft'),
        ('DRAFT-A', 'DraftApproved'),
        ('DEPLOYED', 'Deployed'),
        ('IN-SERVICE', 'InService'),
        ('OUT-OF-SERVICE', 'OutOfService'),
    )

    status = models.CharField(max_length=14, choices=STATUS_OPTIONS, default=STATUS_OPTIONS[0][0])

    
    class Meta:
        abstract = True

# Create your models here.

class Network (CommonInfoNetwork):
    
    def __str__(self):
         return self.name

class Site(CommonInfoNetwork):
    network = models.ForeignKey(Network, on_delete=models.PROTECT, related_name='netName')
    
    def __str__(self):
         return self.name

class Cluster(CommonInfoNetwork):

        TELCOCLOUD = 'TC'
        ITCLOUD = 'ITC' 
        PNFCLUSTER = 'PNFC' 

        CLUSTER_TYPE_CHOICES = [
            (TELCOCLOUD, 'Telco Cloud'),
            (ITCLOUD, 'IT Cloud'),
            (PNFCLUSTER, 'PNF Cluster')
        ]
        site = models.ForeignKey(Site, on_delete=models.PROTECT, related_name='clusters')
        clusterType = models.CharField(
            max_length=4,
            choices=CLUSTER_TYPE_CHOICES,
            default=TELCOCLOUD
        )
        clusterDetail = JSONField

        def is_upperclass(self):
            return self.clusterType in {self.TELCOCLOUD, self.ITCLOUD, self.PNFCLUSTER}
        def __str__(self):
         return '%s  : %s' % (self.site.name, self.name)


class NetworkFunction(CommonInfo):
     name = models.CharField(max_length=20)
     
     
     def __str__(self):
         return self.name


class ReferencePoint(CommonInfo):
    name = models.CharField(max_length=20)
    networkFunctions =  models.ManyToManyField(NetworkFunction)
    
    def __str__(self):
         return self.name
    
class NetworkElement(CommonInfoNetwork):
    networkFunction = models.ForeignKey(NetworkFunction, on_delete=models.PROTECT,related_name='networkFunction_name')
    cluster = models.ForeignKey(Cluster, on_delete=models.PROTECT,related_name='neList')
    product = models.CharField(max_length=20)
    vendor = models.CharField(max_length=20, null=True, blank =True)
    swRelease = models.CharField(max_length=20, null=True, blank =True)
    

    def __str__(self):
        return '%s  : %s %s' % (self.name, self.product, self.swRelease)

class Interface(CommonInfoNetwork):
    networkElement = models.ForeignKey(NetworkElement, on_delete=models.PROTECT,related_name='interfaces')
    referencePoint = models.ForeignKey(ReferencePoint, on_delete=models.PROTECT, null=True, blank =True)
    ipv4Address = models.GenericIPAddressField(protocol='IPv4', null=True, blank =True)
    ipv6Address = models.GenericIPAddressField(protocol='IPv6', null=True, blank =True)
    
    def __str__(self):
         return self.name
  


class Connection(CommonInfoNetwork):
    interfaces = models.ManyToManyField(Interface)


class Comment(CommonInfo):
    title = models.TextField(max_length=100)
    comment = models.TextField()
    class Meta:
        ordering = ['-created_at']
        abstract = True


class SiteComment(Comment):
    comments = models.ForeignKey(Site, on_delete=models.PROTECT, related_name='sitecomments')


class ClusterComment(Comment):
    comments = models.ForeignKey(Cluster, on_delete=models.PROTECT, related_name='clustercomments')

class NEComment(Comment):
    comments = models.ForeignKey(NetworkElement, on_delete=models.PROTECT, related_name='necomments')