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
            controller: ['$scope', 'UserNameService', function ($scope, userNameService) {
                $scope.getName = userNameService.getName;
            }],
            link: function (scope, element) {
                var propertyName = scope.ageProperty;
                var age = scope.pullRequest[propertyName];

                console.log(propertyName + ": " + age);

                var colorClass = pullRequestCssClassService.getColorClassDependingOnAge(age);
                element.addClass(colorClass);
            }
        };
    }]);
