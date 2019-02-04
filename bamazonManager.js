const mysql = require('mysql');
const inquirer = require('inquirer');
// const Lookup = require('./dbconstructor');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});
let inventoryProd;
let inventoryAdd;
let newProduct;
let newDept;
let newPrice;
let newUnits;

connection.connect((err) => {
    // console.log("connected as id " + connection.threadId);
    openQuery();
});


function getProducts() {
    var query = connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Qty: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
        }
        openQuery();
    });
    
}

function getLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 6", function (err, res) {
        //   console.log(res);
        console.log("\n-------------------------Below Inventory is dangerously Low----------------------------")
        for (let i = 0; i < res.length; i++) {
            console.log("\nID: " + res[i].item_id, " | Product Name: " + res[i].product_name + " | Department Name: " + res[i].department_name + " | Stock Qty: " + res[i].stock_quantity + " | Price: " + res[i].price + "\n")
        }
        openQuery();
    });
    
}

function addInvQuery(id, units) {
    let qtyUpdate = "UPDATE products SET stock_quantity = stock_quantity + " + units + " WHERE item_id = " + id;
    let invProdUpdate = "SELECT * FROM products WHERE item_id = " + id;
    connection.query(qtyUpdate, (err, res) => {
        // console.log(res);
    })
    connection.query(invProdUpdate, (err, res) => {
        // console.log(res);
        console.log("You have updated: " + res[0].product_name + "\nYour total qty is now: " + res[0].stock_quantity);
        openQuery();
    })
}

function addProduct(prod, dept, price, units) {
    let insert = "INSERT INTO products (product_name, department_name, price, stock_quantity)";
    let prodToAdd = "VALUES ('" + prod + "', '"  + dept + "', " + price + ", " + units + ")";
    connection.query(insert +  prodToAdd + ";", (err, res) => {
        // console.log(res);
        console.log(res.affectedRows + " record(s) updated");
        getProducts();
        openQuery();
    });
}

function addProdInfo() {
    
    inquirer
        .prompt([
            {
                name: "newProduct",
                message: "Please add new product name: "
            },
            {
                name: "newDept",
                message: "Which department is this product in?"
            },
            {
                name: "newPrice",
                message: "What is the price per unit?"
            },
            {
                name: "newUnits",
                message: "How many units will go into inventory?"
            }
        ]).then((answer) => {
            // console.log("Inside addProdInfoanswer");
            console.log(answer);
            newProduct = answer.newProduct;
            newDept = answer.newDept;
            newPrice = parseFloat(answer.newPrice);
            newUnits = parseInt(answer.newUnits);
            addProduct(newProduct, newDept, newPrice, newUnits);
        })
        
}




function addInv() {
    inquirer
        .prompt([
            {
                name: "inventoryProd",
                message: "Please enter ID of product you would like to add inventory to: "
            },
            {
                name: "inventoryAdd",
                message: "How many units would you like to add?"
            },
        ]).then((answer) => {
            // console.log(answer.inventoryProd);
            inventoryProd = answer.inventoryProd;
            // console.log(answer.inventoryAdd);
            inventoryAdd = answer.inventoryAdd;
            addInvQuery(inventoryProd, inventoryAdd);
        })
    
}



function openQuery() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "topMenu",
                message: "\nWelcome back Bamzon Manager!  Please select from the options below:",
                choices: ["View Products for sale", "View low inventory", "Add to inventory", "Add New Product", "Exit"]
            }
        ]).then((answer) => {
            // console.log(answer.topMenu);
            switch (answer.topMenu) {
                case "View Products for sale":
                    getProducts();
                    break;
                case "View low inventory":
                    getLowInventory();
                    break;
                case "Add to inventory":
                    addInv();
                    break;
                case "Add New Product":
                addProdInfo();
                break;
                case "Exit":
                exit()
            }
        })
        
}

function exit() {
    connection.destroy();    
}
