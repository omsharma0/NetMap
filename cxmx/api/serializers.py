from django.db import models
from rest_framework import serializers
from django.conf import settings
from cxmx.models import Cluster, ClusterComment, NEComment, Network, NetworkElement, NetworkFunction, Site, Interface, SiteComment, Subnet
from django.contrib.auth import get_user_model
User = get_user_model()

class userSerializer(serializers.ModelSerializer):
    class Meta(object):
        model = User
        fields = ('username')

#-------------Comment Serializers ---------------------

class siteCommentSerializer(serializers.ModelSerializer):
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    #created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all()) 
    
      
    class Meta:
      model = SiteComment
      fields = ['id', 'created_at','created_by','title', 'comment', 'comments']
      
class siteCommentShowSerializer(serializers.ModelSerializer):
    #created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())
    created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all()) 
    
    class Meta:
      model = SiteComment
      fields = ['id', 'created_at','created_by','title', 'comment', 'comments']


class clusterCommentSerializer(serializers.ModelSerializer):
    #created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all()) 
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())   
    class Meta:
      model = ClusterComment
      fields = ['id', 'created_at', 'created_by' ,'title', 'comment', 'comments']

class clusterCommentShowSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all()) 
    #created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())   
    class Meta:
      model = ClusterComment
      fields = ['id', 'created_at', 'created_by' ,'title', 'comment', 'comments']

class NECommentSerializer(serializers.ModelSerializer):
    #created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())    
    class Meta:
      model = NEComment
      fields = ['id', 'created_at', 'created_by' ,'title', 'comment', 'comments']

class NECommentShowSerializer(serializers.ModelSerializer):
    created_by = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    #created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())    
    class Meta:
      model = NEComment
      fields = ['id', 'created_at', 'created_by' ,'title', 'comment', 'comments']

# -----------------CommentSerializers END ----------------------------------------------------------

class networkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Network
        fields = ['name']

class networkFunctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NetworkFunction
        fields = ['id', 'name']

class subnetSerializer(serializers.ModelSerializer):
    domain=serializers.StringRelatedField()
    class Meta:
        model = Subnet
        fields = '__all__'

class interfaceSerializer(serializers.ModelSerializer):
    #subnets = subnetSerializer(read_only=True)
    class Meta:
        model = Interface
        fields = '__all__'
        depth = 2


class networkElementSerializer(serializers.ModelSerializer):
    networkFunction = serializers.StringRelatedField()
    interfaces = interfaceSerializer(many=True, read_only=True)
    necomments = NECommentShowSerializer(many=True, read_only=True)
    cluster = serializers.StringRelatedField()
    tenant = serializers.StringRelatedField()
    #tenant = serializers.CharField(source='tenant.name')

    class Meta:
      model = NetworkElement
      fields = ['id', 'name', 'cluster', 'swRelease', 'product','networkFunction', 'tenant', 'necomments', 'interfaces']


class siteSerializer(serializers.ModelSerializer):
    sitecomments = siteCommentShowSerializer(many=True, read_only=True)
    class Meta:
        model = Site
        fields = ['id','name','sitecomments' ]

class clusterSerializer(serializers.ModelSerializer):
    clusterNEList = networkElementSerializer(many=True, read_only=True)
    clustercomments = clusterCommentShowSerializer(many=True, read_only=True)
    clusters = serializers.CharField(source='site.name')
    class Meta:
        model = Cluster
        fields = ['id','name','clusterType','clusters','clusterNEList','clustercomments']


