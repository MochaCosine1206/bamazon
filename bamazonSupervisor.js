const inquirer = require('inquirer');
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
    // console.log("connected as id " + connection.threadId);
    supMenu();
  });

  function getDepartments() {
    connection.query("SELECT departments.department_ID, departments.department_name, departments.over_head_costs,  products.product_name, SUM (DISTINCT products.product_sales) as 'product_sales', (SUM (DISTINCT products.product_sales) - (departments.over_head_costs)) as 'total_profit' FROM departments INNER JOIN products ON departments.department_name = products.department_name GROUP BY departments.department_name ORDER BY departments.department_ID", (err, res) => {
        if (err) throw err;
        // console.log(res);
        for (let i = 0; i < res.length; i ++){
                console.log("ID: " + res[i].department_ID, " | Department Name: " + res[i].department_name + " | Over Head Costs: " + res[i].over_head_costs + " | Product Sales: " + res[i].product_sales + " | Total Profit: " + res[i].total_profit + "\n");
        };
        supMenu();
    });
  }

  function createDept() {
      inquirer
      .prompt ([
          {
            name: "deptName",
            message: "Please type a new department name: "
          },
          {
            name: "overHead",
            message: "Please create new overhead amount: "
          }
      ]).then((answer) => {
          let deptName = answer.deptName;
          let overHead = parseInt(answer.overHead);
          createDeptData(deptName, overHead);
      })
  }

  function createDeptData(deptName, overHead) {
    let newDept = "INSERT INTO departments (department_name, over_head_costs)";
    let newOH = "VALUES ('" + deptName + "', "  + overHead + ")";
    connection.query(newDept +  newOH + ";", (err, res) => {
        if (err) throw err;
        // console.log(res);
        console.log(res.affectedRows + " record(s) updated");
        supMenu();
    });
  }

  function exit() {
      console.log("Goodbye!  Come Again!")
      connection.end();
  }


function supMenu() {
    inquirer
.prompt([
    {
        type: "list",
        name: "supMenu",
        message: "Welcome back Bamzon Supervisor!  Please select from the options below:",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]
    }
]).then((answer) => {

switch(answer.supMenu) {
    case "View Product Sales by Department":
    getDepartments();
    break;
    case "Create New Department":
    createDept();
    break;
    case "Exit":
    exit()
}
});
}