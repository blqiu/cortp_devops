from django.shortcuts import render
from django.shortcuts import redirect
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from login import models as loginmodels
from website import models as websitemodels
import json
import hashlib
import os

def hash_code(s, salt='mysite'):
    h = hashlib.sha256()
    s += salt
    h.update(s.encode())
    return h.hexdigest()

def index(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    name_list = []
    description_list = []
    url_list = []
    for url in list(websitemodels.Addweb.objects.values('url')):
        url_list.append(url['url'])
    for description in websitemodels.Addweb.objects.values('description'):
        description_list.append(description['description'])
    for name in websitemodels.Addweb.objects.values('name'):
        name_list.append(name['name'])
    web_list = []
    for i in range(len(name_list)):
        web_list.append({"name":name_list[i],"description":description_list[i],"url":url_list[i]})
    username = request.session.get('username')
    return render(request, 'index.html',locals())

def login(request):
    if request.session.get('is_login', None):
        return redirect("/index/")
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")
        try:
            veify_username = loginmodels.User.objects.get(name=username)
            if username == str(veify_username):
                getpassword = veify_username.passwd
                if hash_code(password) == getpassword:
                    request.session['is_login'] = True
                    request.session['username'] = username
                    message = ""
                    return HttpResponse(message)
                else:
                    message = "密码不正确"
                    return HttpResponse(message)
            else:
                message = "用户名不存在"
                return HttpResponse(message)
        except:
            message = "用户名不存在"
            return HttpResponse(message)
    if request.method == "GET":
        return render(request,"login.html")

def logout(request):
    request.session.flush()
    return redirect("/login/")

def chpasswd(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    if request.method == "POST":
        oldpd = request.POST.get("oldpd")
        newpd = request.POST.get("newpd")
        username = request.session.get('username')
        veify_username = loginmodels.User.objects.get(name=username)
        getpassword = loginmodels.User.objects.get(name=username).passwd
        if hash_code(oldpd) == getpassword:
            veify_username.passwd = hash_code(newpd)
            veify_username.save()
            message = ""
            return HttpResponse(message)
        else:
            message = "初始密码错误"
            return HttpResponse(message)
    else:
        username = request.session.get('username')
        return render(request, 'chpasswd.html',locals())
