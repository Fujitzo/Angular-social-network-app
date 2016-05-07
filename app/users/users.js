angular.module('myApp.users', [])

    .config(['$routeProvider', function($routeProvider){
        $routeProvider.when('/users/:id', {
            templateUrl: 'app/users/users.html',
            controller: 'UsersController'
        })
    }])

    .factory('repos', [$http, $q, function ($http, $q){

        function getRepositories(username){
            var deferred = $q.defer();

            $http.get('https://api.github.com/users/' + username + '/repos')
                .then(function(result){
                    deferred.resolve(result.data);

                }, function(err){
                    deferred.reject(err);
                })
            return deferred.promise;

        }
        return {
            getRepositories: getRepositories
        }

    }])

    .controller('UsersController', [
        '$scope','repos',
        function UserController($scope, repos){

            repos.getRepositories('Fujitzo')
                .then(function(repositories){
                    $scope.repos = repositories;
                })

            //function work(someParam){
            //    var deferred = $q.defer();
            //
            //    setTimeout(function(){
            //        if(someParam == 'OK'){
            //            deferred.resolve('Everything Fine!');
            //        }
            //
            //        else{
            //            deferred.reject('Error!');
            //        }
            //    }, 1000)
            //
            //    return deferred.promise;
            //}
            //
            //work('OK').then(function (result){
            //    console.log(result);
            //})



            //$scope.routeID = $routeParams.id;

            //$scope.loading = true;
            //$http.get('https://api.github.com/users/Fujitzo/repos')
            //    .then(function(result){
            //        $scope.loading = false;
            //       $scope.repos = result.data;
            //    });

        }]);