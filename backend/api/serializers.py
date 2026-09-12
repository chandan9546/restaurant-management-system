from rest_framework import serializers
from django.contrib.auth.models import User

from .models import (
    MenuItem,
    Reservation,
    Order,
    OrderItem,
    UserProfile,
    Review,
)




class MenuItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = MenuItem
        fields = "__all__"


class ReservationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reservation
        fields = "__all__"
        read_only_fields = [
            "user",
            "status",
            "created_at"
        ]


class OrderItemSerializer(serializers.ModelSerializer):

    menu_item = MenuItemSerializer(read_only=True)

    class Meta:
        model = OrderItem
        fields = [
            "id",
            "order",
            "menu_item",
            "quantity",
            "price"
        ]


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order
        fields = [
            "id",
            "user",
            "name",
            "phone",
            "address",
            "total_amount",
            "status",
            "created_at",
            "items"
        ]


class RegisterSerializer(serializers.ModelSerializer):

    phone = serializers.CharField(required=False)
    address = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = [
            "username",
            "password",
            "phone",
            "address"
        ]

    def validate_password(self, value):

        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters."
            )

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
            raise serializers.ValidationError(
                "Use uppercase letter."
            )

        if not lower:
            raise serializers.ValidationError(
                "Use lowercase letter."
            )

        if not number:
            raise serializers.ValidationError(
                "Use number."
            )

        if not special:
            raise serializers.ValidationError(
                "Use special character."
            )

        return value

    def create(self, validated_data):

        phone = validated_data.pop("phone", "")
        address = validated_data.pop("address", "")

        user = User.objects.create_user(
            username=validated_data["username"],
            password=validated_data["password"]
        )

        UserProfile.objects.create(
            user=user,
            phone=phone,
            address=address
        )

        return user
    


class ReviewSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source="user.username",
        read_only=True
    )

    class Meta:
        model = Review
        fields = [
            "id",
            "user",
            "username",
            "rating",
            "comment",
            "created_at"
        ]

        read_only_fields = [
            "user",
            "created_at"
        ]

    def validate_rating(self, value):

        if value < 1 or value > 5:
            raise serializers.ValidationError(
                "Rating must be between 1 and 5."
            )

        return value
