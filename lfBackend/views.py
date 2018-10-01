from django.shortcuts import render
from rest_framework.decorators import api_view ,authentication_classes ,permission_classes
from rest_framework.authentication import TokenAuthentication , SessionAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import UserSerializer, UsrSerializer, ItemSerializer, TokenSerializer ,ISerializer
from rest_framework import viewsets ,permissions ,generics, status
from .models import CustomUser , item
from .permissions import IsOwnerOrReadOnly, IsUserOrReadOnly
from rest_framework.authtoken.models import Token
# Create your views here.

class sign_up(generics.CreateAPIView):
	queryset = CustomUser.objects.all()
	serializer_class = 	UserSerializer
	def perform_create(self, serializer):
		serializer.save()

class ItemViewSet(viewsets.ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
        SessionAuthentication
    )
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = item.objects.all()
    serializer_class = ItemSerializer

class IViewSet(viewsets.ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
        SessionAuthentication
    )
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly,
    )
    queryset = item.objects.all()
    serializer_class = ISerializer

class UsrViewSet(viewsets.ModelViewSet):
    authentication_classes = (
        TokenAuthentication,
        SessionAuthentication
    )
    permission_classes = (
        IsAuthenticatedOrReadOnly,
        IsUserOrReadOnly,
    )
    queryset = CustomUser.objects.all()
    serializer_class = UsrSerializer


class TokenViewSet(viewsets.ModelViewSet):
    queryset = Token.objects.all()
    serializer_class = TokenSerializer
