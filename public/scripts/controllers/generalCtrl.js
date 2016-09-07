app.controller("mathsolveCtrl", function ($scope, $http, $location, $route){
	$scope.icons = [
    {src: "matrix.png", name: "Matriz", href: "/solucoes/matriz", color: "#26645c", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "consts.png", name: "Contantes", href: "/solucoes/contantes", color: "#3a8b83", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "log.png", name: "Logaritmo", href: "/solucoes/logaritmo", color: "#1d9989", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "2equation.png", name: "Equação do 2º grau", href: "/solucoes/equacao2", color: "#116f72", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "1equation.png", name: "Equação do 1º grau", href: "/solucoes/equacao1", color: "#0e7a72",  likeCount: 8484},
    {src: "convert.png", name: "Conversão", href: "/solucoes/conversao", color: "#0a7e74", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "geometry.png", name: "Geometria", href: "/solucoes/geometria", color: "#16857d", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "percent.png", name: "Porcentagem", href: "/solucoes/porcentagem", color: "#16857d", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "progress.png", name: "Progressões", href: "/solucoes/progress", color: "#1c998d", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "pow.png", name: "Exponenciação", href: "/solucoes/exponenciacao", color: "#15857d", gifSrc: "matrix.gif", likeCount: 8484},
    {src: "radic.png", name: "Radiciação", href: "/solucoes/radiciacao", color: "#06665e", gifSrc: "matrix.gif", likeCount: 8484},
  ];

  var regex = /(\/[^\/]+)$/ui;
  var pathname = window.location.pathname != "/" ? (window.location.pathname).toString().match(regex)[0] : "";
  
	console.log(window.location.pathname)
  if(pathname == "/matriz"){
	  
				$scope.fill = {
					title: "Matriz",
					instructions: [
						{text: '<b>Execute operações com matrizes:</b> Some, subtraia, multiplique e faça matriz inversa'},
						{text: '<b>Calcule</b> determinante e traço'},
						{text: '<b>Entenda</b> matriz nula, transposta, indentidade e muito mais!'},
						{text: 'Ainda dispomos de um <b><a data-title="Aprenda a manusear" href="javascript:tutorial()">TUTORIAL</a></b> para lhe auxiliar'},
						{text: 'E o melhor, tudo isso de modo <b>simples</b>, <b>rápido</b> e <b>gratuito</b>'}
					],
					includeSrc: '../views/includes-calc/matrix.html',
					loadScriptToDOM: function(){
						loadMatricesDOM();
					},
					solveOption: true
				}
		}else if(pathname == "/logaritmo"){
				$scope.fill = {
					title: "Logaritmo",
					instructions: [
						{text: '<b>Execute operações com matrizes:</b> Some, subtraia, multiplique e faça matriz inversa'},
					    {text: '<b>Calcule</b> determinante e traço'},
					    {text: '<b>Entenda</b> matriz nula, transposta, indentidade e muito mais!'},
					    {text: 'Ainda dispomos de um <b><a data-title="Aprenda a manusear" href="javascript:tutorial()">TUTORIAL</a></b> para lhe auxiliar'},
					    {text: 'E o melhor, tudo isso de modo <b>simples</b>, <b>rápido</b> e <b>gratuito</b>'}
					],
					includeSrc: '../views/includes-calc/logarithm.html',
					loadScriptToDOM: function(){
						loadMatricesDOM();
					},
					solveOption: true
				}

	  }
	
   $scope.load = function() {
       var script = document.createElement( 'script' );
       script.type = 'text/javascript';
       script.src = "../../scripts/inner-scripts/general.js";
       document.body.appendChild(script);
   };
   $scope.load()
});
app.controller("mathsolveMatrixCtrl", function ($scope){
});
app.controller("mathsolveLogarithmCtrl", function ($scope){
});

