const mysql = require('mysql');
const inquirer = require('inquirer');
const Lookup = require('./dbconstructor');

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
    getLowInventory()
  });

  function getProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("\nWelcome to Bamazon!" + "\n+----------------------------------------------------+\n")
      for (let i = 0; i < res.length; i++){
        console.log("ID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Qty: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
      }
      getLowInventory()
    });
  }

  function getLowInventory() {
    var query = connection.query("SELECT * FROM products WHERE stock_quantity < 6", function(err, res) {
      if (err) throw err;
    //   console.log(res);
    console.log("\n-------------------------Below Inventory is dangerously Low----------------------------")
      for (let i = 0; i < res.length; i++){
        console.log("\nID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Qty: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
      }
    });
    connection.end();
  }

  inquirer 
  .prompt([
      {
        type: "list",
        name: "topMenu",
        message: "Please select from the options below.",
        choices: ["View Products for sale", "View low inventory", "Add to inventory", "Add New Product"]
      }
  ]).then((answer) => {
      console.log(answer.topMenu);
  })