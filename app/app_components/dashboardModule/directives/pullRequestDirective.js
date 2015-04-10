'use strict';

angular.module('dashboardModule')
    .directive('dvbPullRequest', ['pullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
            },
            restrict: 'A',
            templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
