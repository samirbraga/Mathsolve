//includes
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

// configure
app.set('views', __dirname + '/views');
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = Number( process.env.PORT || 3000 )
app.listen(port, function () {
  console.log('Mathsolver running in localhost:3000');
});

// include math matrix operators
var math = require('./solutions/matrix/allsolutions.js');
// matrix fill page content

app.get('/:url', function (req, res) {
	if(req.params.url == "matriz" || req.params.url == "")	res.render('layout.html');
});

matrixA = [];
matrixB = [];

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

