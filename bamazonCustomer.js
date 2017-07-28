/* Pseudocoding
 * Create database in mysql with tables including id, product name, and price X
 * Populate table using INSERT commands X
 * Prompt user which item id they want to select use INQUIRER X
 * Run a query for that item id selection into your database
 * Display only that item (USE SELECT command)
 * Prompt user for quantity of the item they wish to purchase (INQUIRER)
 * Check quantity of item in stock in your database
 if (quantity <= user.purchaseQuantity){
 quantity -= user.purchaseQuantity;
 costOfItemsPurchased = "$" + (quantity * price);
 return costOfItemsPurchased;
 return "Insufficient quantity!";
 }
 */

var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    user:'root',

    password:'',
    database:'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    console.log('You are connected!');
    queryAllItems();
});
function queryAllItems() {
    connection.query("SELECT * FROM products", function(err, res) {
        console.log("----------------------------------------------------------------------");
        console.log("Item ID  | Product Name  | Department Name  | Price  | Stock Quantity  ");
        console.log("----------------------------------------------------------------------");

        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name +
                " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        itemPurchase();
    });
}

function purchase(id, quantity, product){
    //Deciding whether my store has the quantity in stock
    var amountOwed;
    // if store can handle the order
    if (quantity <= product.stock_quantity){
        amountOwed = (quantity * product.price);

        var newQuantity = product.stock_quantity - quantity;
        // go to database and subtract customer's requested quantity
        var query2 = "UPDATE products SET stock_quantity = "+ newQuantity +" WHERE ?";
        connection.query(query2, { item_id: id }, function(err, res){
            // subtract the quantity from the stock
            // if(res.length){
            //    var product = res[0];
            // }
            // Report success to terminal
            console.log("Great purchase! Your total is " + amountOwed);
            console.log("You purchased item_id: " + id + " || product_name: " +
                product.product_name + " || for : " + product.price + " per unit!");
            console.log( "If you'd like to purchase more " + product.product_name +
                "'s, our store's new quantity is: " + newQuantity);
        })
    } else{
        console.log("Insufficient quantity!");
    }
}

// Prompt User to enter the ID of the product they'd like to purchase
function itemPurchase() {
    inquirer
        .prompt([
            {
                name: "purchaseThis",
                type: "input",
                message: "Enter the Item ID you want to purchase:"
            },
            {
                name: "purchaseQuantity",
                type: "input",
                message: "Enter the quantity: "
            }
        ])
        .then(function(answer) {
            var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE ?";
            connection.query(query, { item_id: answer.purchaseThis }, function(err, res){
                // console.log(res);
                if(res.length){
                    var product = res[0];

                    console.log("You've selected item_id: " + answer.purchaseThis + " || product_name: " + product.product_name + " || price: " + product.price + " || quantity: " + answer.purchaseQuantity);
                }

                purchase(answer.purchaseThis, answer.purchaseQuantity, product);

            });
        });
}
