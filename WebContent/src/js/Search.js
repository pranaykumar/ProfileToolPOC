var appModule = angular.module('myApp', []);

appModule.controller('SearchJson', function($scope, $http) {
	var field = 'enter Provider id';
	$scope.field = field;
	console.log(field);

	$scope.getProfile = function(){
		console.log($scope.field);
		
		$http.get('http://172.21.248.67:3000/api/providers/' + $scope.field).success(
			function(data) {
				console.log(data);
//				var provider[] = da
								
				$scope.id = data[0].provider_id;
				$scope.name = data[0].name;
				$scope.email = data[0].email;
			});
	};
});

appModule.controller('testController', function($scope) {
	var testField = 'some random text';
	$scope.testField = testField;
});
