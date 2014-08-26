var myApp= angular.module('myApp',[]);
myApp.controller('CntrlJson',function($scope,$http){
	$scope.idfield = {
			field : 1
		};

	$http.get('http://172.21.248.67:3000/api/providers')
	.success(function(data){
		$scope.Provider = data;
		console.log(data);

	    Valuefun = function(){
	    	$scope.value = $scope.idfield.field * 2;
	   		for(var i = 0, len = data.length; i<= len-1; i++){
			Providers = data[i];
			console.log("LOOP COUNTER" + i);
						if(Providers.id == value){
							$scope.id = Providers.provider_id;
							$scope.name = Providers.name;
							$scope.email = Providers.email;
							}	
			}
//		/*angular.forEach(data, function(field){
//			if(data.provider_id === field){
//				alert("inFor each loop");
//			}
//		});*/
	 };
	 $scope.$watch('idfield.field',Valuefun);
  });
});