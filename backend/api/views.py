from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from django.utils import timezone

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

from django.utils import timezone
from django.conf import settings


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
        return Response({
            "message": "Menu item not found"
        }, status=404)

    serializer = MenuItemSerializer(menu_item)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_reservation(request):

    date = request.data.get("date")
    time = request.data.get("time")
    guests = request.data.get("guests")

    # Basic validation
    if not date or not time or not guests:
        return Response({
            "message": "Date, time and guests are required."
        }, status=400)

    try:
        guests = int(guests)
    except (TypeError, ValueError):
        return Response({
            "message": "Number of guests must be a valid number."
        }, status=400)

    if guests < 1:
        return Response({
            "message": "Number of guests must be at least 1."
        }, status=400)

    # Restaurant capacity check
    existing_reservations = Reservation.objects.filter(
        date=date,
        time=time
    ).exclude(
        status="cancelled"
    )

    booked_guests = sum(
        reservation.guests
        for reservation in existing_reservations
    )

    available_guests = settings.RESTAURANT_CAPACITY - booked_guests

    if guests > available_guests:
        return Response({
            "message": (
                f"Only {available_guests} guest(s) "
                f"capacity is available for this time."
            )
        }, status=400)

    # Create reservation
    serializer = ReservationSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            user=request.user
        )

        return Response({
            "message": "Reservation booked successfully",
            "data": serializer.data
        }, status=201)

    return Response(
        serializer.errors,
        status=400
    )
    
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def cancel_reservation(request, reservation_id):

    try:
        reservation = Reservation.objects.get(
            id=reservation_id,
            user=request.user
        )

    except Reservation.DoesNotExist:
        return Response({
            "message": "Reservation not found"
        }, status=404)

    if reservation.status == "cancelled":
        return Response({
            "message": "Reservation is already cancelled",
            "status": "cancelled",
            "cancelled_by": reservation.cancelled_by
        }, status=400)

    if reservation.status == "completed":
        return Response({
            "message": "Completed reservation cannot be cancelled"
        }, status=400)

    reservation.status = "cancelled"
    reservation.cancelled_by = "customer"
    reservation.cancelled_at = timezone.now()

    reservation.save()

    return Response({
        "message": "Reservation cancelled successfully",
        "status": reservation.status,
        "cancelled_by": reservation.cancelled_by,
        "cancelled_at": reservation.cancelled_at
    })


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

    reviews = Review.objects.all().order_by(
        "-created_at"
    )

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


# Cancel Order
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):

    try:
        order = Order.objects.get(
            id=order_id,
            user=request.user
        )

    except Order.DoesNotExist:
        return Response({
            "message": "Order not found"
        }, status=404)

    # Already cancelled
    if order.status == "cancelled":

        return Response({
            "message": "Order is already cancelled",
            "status": "cancelled",
            "cancelled_by": order.cancelled_by
        }, status=400)

    # Completed order cannot be cancelled
    if order.status == "completed":

        return Response({
            "message": "Completed order cannot be cancelled"
        }, status=400)

    # Cancel order
    order.status = "cancelled"
    order.cancelled_by = "customer"
    order.cancelled_at = timezone.now()

    order.save()

    return Response({
        "message": "Order cancelled successfully",
        "status": order.status,
        "cancelled_by": order.cancelled_by,
        "cancelled_at": order.cancelled_at
    })