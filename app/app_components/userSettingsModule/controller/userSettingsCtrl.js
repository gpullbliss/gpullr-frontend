'use strict';

angular.module('userSettingsModule')
    .controller('userSettingsCtrl', ['$rootScope', '$scope', '$state', 'repoService', 'userSettingsService', 'userService',
        function ($rootScope, $scope, $state, repoService, userSettingsService, userService) {

            var currentUser ;

            function init() {
                repoService.getRepoList().then(function (repos) {
                    $scope.repos = repos;
                });

                currentUser = userService.getCurrentUser();
            }

            $scope.checkAll = function () {
                angular.forEach($scope.repos, function (repo) {
                    repo.checked = true;
                });
            };

            $scope.uncheckAll = function () {
                angular.forEach($scope.repos, function (repo) {
                    repo.checked = false;
                });
            };

            $scope.$watch('repos', function (newVar, oldVar) {
                buildBlackList();
            }, true);

            var updateBackendSelection = function(){
                userSettingsService.persistUserSettings(currentUser).then(function () {
                    console.log('currentUser = ' + currentUser.username + ' settings persisted');
                });
            };

            var buildBlackList = function () {
                console.log('buildBlackList!!!');
                var repos = $scope.repos;
                var blacklist = [];
                angular.forEach(repos, function(repo){
                    if (repo.checked) {
                        this.push(repo.id);
                    }
                }, blacklist);
                console.log('BlackList = ' + blacklist);
            };

            init();
        }
    ]
);