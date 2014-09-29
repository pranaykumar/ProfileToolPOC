var myApp = angular.module('myApp', []);
var IP = '172.21.248.67';

myApp.controller('providersCntrl', function($scope, $http) {
	$scope.Provider_search_string = '';
	$scope.searchFun = function() {
		$http.get(
				'http://' + IP + ':3000/api/providersearch/'
						+ $scope.Provider_search_string).success(
				function(data) {
					$scope.Search_Result = data;
				});
	};
	console.log($scope.Provider_search_string);
});