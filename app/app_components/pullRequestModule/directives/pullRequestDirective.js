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
            templateUrl: 'app_components/pullRequestModule/views/dashboard/pullRequest.html',
            controller: ['$scope', 'userService', function ($scope, userService) {
                $scope.getName = userService.getName;
            }],
            link: function (scope, element) {
                var propertyName = scope.ageProperty;
                var age = scope.pullRequest[propertyName];

                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(age);
                element.addClass(colorClass);
            }
        };
    }]);
