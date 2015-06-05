'use strict';

describe('desktopNotificationService', function () {
    var filter,
        cookies,
        rootScope,
        notificationDropdownItemService,
        service;

    var fakeNotification,
        newNotifications,
        notificationSpy,
        convertedNotificationText = 'some converted notification text',
        expectedNotificationListToSave;

    beforeEach(function () {
        module('headerModule');

        inject(function (desktopNotificationService, $filter, $cookies, $rootScope, _notificationDropdownItemService_) {
            service = desktopNotificationService;
            filter = $filter;
            cookies = $cookies;
            rootScope = $rootScope;
            notificationDropdownItemService = _notificationDropdownItemService_;
        });

        rootScope.user = {
            userSettingsDto: {
                desktopNotification: true
            }
        };

        spyOn(cookies, 'putObject');
        spyOn(cookies, 'remove');
        spyOn(notificationDropdownItemService, 'convert').and.returnValue(convertedNotificationText);

        fakeNotification = (function () {

            function Notification() {
            }

            Notification.requestPermission = function (callback) {
                if (typeof callback === 'function') {
                    callback();
                }
            };

            return Notification;
        }).call(this);
        window.Notification = fakeNotification;

        notificationSpy = spyOn(window, 'Notification');

        newNotifications = [{
            id: 1,
            repoTitle: 'repo 1st new notification',
            pullRequestTitle: 'pr 1st new notification'
        }, {
            id: 2,
            repoTitle: 'repo 2nd new notification',
            pullRequestTitle: 'pr f2nd new notification'
        }];

        expectedNotificationListToSave = [];
        newNotifications.forEach(function (notification) {
            expectedNotificationListToSave.push(notification.id);
        });

    });

    afterEach(function () {
        delete window.Notification;
    });

    describe('when the Notification web API object', function () {

        beforeEach(function () {
            spyOn(cookies, 'get').and.returnValue([]);
        });

        it('is not set in our browser', function () {
            delete window.Notification;
            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('does not grant permission', function () {
            fakeNotification.requestPermission = function () {
                // call no callback -> permission not granted
            };
            window.Notification = fakeNotification;

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

    });

    describe('user can toggle desktop notifications', function () {

        beforeEach(function () {
            spyOn(cookies, 'get').and.returnValue([]);
        });

        it('when user disabled desktop notifications', function () {
            rootScope.user = {
                userSettingsDto: {
                    desktopNotification: false
                }
            };

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('when desktop notifications are not available', function () {
            rootScope.user = {};

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('when the user is not available', function () {
            delete rootScope.user;

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

    });

    describe('check notification list behaviour', function () {

        beforeEach(function () {
            spyOn(cookies, 'get').and.returnValue([]);
        });

        it('when that list is not set', function () {
            service.sendNotificationsIfNew();

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookies.get).not.toHaveBeenCalled();
            expect(cookies.remove).not.toHaveBeenCalled();
            expect(cookies.putObject).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('when that list is set all notifications should be send', function () {
            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(2);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[0].repoTitle + ' - ' + newNotifications[0].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[0].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                }
            );
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                }
            );

            expect(cookies.get.calls.count()).toEqual(2);
            expect(cookies.remove.calls.count()).toEqual(1);
            expect(cookies.putObject.calls.count()).toEqual(1);
            expect(cookies.putObject).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(2);
            expect(notificationDropdownItemService.convert).toHaveBeenCalledWith(newNotifications[0]);
            expect(notificationDropdownItemService.convert).toHaveBeenCalledWith(newNotifications[1]);
        });

    });

    describe('check cookies that save already shown notifications', function () {

        it('pass 2 new notifications and none was shown before', function () {
            var knownNotifications = [5];

            spyOn(cookies, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(2);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[0].repoTitle + ' - ' + newNotifications[0].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[0].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                }
            );
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                }
            );

            expect(cookies.get.calls.count()).toEqual(2);
            expect(cookies.remove.calls.count()).toEqual(1);
            expect(cookies.putObject.calls.count()).toEqual(1);
            expect(cookies.putObject).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(2);
        });

        it('pass 2 new notifications but one was shown before', function () {
            var knownNotifications = [5];
            knownNotifications.push(newNotifications[0].id);

            spyOn(cookies, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(1);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: '/styles/img/notification.png'
                }
            );

            expect(cookies.get.calls.count()).toEqual(2);
            expect(cookies.remove.calls.count()).toEqual(1);
            expect(cookies.putObject.calls.count()).toEqual(1);
            expect(cookies.putObject).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(1);
        });

        it('pass 2 new notifications but both are marked as shown before', function () {
            var knownNotifications = [5];
            knownNotifications.push(newNotifications[0].id);
            knownNotifications.push(newNotifications[1].id);

            spyOn(cookies, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(0);

            expect(cookies.get.calls.count()).toEqual(2);
            expect(cookies.remove.calls.count()).toEqual(1);
            expect(cookies.putObject.calls.count()).toEqual(1);
            expect(cookies.putObject).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(0);
        });

    });

});
