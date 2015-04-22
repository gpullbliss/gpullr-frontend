'use strict';
angular.module('headerModule').
    directive('notificationDropdownItem', function () {
        return {
            scope: {
                n: '=notification'
            },
            restrict: 'A',
            template: '{{text}} <a data-ng-click="markNotificationRead(n.id)"><i class="fa-user-times"></i></a>',
            controller: ['$scope', 'notificationService', function ($scope) {
                var n = $scope.n;

                switch (n.type) {
                    case 'PULLREQUEST_CLOSED':
                        $scope.text = n.actorName + ' closed your pull request "' + n.pullRequestTitle +
                        '" in repository "' + n.repoTitle + '"';
                        break;
                }

                $scope.markNotificationRead = function(id){
                    console.log('marking notification with id=' + id + '  as read...');
                };
            }]
        };
    });