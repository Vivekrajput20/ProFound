from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password as vp
from .models import CustomUser, item
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=False,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    username = serializers.CharField(required =True ,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )
    password = serializers.CharField(required=True , write_only = True)
    first_name = serializers.CharField(max_length = 30 , required = True)
    last_name = serializers.CharField(max_length=150 , required = True)
    phone = serializers.CharField(max_length=15,required=True)
    def validate_password(self, value):
    	if(vp(value) != None):
    		raise serializers.ValidationError(vp(value))
    	return value

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

    class Meta:
        model = CustomUser
        fields = ( 'username', 'email', 'password' , 'first_name', 'last_name', 'phone')
class UsrSerializer(serializers.ModelSerializer):
    """
    Serializer to serialize the sale product model
    """    
    class Meta:
        """
        Details of the fields included in the serializer
        """
        model = CustomUser
        exclude = ('password', 'last_login')
        read_only_fields = ('id','is_superuser', 'date_joined')

class ItemSerializer(serializers.ModelSerializer):
    """
    Serializer to serialize the sale product model
    """    
    class Meta:
        """
        Details of the fields included in the serializer
        """
        model = item
        fields = '__all__'
class ISerializer(serializers.ModelSerializer):
    username = UsrSerializer()
    """
    Serializer to serialize the sale product model
    """    
    class Meta:
        """
        Details of the fields included in the serializer
        """
        model = item
        fields = '__all__'

class TokenSerializer(serializers.ModelSerializer):
    user = UsrSerializer()
    """
    Serializer to serialize the sale product model
    """    
    class Meta:
        """
        Details of the fields included in the serializer
        """
        model = Token
        fields = ('user', 'created')
        read_only_fields = ('key', 'user', 'created')