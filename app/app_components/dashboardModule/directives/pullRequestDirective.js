'use strict';

angular.module('dashboardModule')
    .directive('dvbPullRequest', ['PullRequestCssClassService', function (PullRequestCssClassService) {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
            },
            restrict: 'A',
            templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
            link: function (scope, element) {
                var colorClass = PullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
