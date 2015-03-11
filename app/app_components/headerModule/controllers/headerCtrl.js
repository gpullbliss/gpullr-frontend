'use strict';
angular.module('headerModule')
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', '$state', 'STATE_STATS', 'STATE_DASHBOARD',
                      function ($scope, $rootScope, userService, $state, STATE_STATS, STATE_DASHBOARD) {
        
        $scope.userPresent = false;
        $scope.countPresent = false;
        
        var navBar = [
              { title: 'All Requests', bubble: true, selected: 'active'},
              { title: 'Ranking', bubble: false, selected: ''}
            ],
            initNavBar = [
              { title: 'All Requests', bubble: true, selected: 'active'},
              { title: 'Ranking', bubble: false, selected: ''}
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
        
        $scope.navigate = function (selected) {
            if (selected === undefined) {
                $scope.navBar = initNavBar;
                $state.go(STATE_DASHBOARD);
                return;
            }

            angular.forEach(navBar, function (item) {
               if (item.title === selected.title) {
                   item.selected='active';
               } else {
                   item.selected='';
               }
            });
            $scope.navBar = navBar;
            switch (selected.title) {
                case 'All Requests':
                   $state.go(STATE_DASHBOARD);
                   break;
                case 'Ranking':
                   $state.go(STATE_STATS);
            }
        }
        
        $scope.navBar = navBar;
        
        $scope.$on('$destroy', requestCountEvent);
        $scope.$on('$destroy', updatedUser);
        
        userService.whoAmI();
    }]);