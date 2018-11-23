from django.shortcuts import render
from django.shortcuts import redirect
from scm import models
from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponse,JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
import json
import os

# Create your views here.

def addinfo(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    username = request.session.get('username')
    if request.method == "POST":
        id_env = request.POST.get("id_env")
        id_server = request.POST.get("id_server")
        id_application = request.POST.get("id_application")
        id_port = request.POST.get("id_port")
        id_deployed = request.POST.get("id_deployed")
        id_databases = request.POST.get("id_databases")
        id_remarks = request.POST.get("id_remarks")
        print(id_env,id_server,id_application,id_port,id_deployed,id_databases,id_remarks)
        p = models.Addinfo(env=id_env, serverip=id_server, application=id_application, port=id_port, deployed=id_deployed, databases=id_databases, remarks=id_remarks)
        p.save()
        message = ""
        return HttpResponse(message)
    if request.method == "GET":
        return render(request, 'addinfo.html',locals())

def manageinfo(request):
    if not request.session.get('is_login', None):
        return redirect("/login/")
    username = request.session.get('username')
    env_list = []
    server_list = []
    application_list = []
    port_list = []
    deployed_list = []
    databases_list = []
    remarks_list = []
    infoid_list = []
    info_list = []
    for env in list(models.Addinfo.objects.values('env')):
        env_list.append(env['env'])
    for serverip in models.Addinfo.objects.values('serverip'):
        server_list.append(serverip['serverip'])
    for application in models.Addinfo.objects.values('application'):
        application_list.append(application['application'])
    for port in list(models.Addinfo.objects.values('port')):
        port_list.append(port['port'])
    for deployed in models.Addinfo.objects.values('deployed'):
        deployed_list.append(deployed['deployed'])
    for databases in models.Addinfo.objects.values('databases'):
        databases_list.append(databases['databases'])
    for remarks in models.Addinfo.objects.values('remarks'):
        remarks_list.append(remarks['remarks'])
    for infoid in models.Addinfo.objects.values('id'):
        infoid_list.append(infoid['id'])
    for i in range(len(env_list)):
        info_list.append({"infoid": infoid_list[i], "env": env_list[i], "serverip": server_list[i], "application": application_list[i], "port": port_list[i], "deployed": deployed_list[i], "databases": databases_list[i], "remarks": remarks_list[i]})
    return render(request,"manageinfo.html",locals())

def deleteinfo(request):
    if request.method == 'POST':
        checkvalues = request.POST.get("checkvalues")
        list = checkvalues.split(',')
        for i in list:
            print(i)
            models.Addinfo.objects.filter(id=i).delete()
        message = "successed"
        return HttpResponse(message)
    else:
        message = "failed"
        return HttpResponse(message)

def getInfo(request):
    infoid = request.POST.get("infoid")
    env = models.Addinfo.objects.get(id=infoid).env
    serverip = models.Addinfo.objects.get(id=infoid).serverip
    application = models.Addinfo.objects.get(id=infoid).application
    port = models.Addinfo.objects.get(id=infoid).port
    deployed = models.Addinfo.objects.get(id=infoid).deployed
    databases = models.Addinfo.objects.get(id=infoid).databases
    remarks = models.Addinfo.objects.get(id=infoid).remarks
    message = {"env":env,"serverip":serverip,"application":application,"port":port,"deployed":deployed,"databases":databases,"remarks":remarks}
    print(message)
    return HttpResponse(json.dumps(message))

@csrf_exempt
def chinfo(request):
    infoid = request.POST.get("infoid")
    id_env = request.POST.get("id_env")
    id_server = request.POST.get("id_server")
    id_application = request.POST.get("id_application")
    id_port = request.POST.get("id_port")
    id_deployed = request.POST.get("id_deployed")
    id_databases = request.POST.get("id_databases")
    id_remarks = request.POST.get("id_remarks")
    print(id_databases,id_remarks)
    chwinfo = models.Addinfo.objects.get(id=infoid)
    chwinfo.env = id_env
    chwinfo.serverip = id_server
    chwinfo.application = id_application
    chwinfo.port = id_port
    chwinfo.deployed = id_deployed
    chwinfo.databases = id_databases
    chwinfo.remarks = id_remarks
    chwinfo.save()
    message = ""
    return HttpResponse(message)