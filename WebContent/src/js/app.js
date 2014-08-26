var myApp = angular.module('myApp', []);
var IP = '192.168.2.7';

myApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/providers', {
		templateUrl : 'partialview/providers.html',
		controller : 'providersCntrl'
	}).when('/providers/:provider_id', {
		templateUrl : 'partialview/provider_detail.html',
		controller : 'providerDtlCntrl'
	}).otherwise({
		redirectTo : '/providers'
	});
} ]);

myApp.controller('providersCntrl', function($scope, $http) {
	$http.get('http://'+IP+':3000/api/providers').success(
			function(data) {
				$scope.Providers = data;
			});
});

myApp.controller('providerDtlCntrl', function($scope, $http, $routeParams) {
	$http.get(
			'http://'+IP+':3000/api/providers/'
					+ $routeParams.provider_id).success(function(data) {
		console.log(data);
		$scope.provider_id = data[0].provider_id;
		$scope.name = data[0].name;
		$scope.email = data[0].email;
	});
});