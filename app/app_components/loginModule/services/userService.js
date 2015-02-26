'use strict';
angular.module('loginModule')
    .factory('userService', ['$http', '$state', 'ErrorResponseHandler', '$rootScope', function ($http, $state, ErrorResponseHandler, $rootScope) {
        function getUsersForLogin() {
            return $http.get('/api/users').then(
                function (response) {
                    return response.data;
                }, function (error) {
                    throw error.status + ': ' + error.data;
                    //when backend is fixed then inline
                    //ErrorResponseHandler.log(error);
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
                    //when backend is fixed then inline
                    //ErrorResponseHandler.log(error);
                }
            );
        }
        
        function whoAmI() {
            var promise = $http.get('/api/users/me');
            
            return promise.then(
                function (response) {
                    $rootScope.$emit('updateUser', response.data);
                }, function (error) {
                    $state.go('login');
                    var err = {data: {status: 403, error: 'Forbidden', message: 'login required'}}; 
                    ErrorResponseHandler.log(err);
                    //when backend is fixed then inline
                    //ErrorResponseHandler.log(error);
                }
            );
        }

        return {
            getUsersForLogin: getUsersForLogin,
            logInUser: logInUser,
            whoAmI: whoAmI
        };
    }]);
