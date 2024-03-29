from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from .api import Api

def common(request):
    return render(request, 'main/common.html')

def bases(request):
    return render(request, 'main/bases.html')

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

def api(request, method=None, data=None):
    ap = Api(method, data)
    ret = ap.parse(method, data)
    if ret:
        return HttpResponse(ret)
    else:
        return render(request, 'main/api.html')

def keyboard(request):
    return render(request, 'main/keyboard.html')

with open(settings.BASE_DIR + "/" + 'eng.txt') as f:
   words = f.read().split()

def wordmatrix(request):
    return render(request, 'main/wordmatrix.html', {'words': words})

def wordlist(request):
    return render(request, 'main/wordlist.html', {'words': words})

def plusone(request):
    return render(request, 'main/plusone.html', {'words': words})
