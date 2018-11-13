
var express = require('express');
var fs = require('fs');

var app = express();

var drinks = require('./data');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/drinksCollectionDB";

var drinkOne = {name: "WineOld", price: 68};

MongoClient.connect(url, function(err, db){
    var collection = db.collection("drinks");

    collection.insertMany(drinks, function(err, results){
        if(err) throw err;       
        db.close();
    });    
});

app.use(function(request, response, next){
    var newBar = drinks;
        newBar.push(drinkOne);

    fs.writeFile("./data.json", JSON.stringify(newBar), function (err) {
        if (err) throw err;
        console.log('Replaced!');
        next();
    });
});

app.get('/', function(request, response){
    response.send('<h1>Hello, Bar!</h1>');
});

app.listen(8080, function(){
    // console.log('Server start')
});




