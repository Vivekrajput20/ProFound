from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from django.conf.urls import url
from rest_framework.routers import DefaultRouter
from . import views
from .views import ItemViewSet , UsrViewSet, TokenViewSet, IViewSet

app_name = 'lost_and_found'
router = DefaultRouter()
router.register(r'item', ItemViewSet, base_name='item')
router.register(r'i', IViewSet, base_name='i')
router.register(r'usr', UsrViewSet, base_name='usr')
router.register(r'token', TokenViewSet, base_name='token')
urlpatterns = [
    path('obtain-auth-token/', obtain_auth_token),
    path('register/' , views.sign_up.as_view() , name='register'),
]

urlpatterns += router.urls