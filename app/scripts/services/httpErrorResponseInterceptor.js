'use strict';
angular.module('gpullr')
    .factory('httpErrorResponseInterceptor', ['$q', 'errorResponseHandler', function ($q, errorResponseHandler) {
        return {
            responseError: function (rejection) {
                errorResponseHandler.log(rejection);
                return $q.reject(rejection);
            }
        };
    }]);
