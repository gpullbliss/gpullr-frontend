'use strict';

angular.module('dashboardModule')
    .directive('dvbPullRequest', ['PullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            scope: {
                pullRequest: '=',
                loggedInUser: '='
            },
            restrict: 'A',
            templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
            controller:['$scope', 'UserNameService', function($scope, UserNameService){$scope.getName = UserNameService.getName;}],
            link: function (scope, element) {
                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
