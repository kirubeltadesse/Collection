from django.shortcuts import render

# Create your views here.
# from django.http import HttpResponse,
from django.views.generic import TemplateView
from . import graphs

class IndexView(TemplateView):
    template_name = 'index.html'


class CropView(TemplateView):
    template_name = 'crop.html'

    def get_context_data(self, **kwargs):
        context = super(CropView, self).get_context_data(**kwargs)
        context['crop'] = graphs.plot_Cropwateruse()
        return context