from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.common, name='common'),
    url(r'^api/(\w*)/?(.*)$', views.api, name='api'),
    url(r'^braille/$', views.braille, name='braille'),
    url(r'^substi/$', views.substi, name='substi'),
    url(r'^caesar/$', views.caesar, name='caesar'),
    url(r'^trump/$', views.trump, name='trump'),
    url(r'^morse/([ .\-/]*)$', views.morse, name='morse'),
    url(r'^translate/$', views.translate, name='translate'),
    url(r'^frequency/$', views.frequency, name='frequency'),
    url(r'^keyboard/$', views.keyboard, name='keyboard'),
]
