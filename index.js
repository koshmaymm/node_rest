
var express = require('express');
var fs = require('fs');

var app = express();

var drinks = require('./data');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/drinksCollectionDB";

var drinkOne = [
    {name: "WineOld", price: 68}
];

MongoClient.connect(url, function(err, db){
    var collection = db.collection("drinks");

    collection.insertMany(drinks, function(err, results){
        if(err) throw err;

        console.log(results);       
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




