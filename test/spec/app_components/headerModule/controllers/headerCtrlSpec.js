'use strict';

describe('headerCtrl', function () {
    var controller,
        $controller,
        userService,
        user,
        rootScope,
        scope,
        interval,
        UserNameService,
        notifications,
        notificationService,
        notificationDropdownItemService,
        q;

    beforeEach(function () {
        module('headerModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$interval_,
                         _userService_,
                         _UserNameService_,
                         _notificationService_,
                         _notificationDropdownItemService_,
                         _$q_) {

            $controller = _$controller_;
            userService = _userService_;
            rootScope = _$rootScope_;
            scope = rootScope.$new();
            interval = _$interval_;
            UserNameService = _UserNameService_;
            notificationService = _notificationService_;
            notificationDropdownItemService = _notificationDropdownItemService_;
            q = _$q_;

            user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};
            notifications = { 'items': [{'id': 1}, {'id': 2}, { 'id': 3}]};

            spyOn(userService, 'getCurrentUser');

            spyOn(notificationService, 'getNotifications').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve(notifications.items);
                return deferred.promise;
            });

            spyOn(notificationService, 'markAllNotificationsRead');

            spyOn(notificationService, 'markNotificationRead');

            controller = $controller('headerCtrl', {
                $scope: scope,
                $rootScope: rootScope,
                userService: userService,
                UserNameService: UserNameService,
                notificationService: notificationService,
                notificationDropdownItemService: notificationDropdownItemService,
                STATE_STATS: 'stats',
                STATE_DASHBOARD: 'dashboard',
                STATE_REPO_FILTER: 'repoFilter'
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
