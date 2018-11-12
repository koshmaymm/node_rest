
var express = require('express');
var fs = require('fs');

var app = express();

var path = 'data.json';

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




