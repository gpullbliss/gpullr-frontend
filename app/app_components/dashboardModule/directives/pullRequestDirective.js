'use strict';

angular.module('dashboardModule')
.directive('pullRequest', function (moment) {
    return {
        scope: {
            pr: '=prdata'
        },
        restrict: 'E',
        templateUrl: 'app_components/dashboardModule/views/pullRequest.html',
        link: function(scope, element) {

            var changeColor = function(){
                var diff = moment().diff(scope.pr.createdAt, 'minutes');
                var colorClass;

                // hours difference rounds up and down. therefore once above the round up threshold, apply rule.
                if (diff < 90) {
                    colorClass = 'youngerThan2h';

                } else if (diff >= 90 && diff < 210) {
                    colorClass = 'olderThan2h';

                } else if (diff >= 210 && diff < 450) {
                    colorClass = 'olderThan4h';

                } else if (diff >= 450 && diff < 43170) {
                    colorClass = 'olderThan8h';

                } else if (diff >= 43170) {
                    colorClass = 'olderThanAMonth';
                }

                element.addClass(colorClass);
            };

            changeColor();

        }
    };
});
