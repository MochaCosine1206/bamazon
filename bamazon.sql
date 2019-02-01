DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity);
VALUES (1, "DoggieSnaps", "Pet Food", 8.36, 20), (2, "LazerTag", "Toys", 89.99, 15), (3, "Blue Mountain Dog Food", "Pet Food", 3.49, 150), (4, "Mezza Coffee Filters - Large", "Coffee", 4.43, 200), (5, "Hephard Yellow Corn Meal", "Baking Items", 1.49, 30), (6, "Oscar Meyer real Beef Balogna", "Deli Meat", 3.49, 50), (7, "Tanner House Bourbon", "Liquor", 39.99, 20), (8, "Russian Road Vodka", "Liquor", 15.39, 50), (9, "Purple Fan Chardonney", "Wine", 7.99, 120), (10, "Largo Paper Towels - 8 pack", "Paper products", 3.99, 130);