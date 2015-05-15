'use strict';
angular.module('userModule')
    .factory('repoService', ['$http', function ($http) {
        function getRepoList() {
            return $http.get('/api/repos').then(
                function (response) {
                    return response.data;
                }
            );
        }

        return {
            getRepoList: getRepoList
        };
    }]);
