'use strict';
angular.module('loginModule')
    .factory('userService', ['$http', '$state', '$rootScope', function ($http, $state, $rootScope) {
        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }

        function logInUser(user) {
            var successfulResponseStatus = 201;

            return $http.post('/api/users/login/' + user.id, '').then(
                function (response) {
                    if (response.status === successfulResponseStatus) {
                        whoAmI();
                        return true;
                    } else {
                        throw 'Got response code ' + response.status + ' instead of ' + successfulResponseStatus;
                    }
                }, function (error) {
                    throw error.status + ': ' + error.data;
                }
            );
        }
        
        function whoAmI() {
            var promise = $http.get('/api/users/me');
            
            return promise.then(
                function (response) {
                    $rootScope.$emit('updateUser', response.data);
                    //return response.data;
                }, function (error) {
                    //console.log(' hier is n error geflogen: ');
                    console.log(error.data.status);
                    $state.go('login');
                    //return error;
                    throw new Error(error.data);
                }
            );
        }

        return {
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser,
            whoAmI: whoAmI
        };
    }]);
