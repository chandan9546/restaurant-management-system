from django.urls import path

from .views import (
    hello_api,
    menu_list,
    menu_detail,
    create_reservation,
    create_order,
    register_user,
    login_user,
    profile,
    my_orders,
    my_reservations,
    review_list,
    create_review,
    cancel_order,
    cancel_reservation,
)


urlpatterns = [
    path("hello/", hello_api),

    path("menu/", menu_list),
    path("menu/<int:item_id>/", menu_detail),

    path("reservations/", create_reservation),
    path("reservations/<int:reservation_id>/cancel/",cancel_reservation),

    path("orders/", create_order),

    path("register/", register_user),
    path("login/", login_user),

    path("profile/", profile),
    path("my-orders/", my_orders),
    
    path("my-reservations/", my_reservations),
    
    path("reviews/", review_list),
    path("reviews/create/", create_review),
    
    path("orders/<int:order_id>/cancel/", cancel_order),
]