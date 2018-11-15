
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/drinksCollectionDB";

const newPrice = ~~(Math.random()*100);
const drinkOne = {name: "WineOld", price: newPrice};

app.get('/', function(request, response){
    response.send('<h1>Hello, Bar!</h1>');
});

app.post('/',function(request, response){

    if(request && response) {
        MongoClient.connect(url, function(err, db){
            var drinks_collection = db.collection('drinks_in_bar');
        
            drinks_collection.insertOne(drinkOne, function(err, result){

                if(err){ 
                    console.log(err);
                    return;
                }
                console.log(result.ops);
                db.close();
            });
        }); 
    }
  });

app.listen(8080, function(){
    // console.log(drinkOne)
});