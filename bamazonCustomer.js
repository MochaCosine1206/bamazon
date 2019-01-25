const express = require('express');
const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Douglas79Cookie",
    database: "bamazon"
  });

  connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  const app = express();

//   app.get('/createDB', (req, res) => {
//     let sql = 'CREATE DATABASE bamazon'
//     connection.query(sql, (err, result) => {
//         if(err) throw err;
//          console.log(res)
//         res.send('database created...')
//     })
//   });

  app.listen('3000', () => {
      console.log("Server started on port 3000");
  });

 

  function afterConnection() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
  }