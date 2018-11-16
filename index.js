
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/drinksCollectionDB";

const newPrice = ~~(Math.random()*100);
const drinkOne = {name: "WineOld", price: newPrice};

const addNewDrink = async (err, db) => {
    await db.collection('drinks_in_bar').insertOne(drinkOne);
        db.close();
}

const sendPostRequest = async (request, response, db) => {
    try {
        MongoClient.connect(url, addNewDrink);
        response.json(drinkOne);
    } catch (err) {
      console.log(err);
      next(); 
    }
} 

app.get('/', function(request, response){
    response.send('<h1>Hello, Bar!</h1>');
});

app.post('/', sendPostRequest);

app.listen(8080, function(){
    // console.log(drinkOne)
});