
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

const url = "mongodb://localhost:27017/mydb";

const getValue = async (err, db) => {
        if (err) throw err;
        const query = { 
            some_id: { $gt: 640 } 
        }
        // { categories: 1, pageCount: 1 }
        // some_id: 3,
        // some_id: { $lt: 3}
        // categories: ['Java'],
        // categories: ['Open Source', 'Mobile']
        // pageCount: { $gt: 400 } // more then 400
        //{ pageCount: { $gt: 600 } }

        const resCategories = { 
            categories: 1, 
            pageCount: 1,
            // publishedDate: 1,
            status: 1
        }

        await db.collection("contributors").find(query,resCategories).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
}

const sendRequest = (request, response, db) => {
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