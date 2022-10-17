from datetime import datetime
import pathlib
from sqlite3 import dbapi2
from turtle import title
from urllib import response
from click import command
from flask import abort, current_app, render_template, session, request, redirect, url_for, flash, make_response
from invoicegenerate import invoiceapp,db, bcrypt
from .forms import RegistrationForm, LoginForm, additem
from .models import User,invoicedetail
import pdfkit
import secrets
import os
from werkzeug.utils import secure_filename

import requests

import os
from google.oauth2 import id_token
from google_auth_oauthlib.flow import Flow
from pip._vendor import cachecontrol
import google.auth.transport.requests
import secrets


from datetime import datetime

os.putenv('LANG', 'en_US.UTF-8')
os.putenv('LC_ALL', 'en_US.UTF-8')

os.environ["OAUTHLIB_INSECURE_TRANSPORT"] = "1"

GOOGLE_CLIENT_ID = "426873330021-rmf0id3g7lp1bpha0lp0blanu077oft3.apps.googleusercontent.com"
client_secrets_file = os.path.join(pathlib.Path(__file__).parent, "client_secret.json")

flow = Flow.from_client_secrets_file(
    client_secrets_file=client_secrets_file,
    scopes=["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    redirect_uri="http://127.0.0.1:5000/callback"
)

def login_is_required(function):
    def wrapper(*args, **kwargs):
        if "google_id" not in session:
            return abort(401)  # Authorization required
        else:
            return function()

    return wrapper
@invoiceapp.route("/login")
def login():
    authorization_url, state = flow.authorization_url()
    session["state"] = state
    return redirect(authorization_url)


@invoiceapp.route("/callback")
def callback():
    flow.fetch_token(authorization_response=request.url)
    
  

    credentials = flow.credentials
    request_session = requests.session()
    cached_session = cachecontrol.CacheControl(request_session)
    token_request = google.auth.transport.requests.Request(session=cached_session)

    id_info = id_token.verify_oauth2_token(
        id_token=credentials._id_token,
        request=token_request,
        audience=GOOGLE_CLIENT_ID
    )

    session["google_id"] = id_info.get("sub")
    session["name"] = id_info.get("name")
    return redirect("/protected_area")

@invoiceapp.route("/protected_area")
@login_is_required
def protected_area():
    return render_template("home2.html")















invoiceapp.secret_key="SECRET2001"

@invoiceapp.route('/')
def home():
    return render_template('home2.html',title="Home")

@invoiceapp.route('/invoiceguide')
def invoice_guide():
    return render_template('invoiceguide.html',title="Invoice Guide")

@invoiceapp.route('/creatinginvoice')
def creating_invoice():
    return render_template('creatingInvoice.html',title="Creating Invoice")

@invoiceapp.route('/sendinvoice')
def send_invoice():
    return render_template('sendinvoice.html',title="Sending Invoice")

@invoiceapp.route('/gettingpaid')
def getting_paid():
    return render_template('gettingpaid.html',title="Getting Paid")

@invoiceapp.route('/bestpractises')
def best_practises():
    return render_template('bestpractises.html', title="Best Practises")

@invoiceapp.route('/invoicegenerator', methods=['GET', 'POST'])
def invoice_generator():
    if "user_id" in session:
        if request.method == 'POST':
            invoice = invoicedetail(user_id=session['user_id'],
            currency=request.form.get('currency'),
            image=save_images(request.files.get('photo')),
            header=request.form.get('header'),
            date = datetime.strptime(request.form.get('date'),'%Y-%m-%d'),
            due_date = datetime.strptime(request.form.get('duedate'),'%Y-%m-%d'),
            paymentmethod=request.form.get('paymentmethod'),
            orderno=request.form.get('orderno'),
            billfrom=request.form.get('emailfrom'),
            sender=request.form.get('sender'),
            billto=request.form.get('emailto'),
            receiver=request.form.get('receiver'),
            item_name=request.form.get('item'),
            quantity=request.form.get('qty'),
            price=request.form.get('price'),
            totalprice=request.form.get('item_total'),
            subtotalprice=request.form.get('sub_total'),
            tax=request.form.get('tax_total'),
            Discount=request.form.get('discount_total'),
            Shipping=request.form.get('shipping_total'),
            Total=request.form.get('grand_total'),
            Amountpaid=request.form.get('amount_paid'),
            balance_due=request.form.get('balance_due'),
            notes=request.form.get('notes'),
            terms=request.form.get('terms'),
            late_fees=request.form.get('latefees')
            )

            db.session.add(invoice)
            flash("Invoice added successfully",'success')
            db.session.commit()
            return redirect(request.url)
    else:
        # return redirect("url_for('sign_in')")
        return render_template('invoicegenerator.html')

    return render_template('invoicegenerator.html',title="Invoice Generator")
    

# @invoiceapp.route('/signin')
# def sign_in():
#     return render_template('SignIn.html')

# @invoiceapp.route('/signup')
# def sign_up():
#     return render_template('SignUp.html')

<<<<<<< HEAD
@invoiceapp.route('/result1',methods = ['POST', 'GET'])
def result1():
   if request.method == 'POST':
       result = request.form
       file = request.files.get("photo")
       photo = secure_filename(file.filename)
       file_path = os.path.join(current_app.root_path, 'static/images/uploads',photo)
    
       file.save(file_path)
       
       return render_template("result.html",result = result,file=file,photo =photo)
    #    return render_template("result1.html",result = result)
=======

>>>>>>> 8c2930081c18fabecb941b05bb47e5d854a1e259


@invoiceapp.route('/get_pdf', methods=['POST','GET'])
def get_pdf():
    if request.method == 'POST':
        result = request.form
        rendered=render_template("result1.html",result=result)
        config = pdfkit.configuration(wkhtmltopdf='H:\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
        kitoptions = {
        "enable-local-file-access": None
        }

        pdf=pdfkit.from_string(rendered, False, configuration=config,  options=kitoptions)
        response= make_response(pdf)
        response.headers['Content-Type']='application/pdf'
        response.headers['Content-Disposition']="inline: filename=invoice"
        return response
        # return render_template('invoicegenerator.html')




@invoiceapp.route('/help')
def help():
    return render_template('help.html',title="Help")


# Registering User
# @invoiceapp.route('/signup', methods=['GET', 'POST'])
# def sign_up():
#     form = RegistrationForm(request.form)
#     if request.method == 'POST' and form.validate():
#         hash_password = bcrypt.generate_password_hash(form.password.data)
#         user = User(email=form.email.data, password=hash_password, company_name=form.company_name.data, country=form.country.data)
#         db.session.add(user) 
#         db.session.commit() 
#         # invoiceapp.logger.info(user.id)
#         flash('Thanks for registering')
#         return redirect(url_for('sign_in'))
#     return render_template('SignUp.html', form=form)

@invoiceapp.route('/signup', methods=['GET', 'POST'])
def sign_up():
    # form = RegistrationForm(request.form)
    if request.method == 'POST':
        hash_password = bcrypt.generate_password_hash(request.form.get('pass'))
        user = User(email=request.form.get('email'), password=hash_password, company_name=request.form.get('companyname'), country=request.form.get('countries'))
        db.session.add(user) 
        db.session.commit() 
        # invoiceapp.logger.info(user.id)
        flash('Thanks for registering')
        return redirect(url_for('sign_in'))
    return render_template('SignUp.html')

    

@invoiceapp.route('/signin', methods=['GET', 'POST'])
def sign_in():
    msg=''
    if request.method == 'POST' and 'email' in request.form and 'pass' in request.form:
        user = User.query.filter_by(email=request.form.get('email')).first()
        if user and bcrypt.check_password_hash(user.password, request.form.get('pass')):
            # user.authenticated = True
            # db.session.add(user)
            # db.session.commit()
            # return redirect(url_for('invoice_generator'))
            session['user_id'] = user.id
            # session['id'] = user['id']
            # session['email'] = user['email']
            msg = 'Logged in successfully !'
            return redirect(url_for('invoice_generator'))
            # session['email']= request.form.get('email')
            # flash(f'Welcome')
            # return redirect(request.args.get('next') or url_for('invoice_generator'))
            # return redirect(url_for('invoice_generator'))
        else:
            if "email" in session:
                return redirect(url_for('invoice_generator'))
            return render_template('SignIn.html')
            msg = 'Incorrect username / password !'
            # flash(f'Wrong Password please try again')
    return render_template('SignIn.html')


    # if request.method == 'POST' and 'email' in request.form and 'pass' in request.form:
    #     user = User.query.get(request.form.get('email'))
    #     if user:
    #         if bcrypt.check_password_hash(user.password,request.form.get('pass')):
    #             user.authenticated = True
    #             return redirect(url_for("invoice_generator"))
    # return render_template("SignIn.html")


    #     Uemail = request.form.get('email')
    #     PW = request.form.get('pass')

    #     sqlconnection = sqlite3.Connection(currentlocation + '/.db')
    #     cursor= sqlconnection.cursor()
    #     query1="SELECT email, password from Users WHERE email = '{e}' AND password = '{p}'".format(e=Uemail, p=PW)

    #     rows=cursor.execute(query1)
    #     rows=rows.fetchall()
    
    #     if len(rows) == 1:
    #         return render_template('Loggedin.html')
    #     else:
    #         return redirect("/register")
    #   return render_template("base.html")
    # form = LoginForm(request.form)
  

@invoiceapp.route("/logout", methods=["GET"])
def logout():
    session.pop('user_id', None)
    session.clear()
    # session.pop(User, None)
    return redirect(url_for('sign_in'))



    
    
    
def save_images(photo):
    hash_photo = secrets.token_urlsafe(10)
    _, file_extension = os.path.splitext(photo.filename)
    photo_name = hash_photo + file_extension
    file_path = os.path.join(current_app.root_path, 'static/images/uploads',photo_name)
    
    photo.save(file_path)
    return photo_name    

@app.route('/result1',methods = ['POST', 'GET'])
def result1():
   if request.method == 'POST':
       result = request.form
       file = request.files.get("photo")
       photo = secure_filename(file.filename)
       file_path = os.path.join(current_app.root_path, 'static/images/uploads2',photo)
    
       file.save(file_path)
       
       return render_template("result1.html",result = result,file=file,photo =photo)

@invoiceapp.route('/myinvoice', methods=['GET', 'POST'])
def myinvoice():
    if "user_id" in session:
        # myInvoices= invoicedetail.query.filter_by(id=session["user_id"]).all()
        # return render_template('myinvoice.html', myInvoices=myInvoices)
        

        # myInvoices= invoicedetail.query.all()
        # return render_template('myinvoice.html', myInvoices=myInvoices)
        # return redirect(url_for("inv",myinvoice=myInvoices))
        # if request.method == "POST":
        #     if request.form.get=='1':
        #         myInvoices= invoicedetail.query.filter_by(id=session["user_id"]).first()
        #         return render_template('myinvoice.html', myInvoices=myInvoices)

        #     elif request.form.get=='2':
        #         myInvoices= invoicedetail.query.filter_by(id=session["user_id"]).second()
        #         return render_template('myinvoice.html', myInvoices=myInvoices)

        return redirect(url_for('invoice'))
        
        # return myInvoice.sender


@invoiceapp.route('/invoice', methods=['GET', 'POST'])
def invoice():
    # if "user_id" in session and request.method=="POST":
    #     u=request.form.get('invoiceno')
    #     x=invoicedetail.get(order_id=u)
    #     id=x.user_id
    #     myInvoices= invoicedetail.query.filter_by(id).first()
    #     return render_template('myinvoice.html', myInvoices=myInvoices)
    # return render_template('myinvoices2.html')









    if "user_id" in session and request.method=="POST":
        number = request.form.get("invoiceno")
        # myInvoices= meta.session.query(invoicedetail).filter_by(id.like(session["user_id"]), orderno.like(number)).first()
        myInvoices= invoicedetail.query.filter_by(user_id=session["user_id"],orderno=number).first()
        if myInvoices:
            return render_template('myinvoice.html', myInvoices=myInvoices)
        else:
            flash('Invoice not found','success')
        # myInvoices=User.query.join(User.invoice).filter(User.id==session["user_id"], invoicedetail.orderno==number).first()
        # if myInvoices.user_id in invoicedetail and myInvoices.orderno in invoicedetail:
        #     return render_template('myinvoice.html', myInvoices=myInvoices)

        # else:
        #     flash('Invoice not found')
        # x = invoicedetail.get(user_id=session["user_id"])
        # if request.form.get('invoiceno')=='1':
        #     myInvoices= invoicedetail.query.filter_by(id=session["user_id"]).first()
        #     return render_template('myinvoice.html', myInvoices=myInvoices)

        # elif request.form.get('invoiceno')=='2':
        #     myInvoices= invoicedetail.query.filter_by(id=session["user_id"]).second()
        #     return render_template('myinvoice.html', myInvoices=myInvoices)
    return render_template('myinvoice3.html')

    
@invoiceapp.route('/inv')
def inv(myInvoice):
    return f"<h1>{myInvoice}</h1>"



# @invoiceapp.route('/getinvoice', methods=['GET'])
# def generate():
#     return render_template('generate.html')

# @invoiceapp.route('/addinvoice', methods=['GET','POST'])
# def add_invoice():
#     if request.method == 'POST':
#         image=save_images(request.files.get('photo'))
#         invoice = invoicedetail(currency=request.form.get('currency'),
#         user_id=session['id'],
#         header=request.form.get('header'),
#         date = datetime.strptime(request.form.get('date'),'%Y-%m-%d'),
#         duedate = datetime.strptime(request.form.get('duedate'),'%Y-%m-%d'),
#         paymentmethod=request.form.get('paymentmethod'),
#         orderno=request.form.get('orderno'),
#         billfrom=request.form.get('emailfrom'),
#         sender=request.form.get('sender'),
#         billto=request.form.get('emailto'),
#         receiver=request.form.get('receiver'),
#         item_name=request.form.get('item'),
#         quantity=request.form.get('qty'),
#         price=request.form.get('price'),
#         totalprice=request.form.get('item_total'),
#         subtotalprice=request.form.get('sub_total'),
#         tax=request.form.get('tax_total'),
#         Discount=request.form.get('discount_total'),
#         Shipping=request.form.get('shipping_total'),
#         Total=request.form.get('grand_total'),
#         Amountpaid=request.form.get('amount_paid'),
#         balance_due=request.form.get('balance_due'),
#         notes=request.form.get('notes'),
#         terms=request.form.get('terms'),
#         late_fees=request.form.get('latefees')
#         )


#         db.session.add(invoice)
#         db.session.commit()
#         return redirect(url_for('invoice_generator'))
#     return render_template('invoicegenerator.html')

       
        

        # db.session.add(invoice) 
        # db.session.commit() 






    # if request.method == 'POST' and form.validate():
    #     item= additem(product_name=form.item.data, quantity=form.qty.data, price=form.price.data)
    #     db.session.add(item)
    #     db.session.commit()
    # return render_template('invoicegenerator.html', form=form)
