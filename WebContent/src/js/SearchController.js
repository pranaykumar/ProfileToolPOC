var myApp= angular.module('myApp',[]);
myApp.controller('SearchController', function($scope){
	//$scope.Provider={ 
	//		id:0
	//};
	ProviderDetails = function(){
				$scope.Provider.need = $scope.Provider.id * 2;
			
	}
	$scope.submit=function(field) {
		if(field == 1111)
				$scope.Provider.need = $scope.Provider.id * 2;
				$scope.Provider.Name = 'ABCD';
	}
	$scope.$watch('Provider.id',ProviderDetails);
	
});

