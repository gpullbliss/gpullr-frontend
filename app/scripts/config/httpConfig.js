'use strict';
angular.module('gpullr')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('httpErrorResponseInterceptor');
    }]);
