'use strict';

angular.module('userSettingsModule')
    .controller('userSettingsCtrl', ['$rootScope', '$scope', '$state', 'repoService',
        function ($rootScope, $scope, $state, repoService) {

            function init() {
                repoService.getRepoList().then(function (repos) {
                    $scope.repos = repos;
                });

                $scope.blacklist = [];
            }

            $scope.toggle = function () {
                $('.toggle').click(function () {
                    var thisElement = $(this);
                    if (thisElement.hasClass('showInList')) {
                        thisElement.removeClass('showInList').addClass('hideInList');
                    } else {
                        thisElement.removeClass('hideInList').addClass('showInList');
                    }
                });
            };

            $scope.updateBlacklist = function (repoId) {
                if ($scope.blacklist.indexOf(repoId) === -1) {
                    $scope.blacklist.push(repoId);
                } else {
                    $scope.blacklist.splice($scope.blacklist.indexOf(repoId), 1);
                }
                console.log($scope.blacklist);
            };

            init();
        }
    ]
);