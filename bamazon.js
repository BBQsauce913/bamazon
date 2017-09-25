var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start(){
      connection.query("SELECT * FROM products", function(err, results){
          if (err) throw err;
      inquirer.prompt([
        {
          name: "buy",
          type: "rawList",
          choices: function(){
              var productArray = [];
              for (var i = 0; i < productArray.length; i++){
                  productArray.push(results[i].product_name)
              } return productArray;   
            },
            message: "What product (ID) would you like to buy?",            
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like to buy?",
            validate: function(value){
                if (isNaN(value) === false){
                    return true;
                } 
                    return false;
            }
        }
    ])
//     .then(function(answer){
//     var chosenProduct;
//     for (var i = 0; i < results.length; i++) {
//         if(results[i].product_name === answer.choice) {
//             chosenProdcut = results[i];
//     }
//   }  
//   if (chosenProduct.stock_quantity < parseInt(answer.start)){
//       connection.query("UPDATE stock_quantity SET ? WHERE ?",
//     [
//         {
//             product_name: answer.product,
//             stock_quantity: answer.quantity,
//         },
//         {
//             id: chosenProduct.id
//         }
//     ],
//     function(error){
//         if (error) throw err;
//         console.log("You Bought the Item!");
//         start();
//         }
//     );
//   } else { 
//         console.log("There is not enough product");
//         start();
//     }
//   });
});
}
