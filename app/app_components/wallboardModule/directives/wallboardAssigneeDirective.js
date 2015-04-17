'use strict';
angular.module('wallboardModule')
    .directive('dvbWallboardAssignee', ['PullRequestCssClassService', function (PullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullAssignee.html',
            link: function (scope, element) {
                var colorClass;
                if (scope.pullRequest.assignedAt) {
                    colorClass = PullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment');
                    element.addClass(colorClass);
                }
            }
        };
    }]);
