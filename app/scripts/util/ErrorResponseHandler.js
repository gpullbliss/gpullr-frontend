'use strict';

angular.module('gpullr')
        .factory('ErrorResponseHandler', [function () {
                var log = function (err, intro) {

                    if (intro === undefined) {
                        intro = 'Error response: ';
                    }

                    console.log(intro + err.data.status + ' ' + err.data.error + ': ' + err.data.message);
                };

                return {log: log};
            }]);