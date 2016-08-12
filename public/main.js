var myApp = angular.module('myApp', [])

myApp.controller('mainCtrl', function($scope, $timeout, $http){
	$scope.retorno = [];

	var chart = new SmoothieChart({millisPerPixel:54, grid:{fillStyle:'#c0c0c0'}}),
  	canvas = document.getElementById('smoothie-chart'),
  	series = new TimeSeries();

	var chart2 = new SmoothieChart({millisPerPixel:54, grid:{fillStyle:'#c0c0c0'}}),
        canvas2 = document.getElementById('smoothie-chart2'),
        series2 = new TimeSeries();

	chart.addTimeSeries(series, {lineWidth:2,strokeStyle:'#00ff00'});
	chart2.addTimeSeries(series2, {lineWidth:2,strokeStyle:'red'});

  	chart.streamTo(canvas, 500);
  	chart2.streamTo(canvas2, 500);

	$scope.Criar = function () {
	    console.log('here');
            $http.get('http://172.30.121.230:4568/api/post/' + $scope.msg)
            .success(function (data, status, headers) {
		//
		$scope.msg = "";
            });
        };

	var poller = function() {
		console.log('pooling ...');
    		$http.get('http://172.30.121.230:4568/api/list').then(function(r) {
      
      			$scope.retorno = r.data;
      			$timeout(poller, 1000);
    		}, function(){
    			document.getElementById('alert-field').innerHTML = '<div class="alert alert-warning alert-dismissible" role="warn"> Erro ao acessar: http://172.30.121.230:4568/api/list </div>';	
    		});
    
  	};

	var poller2 = function() {
                console.log('pooling2 ...');
                $http.get('http://172.30.121.230:4568/api/status').then(function(r) {

                        $scope.status = r.data;
			series2.append(new Date().getTime(), $scope.status.enqueued);
			series.append(new Date().getTime(), $scope.status.processed);
                        $timeout(poller2, 5000);
                }, function(){
    			document.getElementById('alert-field').innerHTML = '<div class="alert alert-warning alert-dismissible" role="warn"> Erro ao acessar: http://172.30.121.230:4568/api/status </div>"';	
    		});

        };

	poller2();
  	poller();

});
