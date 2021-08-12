from django.urls import path, re_path

from . import views

app_name='main'

urlpatterns = [
    path('', views.common, name='common'),
    path('api', views.api, name='api'),
    path('api/<slug:method>', views.api, name='api'),
    path('api/<slug:method>/<path:data>', views.api, name='api'),
    path('bases', views.bases, name='bases'),
    path('braille', views.braille, name='braille'),
    path('caesar', views.caesar, name='caesar'),
    path('frequency', views.frequency, name='frequency'),
    path('keyboard', views.keyboard, name='keyboard'),
    path('substi', views.substi, name='substi'),
    path('translate', views.translate, name='translate'),
    path('trump', views.trump, name='trump'),
    path('wordmatrix', views.wordmatrix, name='wordmatrix'),
    path('wordlist', views.wordlist, name='wordlist'),

    re_path('morse/([ .\-/]*)?$', views.morse, name='morse'),
]
