var myApp = angular.module('myApp', []);
var IP = '172.21.248.67';

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

myApp.controller('providerDtlCntrl', function($scope, $http, $routeParams,
		ProfileService) {
	$http.get(
			'http://' + IP + ':3000/api/providers/' + $routeParams.provider_id)
			.success(function(data) {
				console.log(data);
				$scope.provider_id = data[0].provider_id;
				$scope.name = data[0].name;
				$scope.email = data[0].email;
			});

	// $scope.Profiles = ProfileService.getProfiles($routeParams.provider_id);
	// Updated to call the service and wait for it to finish and then populate the Profiles variable in scope using a callback
	ProfileService.getProfiles($routeParams.provider_id).then(function(data) {
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

	$scope.tabDisplayFlags = [];
	$scope.tabStyles = [];

	$scope.tabDisplayFlags[0] = true;
	$scope.tabStyles[0] = {
		'background-color' : 'ivory',
	};

	$scope.showTab = function(tabindex) {
		$scope.tabDisplayFlags = [];
		$scope.tabStyles = [];
		$scope.tabDisplayFlags[tabindex] = true;
		$scope.tabStyles[tabindex] = {
			'background-color' : 'ivory',
		};

		console.log('tab index selected is' + tabindex);
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

// ProfileService to return Profiles for a provider_id
myApp.factory('ProfileService', function($http, $q) {
	return {
		getProfiles : function(provider_id) {
			// the $http API is based on the deferred/promise APIs exposed by
			// the $q service
			// so it returns a promise for us by default
			return $http.get(
					'http://' + IP + ':3000/api/providers/' + provider_id
							+ '/profiles').then(function(response) {
				if (typeof response.data === 'object') {
					return response.data;
				} else {
					// invalid response
					return $q.reject(response.data);
				}

			}, function(response) {
				// something went wrong
				return $q.reject(response.data);
			});
		}
	};
});

myApp.filter('booleanFormatter', function() {
	var myBooleanFilter = function(input) {
		if (input == 1)
			return "True";
		else
			return "False";
	};
	return myBooleanFilter;
});