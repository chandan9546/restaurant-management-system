from rest_framework import serializers
from .models import MenuItem,Reservation,Order, OrderItem
from django.contrib.auth.models import User

class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=MenuItem
        fields="__all__"
        
class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = "__all__"
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = "__all__"


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
        
        
        
class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ["username", "password"]
        
    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be 8 characters.")
        upper = False
        lower = False
        number = False
        special = False
        for char in value:
            if char.isupper():
                upper = True
            elif char.islower():
                lower = True
            elif char.isdigit():
                number = True

            elif char in "@#$%&*":
                 special = True

        if not upper:
                   raise serializers.ValidationError("Use uppercase letter.")

        if not lower:
                 raise serializers.ValidationError("Use lowercase letter.")

        if not number:
                raise serializers.ValidationError("Use number.")

        if not special:
                raise serializers.ValidationError("Use special character.")

        return value
        
        

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )

        return user