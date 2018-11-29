
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";

const getValue = async (err, db) => {
        if (err) throw err;
        var query = { some_id: 3 };
        await db.collection("contributors").find(query).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        }); 
}

const sendRequest = async (request, response, db) => {
    try {
        MongoClient.connect(url, getValue);
        response.json();
    } catch (err) {
      console.log(err);
      next(); 
    }
}

app.get('/', function(request, response){
    response.send('<h1>Hello, Collection!</h1>');
});

app.post('/', sendRequest);

app.listen(8080);