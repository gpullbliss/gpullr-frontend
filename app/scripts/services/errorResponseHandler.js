'use strict';
angular.module('gpullr')
    .factory('errorResponseHandler', ['$log', function ($log) {
        function log(response, prefix) {
            if (!angular.isString(prefix)) {
                prefix = 'Error response: ';
            }
            $log.log(prefix + response.data.errorKey + ': ' + response.data.errorMessage);
        }

        return {
            log: log
        };
    }]);
