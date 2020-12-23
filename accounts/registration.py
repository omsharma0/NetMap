from django import forms

class Register(forms.Form):
    name = forms.CharField()
    messdssdasd = forms.CharField(widget=forms.Textarea)
    print('Hellow')

    def send_email(self):
        # send email using the self.cleaned_data dictionary
        pass