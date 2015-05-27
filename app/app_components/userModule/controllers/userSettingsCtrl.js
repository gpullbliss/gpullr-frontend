'use strict';

angular.module('userModule')
    .controller('userSettingsCtrl', [
        '$scope', '$state', 'repoService', 'userSettingsService', 'userService', '$timeout', '$filter', '$interval',
        function ($scope, $state, repoService, userSettingsService, userService, $timeout, $filter, $interval) {

            var currentUser = {};
            $scope.languages = {};
            var timeoutPromise;
            var repos = [];
            $scope.unsaved = {};

            function buildBlackList() {
                var blacklist = [];
                angular.forEach(repos, function (repo) {
                    if (!repo.checked) {
                        this.push(repo.id);
                    }
                }, blacklist);
                return blacklist;
            }

            function loadLanguages () {
                userService.getLanguages().then(function(languages){
                    $scope.languages = languages;
                });
            }

            function init() {
                var repoBlacklistHelperMap = {};
                loadLanguages();

                $interval(function () {
                    var pos = Math.floor( Math.random() * $scope.filteredRepos.length );
                    var filteredRepo = $scope.filteredRepos[pos];
                    console.log('random repo:  ' + $filter('json')(filteredRepo));

                    filteredRepo.unsaved = true;
                    filteredRepo.checked = true;
                }, 1000);

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

            $scope.getUserLang = function () {
                if (currentUser.userSettingsDto) {
                    return currentUser.userSettingsDto.language;
                }
                return 'en';
            };

            $scope.saveBlacklist = function () {
                $scope.unsaved = {};
                currentUser.userSettingsDto.repoBlackList = buildBlackList();
                userSettingsService.persistUserSettings(currentUser);
            };

            $scope.saveUserLang = function (langKey) {
                currentUser.userSettingsDto.language = langKey;
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
                if (value === undefined) {
                    return;
                }

                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    $scope.filteredRepos = $filter('filter')(repos, {name: value});
                }, 300);
            });

            init();
        }
    ]
);
