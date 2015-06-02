'use strict';

describe('headerCtrl', function () {
    var controller,
        $controller,
        userService,
        user,
        rootScope,
        scope,
        notifications,
        notificationService,
        notificationDropdownItemService,
        desktopNotificationService,
        q,
        httpBackend;

    beforeEach(function () {
        module('headerModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _userService_,
                         _notificationService_,
                         _notificationDropdownItemService_,
                         _desktopNotificationService_,
                         _$q_,
                         _$httpBackend_) {

            $controller = _$controller_;
            userService = _userService_;
            rootScope = _$rootScope_;
            scope = rootScope.$new();
            notificationService = _notificationService_;
            notificationDropdownItemService = _notificationDropdownItemService_;
            desktopNotificationService = _desktopNotificationService_;
            q = _$q_;
            httpBackend = _$httpBackend_;

            user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};
            notifications = {
                'userNotifications': [{'id': 1}, {'id': 2}, { 'id': 3}],
                'systemNotifications': []
            };

            spyOn(userService, 'getCurrentUser');

            spyOn(notificationService, 'getNotifications').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve(notifications);
                return deferred.promise;
            });

            spyOn(notificationService, 'markAllNotificationsRead');

            spyOn(notificationService, 'markNotificationRead');

            spyOn(desktopNotificationService, 'sendNotificationsIfNew');

            // upon injecting the NotificationService the service immediately calles the backend
            // getNotifications endpoint.
            httpBackend.expectGET('/api/notifications').respond(notifications);
            httpBackend.flush();

            controller = $controller('headerCtrl', {
                $scope: scope,
                $rootScope: rootScope,
                userService: userService,
                notificationService: notificationService,
                notificationDropdownItemService: notificationDropdownItemService,
                desktopNotificationService: desktopNotificationService,
                STATE_STATS: 'stats',
                STATE_DASHBOARD: 'dashboard',
                STATE_USER_SETTINGS: 'repoFilter'
            });
        });
    });

    describe('$scope.requestCount', function () {
        it('processes changeRequestCount events and sets requestCount', function () {
            rootScope.$emit('changeRequestCount', 44);
            scope.$digest();
            expect(scope.requestCount).toEqual(44);
        });
    });

    describe('notifications', function () {
        it('fetches all pending unread notifications', function () {
            scope.$digest();
            expect(notificationService.getNotifications).toHaveBeenCalled();
            expect(scope.notifications.length).toEqual(3);
            expect(desktopNotificationService.sendNotificationsIfNew).toHaveBeenCalledWith(notifications.userNotifications);
        });

        it('remove a notification from notification list upon clicking the X button', function () {
            var event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
            scope.$digest();
            scope.markNotificationAsSeen(event, 2);
            scope.$digest();

            expect(notificationService.markNotificationRead).toHaveBeenCalledWith(2);

            // originally list is three items long
            expect(scope.notifications.length).toEqual(2);

            // removing 2nd notification leaves the notifications array be filled with notifications 1 and 3
            expect(scope.notifications[0].id).toEqual(1);
            expect(scope.notifications[1].id).toEqual(3);
        });

        it('remove all notifications upon clicking "all read"', function () {
            scope.$digest();
            scope.markAllNotificationsRead();
            scope.$digest();
            expect(notificationService.markAllNotificationsRead).toHaveBeenCalled();

            // originally list is three items long
            expect(scope.notifications.length).toEqual(0);
        });

    });

});
