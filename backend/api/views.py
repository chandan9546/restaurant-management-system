from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User

from .models import MenuItem, Reservation, OrderItem

from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate

from rest_framework.permissions import IsAuthenticated

from .serializers import (
    MenuItemSerializer,
    ReservationSerializer,
    OrderSerializer,
    RegisterSerializer
)


@api_view(["GET"])
def hello_api(request):
    return Response({
        "message": "Hello from Django API"
    })


@api_view(["GET"])
def menu_list(request):
    menu_items = MenuItem.objects.all()

    serializer = MenuItemSerializer(menu_items, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def menu_detail(request, item_id):
    try:
        menu_item = MenuItem.objects.get(id=item_id)
    except MenuItem.DoesNotExist:
        return Response(
            {"message": "Menu item not found"},
            status=404
        )

    serializer = MenuItemSerializer(menu_item)

    return Response(serializer.data)


@api_view(["POST"])
def create_reservation(request):
    serializer = ReservationSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "Reservation booked successfully",
            "data": serializer.data
        }, status=201)

    return Response(serializer.errors, status=400)


@api_view(["POST"])
def create_order(request):

    order_data = {
        "name": request.data.get("name"),
        "phone": request.data.get("phone"),
        "address": request.data.get("address"),
        "total_amount": request.data.get("total_amount"),
    }

    order_serializer = OrderSerializer(data=order_data)

    if order_serializer.is_valid():

        order = order_serializer.save()

        items = request.data.get("items", [])

        for item in items:
            OrderItem.objects.create(
                order=order,
                menu_item_id=item["id"],
                quantity=item["quantity"],
                price=item["price"]
            )

        return Response({
            "message": "Order placed successfully",
            "order_id": order.id
        }, status=201)

    return Response(
        order_serializer.errors,
        status=400
    )
    
    
@api_view(["POST"])
def register_user(request):

    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response({
            "message": "User registered successfully"
        }, status=201)

    return Response(
        serializer.errors,
        status=400
    )
    
    
    
@api_view(["POST"])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user is not None:

        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "Login successful",
            "access": str(refresh.access_token),
            "refresh": str(refresh)
        })

    return Response({
        "message": "Invalid username or password"
    }, status=401)
    
    
    

    
@api_view(["GET"])
def profile(request):

    return Response({
        "username": request.user.username,
        "message": "Welcome to your profile"
    })