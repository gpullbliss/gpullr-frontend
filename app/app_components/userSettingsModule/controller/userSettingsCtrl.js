'use strict';

angular.module('userSettingsModule')
    /* jshint maxparams: false */
    .controller('userSettingsCtrl', [
        '$scope', '$state', 'repoService', 'userSettingsService', 'userService',
        function ($scope, $state, repoService, userSettingsService, userService) {

            var currentUser;

            function buildBlackList() {
                var repos = $scope.repos;

                var blacklist = [];
                angular.forEach(repos, function (repo) {
                    if (!repo.checked) {
                        this.push(repo.id);
                    }
                }, blacklist);
                return blacklist;
            }


            function init() {
                var repoBlacklistHelperMap = {};

                repoService
                    .getRepoList()

                    .then(function (repos) {
                        $scope.repos = repos;

                        angular.forEach($scope.repos, function (repo) {
                            this[repo.id] = repo;
                        }, repoBlacklistHelperMap);

                        $scope.checkAll();

                        return userService.getCurrentUser();
                    })

                    .then(function (user) {
                        currentUser = user;
                        if (!user.userSettingsDto) {
                            user.userSettingsDto = {};
                        }

                        // uncheck user black listed repos
                        angular.forEach(user.userSettingsDto.repoBlackList, function (blacklistedRepoId) {
                            var repo = repoBlacklistHelperMap[blacklistedRepoId];
                            repo.checked = false;
                        });
                    })

                    .catch(function (fault) {
                        console.error(fault);
                    });
            }

            $scope.saveBlacklist = function () {
                var repoBlackList = buildBlackList();
                currentUser.userSettingsDto.repoBlackList = repoBlackList;
                userSettingsService.persistUserSettings(currentUser);
            };

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

            init();
        }
    ]
);