
const express = require('express');
const fs = require('fs');

const app = express();

const drinks = require('./data');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/drinksCollectionDB";

const drinkOne = {name: "WineOld", price: 68};

MongoClient.connect(url, function(err, db){
    const collection = db.collection("drinks");

    collection.insertMany(drinks, function(err, results){
        if(err) throw err;       
        db.close();
    });    
});

app.use(function(request, response, next){
    const newBar = drinks;
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




