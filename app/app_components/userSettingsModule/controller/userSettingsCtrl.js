'use strict';

angular.module('userSettingsModule')
    .controller('userSettingsCtrl', ['$scope', '$state', 'repoService',
        function ($scope, $state, repoService) {
            repoService.getRepoList().then(function(repos){
                $scope.repos = repos;
            }),
            $scope.toggle = function () {
                $('.toggle').click(function() {
                    var thisElement = $(this);
                    if (thisElement.hasClass('showInList')){
                        thisElement.removeClass('showInList').addClass('hideInList');
                    } else {
                        thisElement.removeClass('hideInList').addClass('showInList');
                    }
                });
            };
        }
    ]
);