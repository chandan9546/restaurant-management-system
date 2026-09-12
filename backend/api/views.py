from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .models import (
    MenuItem,
    Reservation,
    Order,
    OrderItem,
    UserProfile,
     Review
)

from .serializers import (
    MenuItemSerializer,
    ReservationSerializer,
    OrderSerializer,
    RegisterSerializer,
    ReviewSerializer
)


@api_view(["GET"])
def hello_api(request):
    return Response({
        "message": "Hello from Django API"
    })


@api_view(["GET"])
def menu_list(request):
    menu_items = MenuItem.objects.all()

    serializer = MenuItemSerializer(
        menu_items,
        many=True
    )

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
@permission_classes([IsAuthenticated])
def create_reservation(request):

    serializer = ReservationSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save(user=request.user)

        return Response({
            "message": "Reservation booked successfully",
            "data": serializer.data
        }, status=201)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    order_data = {
        "name": request.data.get("name"),
        "phone": request.data.get("phone"),
        "address": request.data.get("address"),
        "total_amount": request.data.get("total_amount"),
    }

    order_serializer = OrderSerializer(
        data=order_data
    )

    if order_serializer.is_valid():

        order = order_serializer.save(
            user=request.user
        )

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

    serializer = RegisterSerializer(
        data=request.data
    )

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
@permission_classes([IsAuthenticated])
def profile(request):

    profile, created = UserProfile.objects.get_or_create(
        user=request.user
    )

    return Response({
        "username": request.user.username,
        "phone": profile.phone,
        "address": profile.address,
        "message": "Welcome to your profile"
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_orders(request):

    orders = Order.objects.filter(
        user=request.user
    ).order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)



@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_reservations(request):

    reservations = Reservation.objects.filter(
        user=request.user
    ).order_by("-created_at")

    serializer = ReservationSerializer(
        reservations,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
def review_list(request):

    reviews = Review.objects.all().order_by("-created_at")

    serializer = ReviewSerializer(
        reviews,
        many=True
    )

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_review(request):

    serializer = ReviewSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            user=request.user
        )

        return Response({
            "message": "Review submitted successfully",
            "data": serializer.data
        }, status=201)

    return Response(
        serializer.errors,
        status=400
    )