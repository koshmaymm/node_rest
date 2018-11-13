
var express = require('express');
var fs = require('fs');

var app = express();

var persons = require('./data');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/drinksCollectionDB";


var drinks = [
    {name: "Absinthe", price: 73}, 
    {name: "Beer", price: 5}, 
    {name: "Brandy", price: 45},
    {name: "Whisky", price: 34},
    {name: "Wine", price: 50}
];

var drinkOne = [
    {name: "WineOld", price: 68}
];
 
/*MongoClient.connect(url, function(err, db){
    var collection = db.collection("drinks");
    collection.insertMany(drinks, function(err, results){     
        collection.findOneAndUpdate(
            {price: 25}, 
            { $set: {price: 21}},    
            {                            
                 returnOriginal: false
            },
            function(err, result){                 
                console.log(result);
                db.close();
            }
        );
    });
});*/

MongoClient.connect(url, function(err, db){
    var collection = db.collection("drinks");
    // метод insertMany используется для добавления множества обьектов
    collection.insertMany(drinkOne, function(err, results){
        if(err) throw err;

        console.log('Data added!');
        console.log('********** Result **********');
        console.log(results);
        console.log('****************************');        
        db.close();
    });    
});

/*app.use(function(request, response, next){
   var data = JSON.stringify({
    "Time" :`${new Date().toLocaleString()}`
   });
   
    fs.writeFile(path, data, function (err) {
        if (err) throw err;
        console.log('Replaced!');
        next();
    });
});*/

app.get('/', function(request, response){
    console.log(request.url);
    response.send('<h1>Hello, world!</h1>');
});

app.listen(8080, function(){
    console.log('Server start')
});




