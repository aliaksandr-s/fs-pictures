var app = angular.module('myApp', []);

app.controller('startController', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.test = 'static'
}]);