# ProjectAppBrew

**Authors:** Antonio Tassone and Rafael Merlotto

**Version:** 1.0.0

This project manage an application to brewing home made. This application is composed by two parts: backend and frontend. Both these parts are independents. The application is responsive, it can adapt on all device for each width.

How to use the application? Follow these steps:
1) move inside the backend directory
2) execute the command ```npm install``` to installing all the dependencies
3) make a file named ```.env```, in this file create two variables, ```DATABASE_URL``` and ```JWT_PRIVATE```
4) make a directory named ```uploads``` and inside this directory create a subdirectory named ```images```
5) execute the command ```npx prisma db push``` to create the database starting from the schema
6) start the backend with the command ```npm start```
7) move inside the frontend directory
8) execute  the command ```npm install``` to installing all the dependencies
9) start the angular application with the command ```ng serve```

Good luck for all!