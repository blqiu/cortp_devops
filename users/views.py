from django.shortcuts import render
from django.shortcuts import redirect
from login import models
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import hashlib
import json
import os

# Create your views here.

def hash_code(s, salt='mysite'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()

def adduser(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    username = request.session.get('username')
    if request.method == "POST":
        name = request.POST.get("username")
        password = request.POST.get("password")
        message = ""
        try:
            veify_username = models.User.objects.get(name=name)
            message = "用户名已存在"
        except:
            obj=models.User.objects.create(name=name,passwd=hash_code(password))
            obj.save()
            message = ""
        return HttpResponse(message)
    if request.method == "GET":
        return render(request, 'adduser.html',locals())

def manageuser(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    username = request.session.get('username')
    name_list = []
    for name in models.User.objects.values('name'):
        name_list.append(name['name'])
    user_list = []
    for i in range(len(name_list)):
        user_list.append({"name":name_list[i]})
    return render(request, 'manageuser.html',locals())
