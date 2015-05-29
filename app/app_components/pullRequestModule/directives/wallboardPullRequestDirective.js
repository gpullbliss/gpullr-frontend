'use strict';
angular.module('pullRequestModule')
    .directive('dvbWallboardPullRequest', ['PullRequestCssClassService', function (pullRequestCssClassService) {
        return {
            restrict: 'A',
            scope: {
                pullRequest: '='
            },
            templateUrl: 'app_components/pullRequestModule/views/wallboard/pullRequest.html',
            link: function (scope, element) {
                var colorClass;

                colorClass = pullRequestCssClassService.getColorClassDependingOnAge(scope.pullRequest.createdAt);
                element.addClass(colorClass);
            }
        };
    }]);
