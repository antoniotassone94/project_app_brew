# ProjectAppBrew

This project manage an application to brewing home made.\\
This application is composed by two parts: backend and frontend. Both these parts are independents.\\
\\
How to use the application? Follow these steps:\\
1) in the directory backend make a file named ```.env```, in this file create two variables, ```DATABASE_URL``` and ```JWT_PRIVATE```\\
2) In the directory backend make a directory named ```uploads``` and inside this directory create a subdirectory named ```images```\\
3) In the directory backend execute the command ```npx prisma db push``` to create the database starting from the schema\\
4) start the backend with the command ```npm start```\\
5) move to frontend directory and start the angular application with the command ```ng serve```\\
\\
Good luck for all!