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
from django.db.models import Sum


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

    user = authenticate(username=username, password=password)

    if user is None:
        return Response(
            {"message": "Invalid username or password"},
            status=401
        )

    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Login successful",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
        "username": user.username,
        "is_staff": user.is_staff
    })


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
    
    
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def admin_dashboard(request):

    # Only admin/staff users can access
    if not request.user.is_staff:
        return Response({
            "message": "You are not authorized to access this dashboard."
        }, status=403)

    total_orders = Order.objects.count()

    pending_orders = Order.objects.filter(
        status="pending"
    ).count()

    confirmed_orders = Order.objects.filter(
        status="confirmed"
    ).count()

    completed_orders = Order.objects.filter(
        status="completed"
    ).count()

    cancelled_orders = Order.objects.filter(
        status="cancelled"
    ).count()

    total_reservations = Reservation.objects.count()

    pending_reservations = Reservation.objects.filter(
        status="pending"
    ).count()

    confirmed_reservations = Reservation.objects.filter(
        status="confirmed"
    ).count()

    completed_reservations = Reservation.objects.filter(
        status="completed"
    ).count()

    cancelled_reservations = Reservation.objects.filter(
        status="cancelled"
    ).count()

    total_revenue = Order.objects.filter(
        status__in=["confirmed", "completed"]
    ).aggregate(
        total=Sum("total_amount")
    )["total"] or 0

    return Response({
        "orders": {
            "total": total_orders,
            "pending": pending_orders,
            "confirmed": confirmed_orders,
            "completed": completed_orders,
            "cancelled": cancelled_orders,
        },

        "reservations": {
            "total": total_reservations,
            "pending": pending_reservations,
            "confirmed": confirmed_reservations,
            "completed": completed_reservations,
            "cancelled": cancelled_reservations,
        },

        "revenue": total_revenue,
    })
    
    
    
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def admin_menu(request):
    if not request.user.is_staff:
        return Response(
            {"message": "You are not authorized to manage menu."},
            status=403
        )

    if request.method == "GET":
        menu_items = MenuItem.objects.all().order_by("id")
        serializer = MenuItemSerializer(menu_items, many=True)
        return Response(serializer.data)

    serializer = MenuItemSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(
            {
                "message": "Menu item added successfully.",
                "data": serializer.data
            },
            status=201
        )

    return Response(serializer.errors, status=400)


@api_view(["PUT", "DELETE"])
@permission_classes([IsAuthenticated])
def admin_menu_detail(request, item_id):
    if not request.user.is_staff:
        return Response(
            {"message": "You are not authorized to manage menu."},
            status=403
        )

    try:
        menu_item = MenuItem.objects.get(id=item_id)
    except MenuItem.DoesNotExist:
        return Response(
            {"message": "Menu item not found."},
            status=404
        )

    if request.method == "PUT":
        serializer = MenuItemSerializer(
            menu_item,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Menu item updated successfully.",
                    "data": serializer.data
                }
            )

        return Response(serializer.errors, status=400)

    menu_item.delete()

    return Response(
        {"message": "Menu item deleted successfully."}
    )