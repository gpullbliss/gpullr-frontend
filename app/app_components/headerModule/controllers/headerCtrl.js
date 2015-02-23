'use strict';
angular.module('headerModule')
    .controller('headerCtrl', ['$scope', '$rootScope', 'userService', function ($scope, $rootScope, userService) {
        var whoAmI;

        whoAmI = function () {
          userService.whoAmI()
              .then(function (user) {
                  $scope.username = user.username;
                  $scope.avatarUrl = user.avatarUrl;
          });
        };
        
        var requestCountEvent = $rootScope.$on('changeRequestCount', function (event, data) {
                     $scope.requestCount = data ;
                  });
                  
        $scope.$on('$destroy', requestCountEvent);
        
        whoAmI();
    }]);