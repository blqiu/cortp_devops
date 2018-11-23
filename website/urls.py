from django.conf.urls import url
from website import views

urlpatterns = [
    url(r'addweb/', views.addweb),
    url(r'addUrl/', views.addUrl),
    url(r'manageweb/', views.manageweb),
    url(r'deleteweb/', views.deleteweb),
    url(r'getUrlInfo/', views.getUrlInfo),
    url(r'chweb/', views.chweb),

]