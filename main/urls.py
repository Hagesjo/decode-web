from django.urls import path, re_path

from . import views

app_name='main'

urlpatterns = [
    path('', views.common, name='common'),
    path('api', views.api, name='api'),
    path('api/<slug:method>', views.api, name='api'),
    path('api/<slug:method>/<path:data>', views.api, name='api'),
    path('braille', views.braille, name='braille'),
    path('substi', views.substi, name='substi'),
    path('caesar', views.caesar, name='caesar'),
    path('trump', views.trump, name='trump'),
    path('translate', views.translate, name='translate'),
    path('frequency', views.frequency, name='frequency'),
    path('keyboard', views.keyboard, name='keyboard'),

    re_path('morse/([ .\-/]*)?$', views.morse, name='morse'),
]
