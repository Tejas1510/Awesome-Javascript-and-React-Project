from flask import Flask,Blueprint, render_template, request, redirect, flash
import os
import sqlite3
from passlib.hash import pbkdf2_sha256 
import bcrypt
from flask_bcrypt import Bcrypt
from app import app

from user import User,db
import email_validator



currentlocation =os.path.dirname(os.path.abspath(__file__))
signup=Blueprint("signup",__name__,static_folder="static", template_folder="templates")

from wtforms import Form, BooleanField, StringField, PasswordField, validators

class RegistrationForm(Form):
    name = StringField('name', [validators.Length(min=4, max=25)])
    email = StringField('Email Address', [validators.Length(min=6, max=35),validators.Email()])
    password = PasswordField('New Password', [
        validators.DataRequired(),
        validators.EqualTo('confirm', message='Passwords must match')
    ])
    confirm = PasswordField('Repeat Password')
    accept_tos = BooleanField('I accept the TOS', [validators.DataRequired()])



@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm(request.form)
    if request.method == 'POST' and form.validate():
        hash_password = bcrypt.generate_password_hash(form.password.data)
        user = User(name=form.name.data,email=form.email.data,password=hash_password)
        db.session.add(user)
        db.commit()
        flash('Thanks for registering')
        return render_template('loggedin.html')
    return render_template('Register.html', form=form)






# @signup.route('/' , methods=['GET','POST'])
# def registerpage():
#     if request.method == 'POST':
#         dUN= request.form.get('name')
#         dPW= bcrypt.hashpw(request.form.get('password'),bcrypt.gensalt()).decode('utf-8')
#         Uemail= request.form.get('email')
#         # hashed = bcrypt.hashpw(dPW.encode('utf-8'), bcrypt.gensalt())
#         sqlconnection= sqlite3.Connection(currentlocation + '/Login.db')
#         cursor= sqlconnection.cursor()
#         query1= "INSERT INTO Users VALUES('{u}','{p}','{e}')".format(u=dUN,p=dPW,e=Uemail)
#         cursor.execute(query1)
#         sqlconnection.commit()
#         return redirect('/')
#     return render_template("Register.html")


# if __name__=='__main__':
#     signup.run()