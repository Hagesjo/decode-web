# Create your views here.
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def common(request):
    return render(request, 'main/common.html')

def braille(request):
    return render(request, 'main/braille.html')

def caesar(request):
    return render(request, 'main/caesar.html')

def substi(request):
    return render(request, 'main/substi.html')

def trump(request):
    return render(request, 'main/trump.html')

def morse(request, morse = ""):
    return render(request, 'main/morse.html', {'morse' : morse})

def translate(request):
    return render(request, 'main/translate.html')

def frequency(request):
    return render(request, 'main/frequency.html')
