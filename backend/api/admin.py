from django.contrib import admin

from .models import (
    MenuItem,
    Reservation,
    Order,
    OrderItem,
    Review
)


@admin.register(MenuItem)
class MenuItemAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "name",
        "category",
        "price"
    ]

    list_filter = [
        "category"
    ]

    search_fields = [
        "name",
        "description"
    ]

    ordering = [
        "id"
    ]


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "name",
        "phone",
        "date",
        "time",
        "guests",
        "status"
    ]

    list_filter = [
        "status",
        "date"
    ]

    search_fields = [
        "name",
        "phone"
    ]

    ordering = [
        "-created_at"
    ]


class OrderItemInline(admin.TabularInline):

    model = OrderItem

    extra = 0

    fields = [
        "menu_item",
        "quantity",
        "price"
    ]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "name",
        "phone",
        "total_amount",
        "status",
        "created_at"
    ]

    list_filter = [
        "status",
        "created_at"
    ]

    search_fields = [
        "name",
        "phone",
        "user__username"
    ]

    ordering = [
        "-created_at"
    ]

    readonly_fields = [
        "user",
        "created_at"
    ]

    inlines = [
        OrderItemInline
    ]


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "order",
        "menu_item",
        "quantity",
        "price"
    ]

    search_fields = [
        "menu_item__name"
    ]
    
    
@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):

    list_display = [
        "id",
        "user",
        "rating",
        "comment",
        "created_at"
    ]

    list_filter = [
        "rating",
        "created_at"
    ]

    search_fields = [
        "user__username",
        "comment"
    ]

    ordering = [
        "-created_at"
    ]

    readonly_fields = [
        "user",
        "created_at"
    ]