'use strict';

angular.module('userModule')
    .controller('userSettingsCtrl', [
        '$scope', '$state', '$rootScope', 'repoService', 'userSettingsService', 'userService', '$timeout', '$filter',
        function ($scope, $state, $rootScope, repoService, userSettingsService, userService, $timeout, $filter) {

            $scope.languages = {};
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

            function loadLanguages () {
                userService.getLanguages().then(function(languages){
                    $scope.languages = languages;
                });
            }

            function init() {
                var repoBlacklistHelperMap = {};
                loadLanguages();
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
                if ($rootScope.user.userSettingsDto) {
                    return $rootScope.user.userSettingsDto.language;
                }
                return 'en';
            };

            $scope.saveBlacklist = function () {
                var currentUser = angular.copy($rootScope.user);
                currentUser.userSettingsDto.repoBlackList = buildBlackList();
                userSettingsService.persistUserSettings(currentUser);
            };

            $scope.saveUserLang = function (langKey) {
                $rootScope.user.userSettingsDto.language = langKey;
                userSettingsService.persistUserSettings($rootScope.user);
            };

            $scope.saveNotification = function (value) {
                console.log(value);
                $rootScope.user.userSettingsDto.desktopNotification = value;
                userSettingsService.persistUserSettings($rootScope.user);
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
