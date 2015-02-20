'use strict';
angular.module('headerModule')
    .controller('headerCtrl', ['$scope', 'userService', function ($scope, userService) {
        var whoAmI;

        whoAmI = function () {
          userService.whoAmI()
              .then(function (user) {
                  $scope.username = user.username;
                  $scope.avatarUrl = user.avatarUrl;
          });
        };
        
        whoAmI();
    }]);