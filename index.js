
var express = require('express');
var fs = require('fs');

var app = express();

var path = 'data.json';

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";


MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
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




