# -*- coding: utf-8 -*-
"""
Created on Wed May 13 21:49:17 2020

@author: HP
"""

import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
#import os
import imaplib,email
from email import policy
import socket
import time
sender_email = 'your email'
#print(sender_email)
receiver_email = input("email :")
jobid = input("jobid :")
jobid='jobid'+jobid
password = 'your password'

message = MIMEMultipart("alternative")
message["Subject"] = "Do u want to restart server..?"
message["From"] = sender_email
message["To"] = receiver_email

html = """\
<html>
  <head>  
    <style>
      .button {
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
      </style>
  </head>
  <body>
    <h1 id = "tochange" style="color:red;"> Click Approve to restart the server.</h1>
    <p style="color:green;">
    <a href="mailto:dummymail14496@gmail.com?subject=""" + jobid + """&body=Approved" onclick="window.open(this.href,'yourWindowName', 'width=200,height=150'); return false;" onkeypress="window.open(this.href); return false;"><input style="background-color: green;" class= "button" type="button"  value="APPROVE" /></a>
    </p>
    <p style="color:red;">
    <a href="mailto:dummymail14496@gmail.com?subject=""" + jobid + """&body=Rejected" onclick="window.open(this.href,'yourWindowName', 'width=200,height=150'); return false;" onkeypress="window.open(this.href); return false;"><input style="background-color: red;" class= "button" type="button"  value="REJECT" /></a>
    </p>
  </body>
</html>"""
htmln = """\
  <html>
  <head>  
    <style>
      .button {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
      }
      </style>
  </head>
  <body>
    <h1 id = "tochange" style="color:red;"> I am not clicked </h1>
    
    <p color="red" >Hi,<br>
       How are you?<br>
       <a href="http://chriscoyier.net"><input style="background-color: #4CAF50;" class= "button" type="button"  value="Yes" /></a>
       has many great tutorials.
    </p>
  </body>
</html>
  """

# Turn these into plain/html MIMEText objects
part2 = MIMEText(html, "html")

# Add HTML/plain-text parts to MIMEMultipart message
# The email client will try to render the last part first
message.attach(part2)

# Create secure connection with server and send email
context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(
        sender_email, receiver_email, message.as_string()
    )
    
time.sleep(80)

socket.getaddrinfo('localhost', 8080)
imap_host = 'imap.gmail.com'
imap_user = 'dummymail14496@gmail.com'

# init imap connection
mail = imaplib.IMAP4_SSL(imap_host, 993)
rc, resp = mail.login(imap_user, password) #pls enter password here

# select only unread messages from inbox
mail.select('Inbox')
status, data = mail.search(None, '(UNSEEN)')

# for each e-mail messages, print text content
for num in data[0].split():
    # get a single message and parse it by policy.SMTP (RFC compliant)
    status, data = mail.fetch(num, '(RFC822)')
    email_msg = data[0][1]
    email_msg = email.message_from_bytes(email_msg, policy=policy.SMTP)

    print("\n----- MESSAGE START -----\n")

    print("From: %s\nTo: %s\nDate: %s\nSubject: %s\n\n" % ( \
        str(email_msg['From']), \
        str(email_msg['To']), \
        str(email_msg['Date']), \
        str(email_msg['Subject'] )))
    client_response={}
    if 'jobid' in email_msg['Subject']:
        s=email_msg['Subject']
            
        #dictionary = dict(zip(keys, values))
    
        # print only message parts that contain text data
        for part in email_msg.walk():
            if part.get_content_type() == "text/plain":
                for line in part.get_content().splitlines():
                    client_response.update({s[5:]:line})
    

    print("\n----- MESSAGE END -----\n")
    print('userdata')
    print(client_response)
    print('client response :',client_response['1'])