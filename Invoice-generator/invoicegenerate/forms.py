from wtforms import Form, BooleanField, StringField, PasswordField, validators, IntegerField
class RegistrationForm(Form):
    email = StringField('Email Address', [validators.Length(min=6, max=35), validators.Email()])
    password = PasswordField('Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    company_name = StringField('Company Name', [validators.Length(min=4, max=25)])
    country= StringField('Country', [validators.Length(min=4, max=25)])
    confirm = PasswordField('Repeat Password')

class LoginForm(Form):
    email = StringField('Email Address', [validators.Length(min=6, max=35), validators.Email()])
    password = PasswordField('Password', [validators.DataRequired()])
    

class additem(Form):
    item_name = StringField('item name')
    quantity = IntegerField('quantity')
    price = IntegerField('price')