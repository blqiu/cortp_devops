from django.conf.urls import url
from scm import views

urlpatterns = [
    url(r'addinfo/', views.addinfo),
    url(r'manageinfo/', views.manageinfo),
    url(r'deleteinfo/', views.deleteinfo),
    url(r'getInfo/', views.getInfo),
    url(r'chinfo/', views.chinfo),
]