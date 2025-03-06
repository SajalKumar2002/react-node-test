THIS IS A README FILE WTIH INSTRUCTIONS HOW TO RUN THE PROJECT.

For starters.
Installing the dependencies

Cammands to follow
Open two terminal
(Note: User should be in the root directory of the project)

In one terminal, To install dependencies for frontend(client side).

    npm install 

    cd frontend
    npm install

In other terminal, To install dependencies for backend(servier side).

    cd backend
    npm install

Now dependencies have been installed. Its time to import the sample data into the Database, Here DB is used is MONGODB.
(Note: Use the terminal, You used for backend.)

    npm run data:import

(Note: If the above Cammand Displayed the error for not able to connect to mongodb Database, you Can use my Remote Database. Go to backend folder, Find a .env file and comment out the line with MONGO_URI, adding uncomment the line with MONGO_URI)

NOW, THE DEPENDENCIES HAVE BEEN INSTALLED, IT'S TIME TO RUN THE PROJECT.
(Note: User should be in the root directory of the project)

    npm start

This cammand should start the whole Project. If something goes wrong, Try reinstalling the dependencies. 

Other Way to start the Project(Note: You will need two terminals for these).
In one terminal.

    cd backend
    npm run server

In other terminal. 

    cd frontend
    npm run start

NOW YOU MUST HAVE SUCCESSFULLY STARTED THE PROJECT, IT'S TIME TO SEE WHAT IS IN THE PROJECT.

The screen that will be displayed is the login screen at localhost:3000. 

Use this:
Email: admin@gmail.com
password: admin

If you have the id and password, then you are good to go. For other's you can sign up by clicking registering as a new user. 
Once user is registered, You have to go back to the login screen and login with those credentials you used earlier at the registration page.

Forgetting the password has not functionality right now.
