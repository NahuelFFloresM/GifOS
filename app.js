var express = require('express');
const path = require('path');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/user', function(req,res){
  res.sendFile(path.join(__dirname, '/user.html'));
})

app.listen(3000);