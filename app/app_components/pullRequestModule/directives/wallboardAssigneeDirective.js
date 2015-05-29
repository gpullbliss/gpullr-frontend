'use strict';
angular.module('pullRequestModule')
    .directive('dvbWallboardAssignee', ['PullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/pullRequestModule/views/wallboard/pullAssignee.html',
            link: function (scope, element) {
                var colorClass;
                if (scope.pullRequest.assignedAt) {
                    colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment');
                    element.addClass(colorClass);
                }
            },
            controller: ['$scope', 'userService', function ($scope, userService) {
                $scope.getName = userService.getName;
            }]
        };
    }]);
