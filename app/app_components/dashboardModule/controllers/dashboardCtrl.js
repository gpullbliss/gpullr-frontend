'use strict';

angular.module('dashboardModule')
    /* jshint maxparams: false */
    .controller('dashboardCtrl', ['$scope', '$rootScope', '$interval', 'pullRequestService', 'userSettingsService', '$q', '$timeout', 'ngSocket',
        function ($scope, $rootScope, $interval, pullRequestService, userSettingsService, $q, $timeout, ngSocket) {
            
            var ws = ngSocket('ws://foo/bar');

             //Can call before socket has opened
             ws.send({foo: 'bar'});            

            var updatePullRequestsInterval;
            var service = {};
            var listener = $q.defer();
            var socket = {client: null, stomp: null};
            
            service.RECONNECT_TIMEOUT = 30000;
            service.SOCKET_URL = '/api/notify';
            service.TOPIC = '/topic/message';
            service.BROKER = '/app/notify';
            
            service.receive = function() {
              return listener.promise;  
            };       
            
            var reconnect = function() {
              $timeout(function() {
                initialize();
              }, this.RECONNECT_TIMEOUT);
            };         
            
            var startListener = function() {
                socket.stomp.subscribe(service.CHAT_TOPIC, function(data) {
                   alert('RECEIVED DATA: ');
                   alert(data);
                });
            };            

            function getPullRequests() {
                pullRequestService.getPullRequests().then(function (pullRequests) {
                    $scope.pullRequests = pullRequests;
                    $rootScope.$emit('changeRequestCount', pullRequests.length);
                });
            }

            $scope.$on('$destroy', function () {
                    $interval.cancel(updatePullRequestsInterval);
                    updatePullRequestsInterval = undefined;
                }
            );

            $rootScope.$on('changeAssignee', function () {
                getPullRequests();
            });

            $scope.orderPrList = function (sortOrder) {
                var user = angular.copy($rootScope.user);
                if (user.userSettingsDto === null) {
                    user.userSettingsDto = {
                        orderOptionDto: sortOrder
                    };
                } else {
                    user.userSettingsDto.orderOptionDto = sortOrder;
                }
                userSettingsService.persistUserSettings(user).then(function () {
                    getPullRequests();
                });
            };
            
            $scope.websocketSend = function(message) {
                  socket.stomp.send(service.BROKER, {
                    priority: 9
                  }, JSON.stringify({
                    repoTitle: message,
                    actorName: 'Some Actor'
                  }));                
            };
            
            var initialize = function() {
                  //socket.client = new SockJS(service.SOCKET_URL);
                  //socket.stomp = Stomp.over(socket.client);
                  //socket.stomp.connect({}, startListener);
                  //socket.stomp.onclose = reconnect;
                };            
            
            updatePullRequestsInterval = $interval(getPullRequests, 60000);
            getPullRequests();
            initialize();
        }
    ]
);
