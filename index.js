
var express = require('express');
var fs = require('fs');

var app = express();

var path = 'data.json';

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/drinksCollectionDB";


var users = [
    {name: "Absinthe", price: 73}, 
    {name: "Beer", price: 5}, 
    {name: "Brandy", price: 45},
    {name: "Whisky", price: 34},
    {name: "Wine", price: 50}
];
 
MongoClient.connect(url, function(err, db){
     
    var collection = db.collection("users");
    collection.insertMany(users, function(err, results){
             
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
});

app.use(function(request, response, next){
   var data = JSON.stringify({
    "Time" :`${new Date().toLocaleString()}`
   });
   
    fs.writeFile(path, data, function (err) {
        if (err) throw err;
        console.log('Replaced!');
        next();
      });
});

app.get('/', function(request, response){
    console.log(request.url);
    response.send('<h1>Hello, world!</h1>');
});

app.listen(8080, function(){
    console.log('Server start')
});




