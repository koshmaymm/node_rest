
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/drinksCollectionDB";

const newPrice = ~~(Math.random()*100);
const drinkOne = {name: "WineOld", price: newPrice};

const sendPostRequest = (request, response) => {
    if(request && response) {
        MongoClient.connect(url, function(err, db){
            const drinks_collection = db.collection('drinks_in_bar');
                drinks_collection.insertOne(drinkOne, function(err, result){
                    if(err){
                        console.log(err);
                        return;
                    }
                    db.close();
                });
        }); 
    }
    response.send('<h2>New drink was added !!!</h2>');
    // res.json();
}

app.get('/', function(request, response){
    response.send('<h1>Hello, Bar!</h1>');
});

app.post('/', sendPostRequest);

app.listen(8080, function(){
    // console.log(drinkOne)
});

/*
function(request, response){

    if(request && response) {
        MongoClient.connect(url, function(err, db){
            const drinks_collection = db.collection('drinks_in_bar');
                drinks_collection.insertOne(drinkOne, function(err, result){
                    if(err){
                        console.log(err);
                        return;
                    }

                    db.close();
                });
        }); 
    }
    response.send('<h2>New drink was added !!!</h2>');
  }
  */