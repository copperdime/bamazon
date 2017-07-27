DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

use bamazon;

CREATE TABLE products(
item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50),
price DECIMAL(10,2),
stock_quantity INTEGER(10),
PRIMARY KEY(item_id)
);

SELECT * from products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("iPhone", "Apple_Products", 350.99, 100);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values ("Samsung Galaxy", "Electronics", 299.99, 120);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Michellan Tires", "Auto", 200, 25);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Fubbles", "Toys", 2.99, 55);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Happy Pig Day!", "Children's Books", 9.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Should I share my Ice Cream?", "Children's Books", 9.99, 15);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Samsung Galaxy Notebook", "Electronics", 999.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Head & Shoulders Shampoo", "Health & Beauty", 8.99, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Bounty", "Household Cleaners", 17.99, 20);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Dove Body Wash", "Health & Beauty", 9.99, 45);

INSERT INTO products(product_name, department_name, price, stock_quantity)
values("Haagen Das Vanilla Bean", "Frozen Desserts", 6.99, 56);

