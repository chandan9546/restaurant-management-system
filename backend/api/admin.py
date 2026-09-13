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
        "cancelled_by",
        "cancelled_at",
        "created_at"
    ]

    list_filter = [
        "status",
        "cancelled_by",
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
        "created_at",
        "cancelled_by",
        "cancelled_at"
    ]

    inlines = [
        OrderItemInline
    ]

    def get_readonly_fields(self, request, obj=None):

        fields = list(self.readonly_fields)

        # Cancelled order ka status change nahi hoga
        if obj and obj.status == "cancelled":
            fields.append("status")

        return fields

    def save_model(self, request, obj, form, change):

        # Existing cancelled order ko
        # dobara confirmed/completed nahi hone denge
        if change:

            old_order = Order.objects.get(
                id=obj.id
            )

            if old_order.status == "cancelled":

                obj.status = "cancelled"
                obj.cancelled_by = old_order.cancelled_by
                obj.cancelled_at = old_order.cancelled_at

        # Agar Admin kisi order ko manually cancel karta hai
        if obj.status == "cancelled":

            if not obj.cancelled_by:
                obj.cancelled_by = "admin"

            if not obj.cancelled_at:
                from django.utils import timezone

                obj.cancelled_at = timezone.now()

        super().save_model(
            request,
            obj,
            form,
            change
        )


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