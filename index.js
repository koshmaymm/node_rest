
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/drinksCollectionDB";

const drinkOne = {name: "WineOld", price: 68};

/* const drinks = require('./data'); /// used only once, to create drinks collection

 MongoClient.connect(url, function(err, db){
    var collection = db.collection('drinks_in_bar');
    
    collection.insertMany(drinks, function(err, results){
        if(err) throw err;
        console.log(results);        
        db.close();
    });    
}); */


app.get('/', function(request, response){
    response.send('<h1>Hello, Bar!</h1>');
});

app.listen(8080, function(){
    // console.log('Server start')
});

// const fs = require('fs');
// const drinks = require('./data');
/* app.use(function(request, response, next){
    const newBar = drinks;
        newBar.push(drinkOne);
}); */

/*
collection.insertMany(drinks, function(err, results){
        if(err) throw err;       
        db.close();
    });
*/