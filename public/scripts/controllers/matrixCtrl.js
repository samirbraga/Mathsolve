app.controller("mathsolveCtrl", function ($scope, $http) {
	$scope.fill;
	var loadFill = function(){
		$http.get("/matriz/info").success(function (data) {
			$scope.fill = data;
		});
	}
	loadFill();
})