from django.shortcuts import render
from django.shortcuts import redirect
from . import models
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
import os

# Create your views here.

def addweb(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    username = request.session.get('username')
    return render(request, 'addweb.html',locals())

def addUrl(request):
    id_name = request.POST.get('id_name')
    id_description = request.POST.get('id_description')
    id_url = request.POST.get('id_url')
    p = models.Addweb(name=id_name,description=id_description,url=id_url)
    p.save()
    message = "sucess"
    return HttpResponse(message)

def manageweb(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    name_list = []
    description_list = []
    url_list = []
    webid_list = []
    for url in list(models.Addweb.objects.values('url')):
        url_list.append(url['url'])
    for description in models.Addweb.objects.values('description'):
        description_list.append(description['description'])
    for name in models.Addweb.objects.values('name'):
        name_list.append(name['name'])
    for webid in models.Addweb.objects.values('id'):
        webid_list.append(webid['id'])
    web_list = []
    for i in range(len(name_list)):
        web_list.append({"webid": webid_list[i], "name": name_list[i], "description": description_list[i], "url": url_list[i]})
    username = request.session.get('username')
    return render(request, 'manageweb.html',locals())

def deleteweb(request):
    if request.method == 'POST':
        checkvalues = request.POST.get("checkvalues")
        list = checkvalues.split(',')
        for i in list:
            print(i)
            models.Addweb.objects.filter(id=i).delete()
        message = "successed"
        return HttpResponse(message)
    else:
        message = "failed"
        return HttpResponse(message)

def getUrlInfo(request):
    webid = request.POST.get("webid")
    name = models.Addweb.objects.get(id=webid).name
    description = models.Addweb.objects.get(id=webid).description
    url = models.Addweb.objects.get(id=webid).url
    message = {"name":name,"description":description,"url":url}
    return HttpResponse(json.dumps(message))

@csrf_exempt
def chweb(request):
    webid = request.POST.get("webid")
    name = request.POST.get("name")
    description = request.POST.get("description")
    url = request.POST.get("url")
    chweb = models.Addweb.objects.get(id=webid)
    chweb.name = name
    chweb.description = description
    chweb.url = url
    chweb.save()
    message = ""
    return HttpResponse(message)