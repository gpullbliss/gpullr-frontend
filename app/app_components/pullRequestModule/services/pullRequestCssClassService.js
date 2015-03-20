'use strict';
angular.module('pullRequestModule')
    .factory('pullRequestCssClassService', ['moment', function (moment) {
         /**
         * @param {string} dateTime
         * @param {string=} prefix
         * @returns {string}
         */
        function getColorClassDependingOnAge(dateTime, prefix) {
            var colorClass, 
                minutesDiff = moment().diff(dateTime, 'minutes');
            // hours difference rounds up and down. therefore once above the round up threshold, apply rule.
            if (minutesDiff < 90) {
                colorClass = 'youngerThan2h';
            } else if (minutesDiff >= 90 && minutesDiff < 210) {
                colorClass = 'olderThan2h';
            } else if (minutesDiff >= 210 && minutesDiff < 450) {
                colorClass = 'olderThan4h';
            } else if (minutesDiff >= 450 && minutesDiff < 43170) {
                colorClass = 'olderThan8h';
            } else if (minutesDiff >= 43170) {
                colorClass = 'olderThanAMonth';
            }
            if (prefix) {
                colorClass = prefix + colorClass.charAt(0).toUpperCase() + colorClass.slice(1);
            }
            return colorClass;
        }

        return {
            getColorClassDependingOnAge: getColorClassDependingOnAge
        };
    }]);
