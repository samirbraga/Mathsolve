app.controller("mathsolveCtrl", function ($scope, $http){
	$scope.icons = [
    {src: "matrix.png", name: "Matriz", href: "/matriz", color: "#26645c"},
    {src: "consts.png", name: "Contantes", href: "/contantes", color: "#3a8b83"},
    {src: "log.png", name: "Logaritmo", href: "/logaritmo", color: "#1d9989"},
    {src: "2equation.png", name: "Equação do 2º grau", href: "/equacao2", color: "#116f72"},
    {src: "1equation.png", name: "Equação do 1º grau", href: "/equacao1", color: "#0e7a72"},
    {src: "convert.png", name: "Conversão", href: "/conversao", color: "#0a7e74"},
    {src: "geometry.png", name: "Geometria", href: "/geometria", color: "#16857d"},
    {src: "percent.png", name: "Porcentagem", href: "/porcentagem", color: "#16857d"},
    {src: "progress.png", name: "Progressões", href: "/progress", color: "#1c998d"},
    {src: "pow.png", name: "Exponenciação", href: "/exponenciacao", color: "#15857d"},
    {src: "radic.png", name: "Radiciação", href: "/radiciacao", color: "#06665e"},
  ]
	switch (window.location.pathname){
		case "/matriz":
			$scope.fill = {
			    title: "Matriz",
				instructions: [
					{text: '<b>Execute operações com matrizes:</b> Some, subtraia, multiplique e faça matriz inversa'},
			        {text: '<b>Calcule</b> determinante e traço'},
			        {text: '<b>Entenda</b> matriz nula, transposta, indentidade e muito mais!'},
			        {text: 'Ainda dispomos de um <b><a href="javascript:tutorial()">TUTORIAL</a></b> para lhe auxiliar'},
			        {text: 'E o melhor, tudo isso de modo <b>simples</b>, <b>rápido</b> e <b>gratuito</b>'}
				],
				includeSrc: 'views/includes-calc/matrix.html',
				loadScriptToDOM: function(){
					loadMatricesDOM();
				},
				solveOption: true
		   	}
		   	break;
		case "/logaritmo":
			$scope.fill = {
			    title: "Logaritmo",
				instructions: [
					{text: '<b>Execute operações com matrizes:</b> Some, subtraia, multiplique e faça matriz inversa'},
			        {text: '<b>Calcule</b> determinante e traço'},
			        {text: '<b>Entenda</b> matriz nula, transposta, indentidade e muito mais!'},
			        {text: 'Ainda dispomos de um <b><a href="javascript:tutorial()">TUTORIAL</a></b> para lhe auxiliar'},
			        {text: 'E o melhor, tudo isso de modo <b>simples</b>, <b>rápido</b> e <b>gratuito</b>'}
				],
				includeSrc: 'views/includes-calc/logaritmo.html',
				loadScriptToDOM: function(){
					loadMatricesDOM();
				},
				solveOption: true
		   	}
		   	break;

	}
})