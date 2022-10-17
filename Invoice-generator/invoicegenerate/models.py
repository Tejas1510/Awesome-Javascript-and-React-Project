# import datetime
from locale import currency
from xml.dom import ValidationErr
from invoicegenerate import db
from datetime import datetime

from sqlalchemy import Table, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email= db.Column(db.String(120), unique=True,nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    company_name= db.Column(db.String(180), unique=False, nullable=False)
    country= db.Column(db.String(180), unique=False, nullable=False)
    invoice = db.relationship('invoicedetail', backref='user', lazy=True)


    def __repr__(self): 
        return '<User %r>' & self.id
    
    def validate_email(self, email):
        if db.Query.filter_by(email=email).exists():
            raise ValidationErr("This user already exists")


# class Product(db.Model):
#     id = db.Column(db.Integer,primary_key=True)
#     product_name = db.Column(db.String(160), nullable=False)
    
#     user = db.relationship('User',backref=db.backref('posts', lazy=True))
#     user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    

#     def __repr__(self):
#         return '<Post %r>' % self.product_name



class invoicedetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # invoice_id = db.Column(db.Integer, db.ForeignKey(user.id))
    image = db.Column(db.String(150), nullable=True, default='image.jpg')
    # user = db.relationship('User',backref=db.backref('posts', lazy=True))
    # user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    currency=db.Column(db.String(20))
    header=db.Column(db.String(20))
    date = db.Column(db.DateTime, nullable=False,default= datetime.utcnow)
    due_date = db.Column(db.DateTime, nullable=False,default= datetime.utcnow)
    paymentmethod = db.Column(db.String(50))
    orderno= db.Column(db.Integer)
    billfrom =db.Column(db.String(100))
    billto = db.Column(db.String(100))
    sender= db.Column(db.String(100))
    receiver= db.Column(db.String(100))

    item_name = db.Column(db.String(160), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, unique=False)
    price = db.Column(db.Integer, nullable=False, unique=False)
    totalprice = db.Column(db.Integer)

    subtotalprice = db.Column(db.Integer, nullable=False)
    tax= db.Column(db.Integer)
    Discount = db.Column(db.Integer)
    Shipping = db.Column(db.Integer)
    Total=db.Column(db.Integer)
    Amountpaid= db.Column(db.Integer)
    balance_due= db.Column(db.Integer)
    notes= db.Column(db.String(500))
    late_fees= db.Column(db.String(200))
    terms= db.Column(db.String(200))
    # parent = relationship("User", backref="children")

    
    def __repr__(self):
        return '<Invoice %r>' % self.id


db.create_all()
