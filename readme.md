
## Installation:
- clone the project
- ```pip install -r backend/requirements.txt```
- ```cd frontend``` ``` npm install --force```
- Open two terminals for backend and frontend
- ```python manage.py runserver``` ```npm start
- Both the customer and owner can login from the same page. If the username has ```IsStaff``` permission then the user is considered a owner. Superusers are by default owners.
- Don't forget to assign these in ```core/settings.py```
 ```EMAIL_HOST_USER = '<your-business-gmail>' EMAIL_HOST_PASSWORD='<token-gained-for-third-party-app-for-gmail>' ```

## OAuth2.0 Setup:
- go to Django admin-page and under DJANGO OAUTH TOOLKIT create new Applications and copy the ```Client id``` and  ```Client secret``` before saving
- optain ```Google Client Id``` 
- create a ```.env``` file inside frontend folder add the ids in format below:		```
```
#django oauth backend credentials
REACT_APP_CLIENT_ID = <>
REACT_APP_CLIENT_SECRET = <>
#provided by google
REACT_APP_GOOGLE_CLIENT_ID = <>
```

## Customer Side Images
<img src="demo/Screenshot%202024-01-08%20143311.png" width="708px"/>
<img src="demo/Screenshot%202024-01-08%20143321.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143328.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143338.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143351.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143412.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143401.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%201435341.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143633.png" width="700px"/>


## Owner Site Images
<img src="demo/Screenshot%202024-01-08%20144152.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143734.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143752.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143801.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143854.png" width="700px"/>
<img src="demo/Screenshot%202024-01-08%20143745.png" width="700px"/>
