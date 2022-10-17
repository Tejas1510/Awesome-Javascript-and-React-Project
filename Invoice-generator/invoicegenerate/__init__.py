from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

invoiceapp = Flask(__name__)
invoiceapp.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
invoiceapp.config['SECRET_KEY']='csdcscxsdv'
db = SQLAlchemy(invoiceapp)
bcrypt= Bcrypt(invoiceapp)

from invoicegenerate import routes
