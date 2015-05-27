'use strict';

describe('systemNotificationsCtrl', function () {
    var $controller,
        $q,
        momentMock,
        filter,
        scope,
        notificationService,
        dateTime;

    beforeEach(function () {
        module('dashboardModule');

        inject(function ($rootScope, _$q_, _$controller_, $filter) {
            $q = _$q_;
            filter = $filter;
            scope = $rootScope.$new();
            $controller = _$controller_;
        });

        // === MOMENTJS ===
        momentMock = {
            fromNow: function () {
            }
        };

        var moment = function () {
            return momentMock;
        };

        dateTime = 'in 3 min';
        spyOn(momentMock, 'fromNow').and.callFake(function () {
            return dateTime;
        });

        // === NOTIFICATION SERVICE ===
        notificationService = {
            getNotifications: function () {
            }
        };

        var notification = {
            'userNotifications': [],
            'systemNotifications': [
                {
                    'validUntil': '2015-05-20T12:00:00.000+02:00',
                    'notificationType': 'API_RATE_LIMIT_REACHED'
                }
            ]
        };

        spyOn(notificationService, 'getNotifications').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve(notification);
            return deferred.promise;
        });

        $controller('systemNotificationsCtrl', {
            $scope: scope,
            notificationService: notificationService,
            moment: moment
        });

    });

    describe('notification service', function () {

        it('modify systemNotifications reset at time for text representation', function () {
            scope.$digest();

            expect(notificationService.getNotifications).toHaveBeenCalled();
            expect(momentMock.fromNow).toHaveBeenCalled();
            expect(scope.messages[0]).toBeDefined();
            expect(scope.messages[0].validUntilParsed).toEqual(dateTime);
        });
    });

});