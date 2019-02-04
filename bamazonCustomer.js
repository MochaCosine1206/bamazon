const mysql = require('mysql');
const inquirer = require('inquirer');


let id;
let units;
let totalPrice;
let queryPrice;

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
    getProducts();
  });

  function getProducts() {
    var query = connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      // console.log(res);
      console.log("\nWelcome to Bamazon!" + "\n+----------------------------------------------------+\n")
      for (let i = 0; i < res.length; i++){
        console.log("ID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Qty: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
      }
      userPrompt();
    });
  }


function userPrompt() {
  inquirer
  .prompt([
    {
      name: "id",
      message: "Please Select Product ID you wish to purchase: "
    },
    {
      name: "units",
      message: "How many would you like?"
    }
  ]).then((answer) => {
    id = parseInt(answer.id);
    units = parseInt(answer.units);
    // console.log("ID: " + id + "\nUnits: " + units);
    qtyCheck(id, units);
  })
}

//If store does not have enough qty for the product
//console.log("Insufficient Qty! Please select lower amount.)
//reprompt user

function qtyCheck(id, units) {
  
  connection.query("SELECT * FROM products WHERE item_id = " + id, function(err, res) {
    let queryQTY;
    if (err) throw err;
    // console.log(res[0].stock_quantity);
    queryQTY = parseInt(res[0].stock_quantity);
    // console.log("Inside sql query: " + queryQTY);
    if(units > queryQTY) {
      console.log("Insufficient Qty! Please select lower amount.")
    } else {
      updateBamazon(id, units, queryQTY);
    }    
  });
}

function updateBamazon(id, units, queryQTY) {
    let qtyUpdate = "UPDATE products SET stock_quantity = " + (queryQTY - units) + " WHERE item_id = " + id;
    let qtyPrice = "SELECT * FROM products WHERE item_id = " + id;
    connection.query(qtyUpdate, (err, res) => {
      if (err) throw err;
      // console.log(res.affectedRows + " record(s) updated");
      //need to return the total price of user selection.
    })
    connection.query(qtyPrice, (err, res) => {
      if (err) throw err;
      // console.log(res);
      queryPrice = parseFloat(res[0].price);
      totalPrice = queryPrice * units;
      
      console.log("Thank you for purchasing: " + res[0].product_name + "\nYour total cost is: $" + totalPrice.toFixed(2));
      updateSales(totalPrice, id);
    })
    
}

function updateSales(totalPrice, id) {
  // console.log(totalPrice);
  let salesUpdate = "UPDATE products SET product_sales = " + totalPrice + " WHERE item_id = " + id;
  connection.query(salesUpdate, (err, res) => {
    if(err)throw err;
 })
  connection.end();
}


