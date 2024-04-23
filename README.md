# angular__nodejs_express_sql__boilerplate

Simple application demonstrating the use of Angular as a front-end application and NodeJS as a backend application.

## Back-end application

This project is compatible with sql-based databases.

## Installation
1. Firstly, go to ``back-end`` directory.
2. You have to install npm packages with ``npm install`` command.
3. Create MS SQL database. To do this, run all scripts from ``sql_server_scripts directory``.
4. Set/modify DB configuration saved in ``data_access/db-config.js``.
5. Finally, your app will run successfully with ``npm run start`` command.

### Default DB config

```javascript
const config = {
  server: "localhost\\SQLEXPRESS",
  port: 1433,
  user: "UserApp",
  password: "zaq1@WSX",
  database: "MyBase",
  options: {
    enableArithAbort: true,
    encrypt: false
  },
  trustServerCertificate: true,
};
```
