var express = require('express');

var app = express();

app.listen(3000);

app.use(express.static(__dirname + '/client'));
