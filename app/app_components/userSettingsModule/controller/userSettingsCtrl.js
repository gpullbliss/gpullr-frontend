'use strict';

angular.module('userSettingsModule')
    /* jshint maxparams: false */
    .controller('userSettingsCtrl', [
        '$scope', '$state', 'repoService', 'userSettingsService', 'userService', '$timeout', '$filter',
        function ($scope, $state, repoService, userSettingsService, userService, $timeout, $filter) {

            var currentUser = {};
            var timeoutPromise;
            var repos = [];

            function buildBlackList() {
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

                    .then(function (repoList) {
                        repos = repoList;
                        $scope.filteredRepos = repoList;

                        angular.forEach(repos, function (repo) {
                            repo.checked = true;
                            this[repo.id] = repo;
                        }, repoBlacklistHelperMap);

                        return userService.getCurrentUser();
                    })

                    .then(function (user) {
                        currentUser = user;
                        if (!user.userSettingsDto) {
                            user.userSettingsDto = {};
                        }

                        var blacklist = user.userSettingsDto.repoBlackList;

                        // uncheck user black listed repos
                        angular.forEach(blacklist, function (blacklistedRepoId) {
                            var repo = repoBlacklistHelperMap[blacklistedRepoId];
                            repo.checked = false;
                        });
                    })

                    .catch(function (fault) {
                        console.error(fault);
                    });
            }

            $scope.saveBlacklist = function () {
                currentUser.userSettingsDto.repoBlackList = buildBlackList();
                userSettingsService.persistUserSettings(currentUser);
            };

            $scope.checkAll = function () {
                angular.forEach($scope.filteredRepos, function (repo) {
                    repo.checked = true;
                });
            };

            $scope.uncheckAll = function () {
                angular.forEach($scope.filteredRepos, function (repo) {
                    repo.checked = false;
                });
            };

            $scope.$watch('searchText', function (value) {
                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    $scope.filteredRepos = $filter('filter')(repos, {name: value});
                }, 300);
            });

            init();
        }
    ]
);
