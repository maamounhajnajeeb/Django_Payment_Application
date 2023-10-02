from rest_framework import viewsets, response

from django.shortcuts import render, redirect
from django.urls import reverse

import os
from environs import Env

import stripe

from . import models, serializer

def get_env_details():
    env = Env()
    env.read_env()
    
    publishable_key = os.getenv("Publishable_key")
    secret_key = os.getenv("Secret_key")
    
    return publishable_key, secret_key

publishable_key, secret_key = get_env_details()

def login(request):
    return render(request, "login.html", {})

def index(request):
    return render(request, "index.html",
        {"publishable_key":publishable_key})

def charge(request):
    amount = 5
    return redirect("../products/1/")


class Products(viewsets.ModelViewSet):
    
    serializer_class = serializer.ProductsSerializer
    queryset = models.Products.objects
    
    def retrieve(self, request, *args, **kwargs):
        print(request.data)
        amount = 5
        stripe.api_key = secret_key
        
        customer = stripe.Customer.create(
            email="maamoun.haj.najeeb@gmail.com",
            name="Maamoun",
            source=request.data.get("stripeToken")
        )
        
        stripe.Charge.create(
            customer=customer, amount=amount*100,
            currency="usd", description="Donation", )
        
        return response.Response({
            "status": "payment done"
        })
        