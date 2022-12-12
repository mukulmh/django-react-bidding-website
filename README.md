<div align="center">
  <h3 align="center">Bidding Website</h3>
  <p align="center">
    A bidding website created with Django REST Framework and React
  </p>
</div>

## About The Project
### Authentication
Sign In: User can sign in with their existing accounts.
Sign Up: User can sign up for an account.
### Home page
In the home page all the products are listed. Only logged in user can place bids for products.
In the product card starting bid, highest bid, highest bidder etc informations are shown.
### Profile page
Logged in user can only access the profile page. In the profile page user can see their basic informations. There are two tabs which are Products and Bids. User can list their products, update or delete existing products. Users biding history is shown in the Bids tab.

## Technology & Frameworks used
### Frontend: 
1. React 
2. React-Bootstrap

### Backend: 
1. Django Rest Framework
2. Simple JWT

Django Backend is deployed on Pythonanywhere.com & React app is deployed on Netlify.
Live Project Link: https://django-react-bidding-site.netlify.app/

## Limitations:
I haven't able to meet all the requirements of the given task. There are so many fields left for improvements. So far what I have done all are pushed in this git repo. I will try to achieve all the requirements in the mean time.

## How to setup this project:
1. Cone the repo
2. open the folder with VS code or any of your favourite editor
3. cd into the backend folder.
4. make a virtualenv by running python -m venv (venv is the name of the env folder). activate it.
5. install all the dependencies by runnint pip install -r requirements.txt. 
6. after all the dependencies are install run python manage.py runserver to start the backend.
7. Now for the react app. open another terminal in the frontend folder. Run npm install to install all the required packages.
8. Then run npm start to start the react app. In the terminal the development server link will be given. 