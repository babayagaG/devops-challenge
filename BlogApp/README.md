# How to build the application

## Prerequisite
1. NodeJS version 20 and above installed.
2. MySQL Server version 5.7 and above is running.

### Step 1
Edit the .env file at the root directory. Change the `PROD_HOST="blogapp-mysqldb-1"` into your MySQL Server IP or Hostname.

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