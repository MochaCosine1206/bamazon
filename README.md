# bamazon
A Node.js and MYSQL project demonstrating command line database entry, computation, and output.

This CLI APP uses inquirer and mysql to create a POS system for users at 3 levels.

1) The Customer Level reproduces a purchase, modifying the entry in the database at time of purchase:

![bamazoncustomer](https://user-images.githubusercontent.com/41648281/52213508-870e5600-284c-11e9-8644-52e937aa16ab.gif)

2) The Manager Level offers options for viewing available products, viewing low inventory, adding to inventory, and adding new products.

![bamzomanager](https://user-images.githubusercontent.com/41648281/52213511-87a6ec80-284c-11e9-8ec1-defd5da6e27b.gif)

3) The Supervisor Level returns the tables joined to view total over head costs, sales, and profit by department.

![bamazonsupervisor](https://user-images.githubusercontent.com/41648281/52213509-87a6ec80-284c-11e9-8ccb-75b0e01c9a36.gif)

 - additionally, the Supervisor Level allows the creation of new departments.  In the below example, a new product had been added and sold in the Soft Drinks dept.  The Supervisor adds the department and then can see their totals pre populated.
 

![bamazonsupervisornewdept](https://user-images.githubusercontent.com/41648281/52213510-87a6ec80-284c-11e9-93bb-4a7a89a1b8ab.gif)

In order to run this app, for the repository and run the .sql file included to create the databases in MySQL.
