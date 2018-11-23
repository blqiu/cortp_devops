from django.conf.urls import url
from users import views

urlpatterns = [
    url(r'adduser/', views.adduser),
    url(r'manageuser/', views.manageuser),
]