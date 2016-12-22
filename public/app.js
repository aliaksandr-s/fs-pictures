var app = angular.module('myApp', []);

app.controller('startController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.pictures = [];

    $scope.upload = function() {
        var f = document.getElementById('my-file-selector').files[0],
            r = new FileReader();

        r.onloadend = function(e) {
            var data = {
                "img": e.target.result,
                "name": f.name
            };

            //send encoded data to the server
            $http.post('/api/save-picture', data)
                .success(function(res){
                    $window.location.reload();
                    if(res){
                        console.log(res)
                    }
                })
        }

        r.readAsDataURL(f); // encode to base64
    }

    $http.get('/api/get-pictures')
        .success(data => {
            $scope.pictures = data
        })
        .error(err => console.log(err))
}]);