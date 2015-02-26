'use strict';
angular.module('headerModule')
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
        
        $scope.userPresent = false;
        $scope.countPresent = false;
        
        var requestCountEvent = $rootScope.$on('changeRequestCount', function (event, data) {
                      $scope.requestCount = data ;
                      $scope.countPresent = true;
        });
                  
        var updatedUser = $rootScope.$on('updateUser', function (event, data) {
                      $scope.username = data.username;
                      $scope.avatarUrl = data.avatarUrl;
                      $scope.userPresent = true;
        });
        
        $scope.$on('$destroy', requestCountEvent);
        $scope.$on('$destroy', updatedUser);
        
        userService.whoAmI();
    }]);