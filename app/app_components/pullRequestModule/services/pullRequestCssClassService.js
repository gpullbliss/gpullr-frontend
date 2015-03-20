'use strict';
angular.module('pullRequestModule')
    .factory('pullRequestCssClassService', ['moment', function (moment) {
        /**
         * @param {string} dateTime
         * @param {string=} cssClassPrefix
         * @returns {string}
         */
        function getColorClassDependingOnAge(dateTime, cssClassPrefix) {
            var colorClass,
                minutesDiff = moment().diff(dateTime, 'minutes');

            if (minutesDiff < 120) {
                colorClass = 'youngerThan2h';
            } else if (minutesDiff >= 120 && minutesDiff < 240) {
                colorClass = 'olderThan2h';
            } else if (minutesDiff >= 240 && minutesDiff < 480) {
                colorClass = 'olderThan4h';
            } else if (minutesDiff >= 480 && minutesDiff < 43200) {
                colorClass = 'olderThan8h';
            } else if (minutesDiff >= 43200) {
                colorClass = 'olderThanAMonth';
            }
            if (cssClassPrefix) {
                colorClass = cssClassPrefix + colorClass.charAt(0).toUpperCase() + colorClass.slice(1);
            }
            return colorClass;
        }

        return {
            getColorClassDependingOnAge: getColorClassDependingOnAge
        };
    }]);
