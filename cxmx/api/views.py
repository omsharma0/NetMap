
from django.http import request
from rest_framework.decorators import api_view
from rest_framework.response import Response
from cxmx.models import Cluster, Network, NetworkElement, Site, SiteComment, NEComment, ClusterComment
from .serializers import NECommentSerializer, clusterCommentSerializer, networkElementSerializer, networkSerializer, clusterSerializer, networkElementSerializer, siteCommentSerializer, siteSerializer
from rest_framework import generics

# Create your views here.
class NetworkList(generics.ListCreateAPIView):
    queryset = Network.objects.filter(name='3UK Maya')
    serializer_class = networkSerializer
    
class CusterDetail(generics.RetrieveAPIView):
    serializer_class = clusterSerializer
    queryset = Cluster.objects.all()

class ClusterComment(generics.CreateAPIView):
    serializer_class = clusterCommentSerializer
    queryset = ClusterComment.objects.all() 
   # def get_queryset(self):
    #    cluster = self.request.query_params.get('cluster', '')
     #   queryset = Cluster.objects.filter(id=cluster)
      #  return queryset

class SiteDetail(generics.RetrieveAPIView):
    serializer_class = siteSerializer
    queryset = Site.objects.all()

class SiteComment(generics.CreateAPIView):
    serializer_class = siteCommentSerializer
    queryset = SiteComment.objects.all()
    
class NEDetail(generics.RetrieveAPIView):
    serializer_class = networkElementSerializer
    queryset = NetworkElement.objects.all()

class NEComment(generics.CreateAPIView):
    serializer_class = NECommentSerializer
    queryset = NEComment.objects.all() 

#@api_view(['GET', 'POST'])
#def getMyNetworks(request,format=None):
#    networks = Network.objects.all()
#    serializer = networkSerializer(networks, many=True)
#    return Response(serializer.data)
    # return render(request, 'home.html')
