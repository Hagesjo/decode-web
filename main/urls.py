from django.conf.urls import url

from . import views

urlpatterns = [
	url(r'^$', views.common, name='common'),
	url(r'^braille/$', views.braille, name='braille'),
	url(r'^substi/$', views.substi, name='substi'),
	url(r'^caesar/$', views.caesar, name='caesar'),
]
