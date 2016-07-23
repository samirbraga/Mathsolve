app.factory('Mathsolve', function($scope) {
   var title = $scope.fill.title;
   return {
     title: function() { return title; }
   };
});