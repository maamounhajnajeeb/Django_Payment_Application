from rest_framework import viewsets, response
from rest_framework import generics, views

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

def index(request):
    return render(request, "index.html",
        {"publishable_key":publishable_key})


class CreateCharge(views.APIView):
    
    permission_classes = ( )
    
    def post(self, request, *args, **kwargs):
        stripe_token = request.data.get("stripeToken")
        
        stripe.api_key = secret_key
        
        customer = stripe.Customer.create(
            email="maamoun@gmail.com",
            name="Maamoun",
            source=stripe_token
        )

        stripe.Charge.create(
            customer=customer, amount=8*100,
            currency="usd", description="testing",
        )

        return response.Response({
            "message": "payment done"
        })


class SeeCharges(views.APIView):
    
    permission_classes = ( )
    
    def get(self, request, *args, **kwargs):
        stripe.api_key = secret_key
        
        customer = stripe.Customer.list(email="maamoun@gmail.com")
        
        operations_ids = [obj.id for obj in customer]
        
        return response.Response({
            "number of payment operations": len(customer),
            "operations_ids": operations_ids,
        })
        