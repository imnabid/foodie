import random
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib, ssl
from django.conf import settings

def otp_generator():
    otp = random.randint(10000,100000)
    return otp

def send_email(email, otp):
    subject = 'Foodie  OTP verification'
    message = f'Your OTP code is {otp}'
    sender = settings.EMAIL_HOST_USER
    password = settings.EMAIL_HOST_PASSWORD

    em = MIMEMultipart()
    em['From'] = sender
    em['to'] = email
    em['Subject'] = subject
    em.attach(MIMEText(message,'plain'))
    context = ssl.create_default_context()
    with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
        smtp.login(sender , password)
        smtp.sendmail(sender, email, em.as_string())



