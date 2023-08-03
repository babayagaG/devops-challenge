# How to build the application

## Prerequisite
1. NodeJS version 20 and above installed.
2. MySQL Server version 5.7 and above is running.

### Step 1
Edit the .env file.

Change the variables according to the MySQL database server that you have setup.

Change the `PROD_PASSWORD="password"` with the root password of your MySQL server.

Change the `PROD_DATABASE="challenge"` with the database name that you have created inside your MySQL server.

Change the `PROD_HOST="blogapp-mysqldb-1"` into your MySQL Server IP or Hostname.

### Step 2
Run the command below.
```
npm install
```

### Step 3
In order to start the application, you will need to run the command below.
```
npm run start
```
You can visit http://<your server ip>:3000/

You can register a new user to test the application functionality.