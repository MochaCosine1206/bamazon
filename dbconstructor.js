const mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});



const Lookup = function (id, units) {
    this.id = id;
    this.units = units;
    this.queryID;
    this.queryProd;
    this.queryQTY;
    this.queryPrice;
    this.queryConnect = () => {
        connection.connect((err) => {
            if (err) {
                throw err;
            }
            console.log("connected as id " + connection.threadId);
            this.getQueryRows();
          });
    }
    this.getQueryRows = () => {
         connection.query("SELECT * FROM products WHERE item_id = " + this.id, function (err, res) {
            let queryQTY;
            if (err) throw err;
            this.queryID = res[0].item_id;
            this.queryProd = res[0].product_name;
            this.queryDept = res[0].department_name;
            this.queryQTY = res[0].stock_quantity;
            this.queryPrice = res[0].price;
            console.log(this.queryID + " " + this.queryProd);
            return [this.queryID, this.queryProd, this.queryDept, this.queryQTY, this.queryPrice];
        });
    }
}

let lookup1 = new Lookup(1, 10);

lookup1.queryConnect();

module.exports = Lookup;