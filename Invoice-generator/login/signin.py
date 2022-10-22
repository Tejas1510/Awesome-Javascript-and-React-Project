from flask import Flask, Blueprint, render_template, request, redirect
import os
import sqlite3
from app import app


currentlocation =os.path.dirname(os.path.abspath(__file__))
signin=Blueprint("signin",__name__,static_folder="static", template_folder="templates")


@app.route('/signin', methods=['GET','POST'])
def checklogin():
      if request.method == 'POST':
        Uemail = request.form.get('email')
        PW = request.form.get('password')

        sqlconnection = sqlite3.Connection(currentlocation + '/Login.db')
        cursor= sqlconnection.cursor()
        query1="SELECT email, password from Users WHERE email = '{e}' AND password = '{p}'".format(e=Uemail, p=PW)

        rows=cursor.execute(query1)
        rows=rows.fetchall()
    
        if len(rows) == 1:
            return render_template('Loggedin.html')
        else:
            return redirect("/register")
      return render_template("base.html")


if __name__=='__main__':
    signin.run()