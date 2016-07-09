//includes
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

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
var matrixFill = {
	title: "Matriz",
	instructions: [
		{text: '<b>Execute operações com matrizes:</b> Some, subtraia, multiplique e faça matriz inversa'},
        {text: '<b>Calcule</b> determinante e traço'},
        {text: '<b>Entenda</b> matriz nula, transposta, indentidade e muito mais!'},
        {text: 'Ainda dispomos de um <b><a href="javascript:tutorial()">TUTORIAL</a></b> para lhe auxiliar'},
        {text: 'E o melhor, tudo isso de modo <b>simples</b>, <b>rápido</b> e <b>de graça</b>'}
	]
}
app.get('/matriz', function (req, res) {
  res.render('layout.html');
});
app.get('/matriz/info', function (req, res) {
  res.send(matrixFill);
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

