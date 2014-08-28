var myApp = angular.module('myApp', []);
var IP = 'restip';

myApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/providers', {
		templateUrl : 'partialview/providers.html',
		controller : 'providersCntrl'
	}).when('/providers/addprovider', {
		templateUrl : 'partialview/AddProvider.html',
		controller : 'AddProviderCntrl'
	}).when('/providers/:provider_id', {
		templateUrl : 'partialview/provider_detail.html',
		controller : 'providerDtlCntrl'
	}).otherwise({
		redirectTo : '/providers'
	});
} ]);

myApp.controller('providersCntrl', function($scope, $http) {
	$http.get('http://' + IP + ':3000/api/providers').success(function(data) {
		$scope.Providers = data;
	});
});

myApp.controller('providerDtlCntrl', function($scope, $http, $routeParams) {
	$http.get(
			'http://' + IP + ':3000/api/providers/' + $routeParams.provider_id)
			.success(function(data) {
				console.log(data);
				$scope.provider_id = data[0].provider_id;
				$scope.name = data[0].name;
				$scope.email = data[0].email;
			});

	$http.get(
			'http://' + IP + ':3000/api/providers/' + $routeParams.provider_id
					+ '/profiles').success(function(data) {
		$scope.Profiles = data;
	});

	$scope.updateProviderDtl = function() {
		$http(
				{
					method : 'PUT',
					url : 'http://' + IP + ':3000/api/providers/'
							+ $routeParams.provider_id,
					data : {
						"name" : $scope.Provider.name,
						"email" : $scope.Provider.email,
					},
					headers : {
						'content-type' : 'application/json'
					}
				}).success(function(data) {
			alert(data[0].msg);
		});
	};
});

myApp.controller('AddProviderCntrl', function($scope, $http) {
	$scope.name = 'Enter Provider Name';
	$scope.email = 'Enter Vaild Email';

	$scope.insertData = function() {
		$http({
			method : 'POST',
			url : 'http://' + IP + ':3000/api/providers',
			data : {
				"name" : $scope.name,
				"email" : $scope.email,
			},
			headers : {
				'content-type' : 'application/json'
			}
		}).success(function(data) {
			alert(data[0].msg);
		});
	};
});