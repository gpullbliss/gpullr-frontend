'use strict';

angular.module('pullRequestModule')
    .filter('with', function () {
        return function (items, field, include) {
            var result = [];

            if (typeof items === 'undefined' || typeof field === 'undefined') {
                return result;
            }

            if (typeof include !== 'boolean') {
                include = true;
            }

            angular.forEach(items, function (item) {
                if (include === (item.hasOwnProperty(field) && item[field] !== null)) {
                    result.push(item);
                }
            });

            return result;
        };
    });
