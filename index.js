var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var math = require('./solutions/matrix/allsolutions.js');

app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, function () {
  console.log('Mathsolver running in localhost:3000');
});
app.get('/matriz', function (req, res) {
  res.render('matrix.html');
});

var matrixA = [];
var matrixB = [];


app.post('/matriz', function (req, res) {
    matrixA = [];
    matrixB = [];
	matrixA = JSON.parse(req.body.matrixA);
	matrixB = JSON.parse(req.body.matrixB);
	res.end('yes');
});
app.get('/matriz/:operation', function (req, res) {
	switch (req.params.operation) {
		case "sum":
			res.send(JSON.stringify(math.sum(matrixA, matrixB)));
			break;
		case "minus":
			res.send(JSON.stringify(math.minus(matrixA, matrixB)));
			break;
		case "multiply":
			res.send(JSON.stringify(math.multiply(matrixA, matrixB)));
			break;
	};
});

