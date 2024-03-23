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

module.exports = config;
