'use strict';

angular.module('dashboardModule')
.directive('pullRequest', function () {
    return {
        scope: {
            pr: '=prdata'
        },
        restrict: 'E',
        templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
        link: function(scope, element) {
            element.css({
                backgroundColor: 'red',
                display: 'block'
            });
        }
    };
});
