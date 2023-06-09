/*var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_database",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = con*/

module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "todo_database",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};