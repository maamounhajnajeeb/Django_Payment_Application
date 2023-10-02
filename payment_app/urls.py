from rest_framework import routers

from django.urls import path

from . import views

router = routers.SimpleRouter()
router.register("products", views.Products, basename="products")

app_name = "payment_app"

urlpatterns = [
    path("index/", views.index, name="index"),
    path("charge/", views.charge, name="charge"),
    path("login/", views.login, name="login"),
]

urlpatterns += router.urls