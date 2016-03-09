# Create your views here.
from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from django.conf import settings
from os import listdir, path

# Create your views here.
def common(request):
	return render(request, 'main/common.html')

def braille(request):
	template = loader.get_template('main/braille.html')
	data = [] # List of tuples: [(image name, id for image used in js)]
	for image in listdir(path.join(settings.STATIC_ROOT, 'main/img/braille/')):
		if image.endswith('.gif'):
			data.append((image, image[:-4]))
	data.sort()
	return HttpResponse(template.render({'data' : data}, request))

def caesar(request):
	return render(request, 'main/caesar.html')

def substi(request):
	return render(request, 'main/substi.html')
