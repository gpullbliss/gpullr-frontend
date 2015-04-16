'use strict';
angular.module('wallboardModule')
    .directive('dvbWallboardAssignee', ['pullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/wallboardModule/views/pullAssignee.html',
            link: function (scope, element) {
                var colorClass;
                if (scope.pullRequest.assignedAt) {
                    colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.assignedAt, 'assignment');
                    element.addClass(colorClass);
                }
            }
        };
    }]);
