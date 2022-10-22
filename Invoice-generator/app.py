# from colorama import Cursor
# from flask import Flask, render_template, request, redirect
# import os
# import sqlite3
# from login.signin import signin
# from login.signup import signup
# currentlocation =os.path.dirname(os.path.abspath(__file__))
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from invoicegenerate import invoiceapp, routes

# invoiceapp.register_blueprint(routes,url_prefix='/')
# invoiceapp.register_blueprint(routes,url_prefix='/')
# invoiceapp.register_blueprint(routes,url_prefix='/')


# invoiceapp = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# db = SQLAlchemy(app)

# from invoicegenerate import routes


# app.register_blueprint(signup,url_prefix='/register')
# app.register_blueprint(signin,url_prefix='/login')


# @app.route('/')
# def home():
#     return render_template('base.html')


if __name__=='__main__':
    invoiceapp.run(debug=True)