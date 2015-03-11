'use strict';
angular.module('headerModule')
/* jshint maxparams:false */
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', '$state', 'STATE_STATS', 'STATE_DASHBOARD',
                      function ($scope, $rootScope, userService, $state, STATE_STATS, STATE_DASHBOARD) {
        
        $scope.userPresent = false;
        $scope.countPresent = false;
        
        var navBar = [
              { title: 'All Requests', bubble: true, path: STATE_DASHBOARD},
              { title: 'Ranking', bubble: false, path: STATE_STATS}
            ];
        
        var requestCountEvent = $rootScope.$on('changeRequestCount', function (event, data) {
                      $scope.requestCount = data ;
                      $scope.countPresent = true;
        });
                  
        var updatedUser = $rootScope.$on('updateUser', function (event, data) {
                      $scope.username = data.username;
                      $scope.avatarUrl = data.avatarUrl;
                      $scope.userPresent = true;
        });
        
        $scope.navBar = navBar;
        
        $scope.$on('$destroy', requestCountEvent);
        $scope.$on('$destroy', updatedUser);
        
        userService.whoAmI();
    }]);