from django.urls import path
from .views import( hello_api,menu_list,menu_detail, create_reservation,create_order,register_user,login_user,profile)

urlpatterns = [
    path("hello/", hello_api),
    path("menu/", menu_list),
    path("menu/<int:item_id>/", menu_detail),
    path("reservations/", create_reservation),
    path("orders/", create_order),
    path("register/", register_user),
    path("login/", login_user),
    path("profile/", profile),
]