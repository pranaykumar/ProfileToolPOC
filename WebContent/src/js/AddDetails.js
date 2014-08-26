var DetailsModule = angular.module('myApp', []);
DetailsModule.controller('ProviderDetails', function($scope, $http){
	var name ='Enter Provider Name';
	var email = 'me@gmail.com';
		$scope.name = name;
		$scope.email = email;
});