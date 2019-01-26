const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
  });

  connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connected as id " + connection.threadId);
    afterConnection();
  });

  function afterConnection() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      connection.end();
    });
    console.log(query.sql);
  }