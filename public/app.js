var app = angular.module('myApp', []);

app.controller('startController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.test = 'static'

    $scope.upload = function() {
        var f = document.getElementById('my-file-selector').files[0],
            r = new FileReader();

        r.onloadend = function(e) {
            var data = e.target.result;
            console.log(data);
            //send your binary data via $http or $resource or do anything else with it
        }
        
        r.readAsDataURL(f);
    }
}]);