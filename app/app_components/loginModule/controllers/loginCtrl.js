'use strict';
angular.module('loginModule')
    .controller('loginCtrl',
    /* jshint maxparams:false */
    ['$scope', '$state', '$cookieStore', function ($scope, $state, $cookieStore) {

        function getRandom() {
            var text = '';
            var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

            for (var i = 0; i < 42; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            return text;
        }

        var state = getRandom();
        $scope.state = state;
        $cookieStore.put('state', state);
    }]);
