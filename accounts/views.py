from django.views.generic.edit import FormView
from .registration import Register
# Create your views here.

class Registration(FormView):
    template_name = "registration.html"
    form_class = Register
    success_url = '/accounts/welcome'


class Welcome(FormView):
    template_name = "welcome.html"
    form_class = Register
    success_url = '/thanks/'
