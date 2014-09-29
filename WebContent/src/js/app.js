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
	}).when('/dashboard', {
		templateUrl : 'partialview/Dashboard.html',
		controller : 'providers1Cntrl'
	}).otherwise({
		redirectTo : '/providers'
	});
} ]);

myApp.controller('providersCntrl', function($scope, $http) {
	$http.get('http://' + IP + ':3000/api/providers').success(function(data) {
		$scope.Providers = data;
	});
});

myApp.controller('providers1Cntrl', function($scope, $http) {
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

myApp.controller('providerDtlCntrl', function($scope, $http, $routeParams,
		ProfileService) {
	$http.get(
			'http://' + IP + ':3000/api/providers/' + $routeParams.provider_id)
			.success(function(data) {
				console.log(data);
				$scope.provider_id = data[0].provider_id;
				$scope.provider_name = data[0].name;
				$scope.provider_email = data[0].email;
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
						"name" : $scope.provider_name,
						"email" : $scope.provider_email,
					},
					headers : {
						'content-type' : 'application/json'
					}
				}).success(function(data) {
			alert(data[0].msg);
		});
	};

	//Adding frame rate Array
	$scope.selected = {
			Framerate :'120'
	};
	$scope.framerates = [{value :'24', displayName : '24p'},
	                     {value :'36', displayName : '36p'},
	                     {value :'40', displayName : '40p'},
	                     {value :'46', displayName : '46p'},
	                     {value :'50', displayName : '50p'},
	                     {value :'60', displayName : '60p'},
	                     {value :'120', displayName : '120p'}];
	$scope.select = $scope.selected.Framerate;
	
	//Muxing Formats
	$scope.MuxFormates =[{title:'MP4'},
	                     {title:'MP3'},
	                     {title:'MKV'},
	                     {title:'AVI'}
	                     ];
	
	//Audio Bitrate
	$scope.AudioBitrates =[{title:'32kbit/s'},
	                       {title:'96kbit/s'},
	                       {title:'128 or 160 kbit/s'},
	                       {title:'192kbit/s'},
	                       {title:'320kbit/s'},];
	//Video Bitrate
	$scope.VideoBitrates =[{title:'16kbit/s'},
	                       {title:'128-384kbit/s'},
	                       {title:'1.15Mbit/s'},
	                       {title:'3.5Mbit/s'},
	                       {title:'9.8Mbit/s'},
	                       {title:'8-15Mbit/s'},
	                       {title:'19Mbit/s'},
	                       {title:'24Mbit/s'},
	                       {title:'25Mbit/s'},
	                       {title:'29.4Mbit/s'},
	                       {title:'40Mbit/s'},
	                       ];
	//KeyFrame Intervals
	$scope.KeyFrameIntervals =[{timeperiod:'5sec'},
	                           {timeperiod:'10sec'},
	                           {timeperiod:'15sec'},
	                           {timeperiod:'20sec'},
	                           ];
	
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
	$scope.name = '';
	$scope.email = '';

	$scope.addProvider = function() {
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


