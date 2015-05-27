'use strict';

angular.module('dashboardModule')
    .directive('dvbPullRequest', ['PullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            scope: {
                pullRequest: '=',
                ageProperty: '=',
                loggedInUser: '='
            },
            restrict: 'A',

            templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
            controller: ['$scope', 'userService','PullRequestService', function ($scope, userService, pullRequestService) {
                $scope.getName = userService.getName;
                $scope.getAbbreviateLines = pullRequestService.getAbbreviateLines;
            }],
            link: function (scope, element) {
                var propertyName = scope.ageProperty;
                var age = scope.pullRequest[propertyName];

                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(age);
                element.addClass(colorClass);
            }
        };
    }]);
