app.controller("mathsolveCtrl", function ($scope, $http) {
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
		}
   	}
})