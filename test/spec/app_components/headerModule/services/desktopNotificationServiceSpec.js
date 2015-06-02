'use strict';

describe('desktopNotificationService', function () {
    var filter,
        cookieStore,
        notificationDropdownItemService,
        service;

    var fakeNotification,
        newNotifications,
        notificationSpy,
        convertedNotificationText = 'some converted notification text',
        expectedNotificationListToSave = {};

    beforeEach(function () {
        module('headerModule');

        inject(function (desktopNotificationService, $filter, $cookieStore, _notificationDropdownItemService_) {
            service = desktopNotificationService;
            filter = $filter;
            cookieStore = $cookieStore;
            notificationDropdownItemService = _notificationDropdownItemService_;
        });

        spyOn(cookieStore, 'put');
        spyOn(cookieStore, 'remove');
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

        newNotifications.forEach(function (notification) {
            expectedNotificationListToSave[notification.id] = notification.id;
        });

    });

    afterEach(function () {
        delete window.Notification;
    });

    describe('when the Notification web API object', function () {

        beforeEach(function () {
            spyOn(cookieStore, 'get').and.returnValue({});
        });

        it('is not set in our browser', function () {
            delete window.Notification;
            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookieStore.get).not.toHaveBeenCalled();
            expect(cookieStore.remove).not.toHaveBeenCalled();
            expect(cookieStore.put).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('does not grant permission', function () {
            fakeNotification.requestPermission = function () {
                // call no callback -> permission not granted
            };
            window.Notification = fakeNotification;

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookieStore.get).not.toHaveBeenCalled();
            expect(cookieStore.remove).not.toHaveBeenCalled();
            expect(cookieStore.put).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

    });

    describe('a notification lists have to be passed in order to send a desktop notification for each one', function () {

        beforeEach(function () {
            spyOn(cookieStore, 'get').and.returnValue({});
        });

        it('when that list is not set', function () {
            service.sendNotificationsIfNew();

            expect(notificationSpy).not.toHaveBeenCalled();

            expect(cookieStore.get).not.toHaveBeenCalled();
            expect(cookieStore.remove).not.toHaveBeenCalled();
            expect(cookieStore.put).not.toHaveBeenCalled();

            expect(notificationDropdownItemService.convert).not.toHaveBeenCalled();
        });

        it('when that list is set all notifications are used to send to the desktop', function () {
            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(2);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[0].repoTitle + ' - ' + newNotifications[0].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[0].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                }
            );
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                }
            );

            expect(cookieStore.get.calls.count()).toEqual(2);
            expect(cookieStore.remove.calls.count()).toEqual(1);
            expect(cookieStore.put.calls.count()).toEqual(1);
            expect(cookieStore.put).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(2);
            expect(notificationDropdownItemService.convert).toHaveBeenCalledWith(newNotifications[0]);
            expect(notificationDropdownItemService.convert).toHaveBeenCalledWith(newNotifications[1]);
        });

    });

    describe('the cookies are used to save already shown notifications', function () {

        it('when 2 new notifications have to be shown and none of them were shown before', function () {
            var knownNotifications = {5: 5};

            spyOn(cookieStore, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(2);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[0].repoTitle + ' - ' + newNotifications[0].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[0].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                }
            );
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                }
            );

            expect(cookieStore.get.calls.count()).toEqual(2);
            expect(cookieStore.remove.calls.count()).toEqual(1);
            expect(cookieStore.put.calls.count()).toEqual(1);
            expect(cookieStore.put).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(2);
        });

        it('when 2 new notifications have to be shown and one of them was shown before', function () {
            var knownNotifications = {5: 5};
            knownNotifications[newNotifications[0].id] = newNotifications[0].id;

            spyOn(cookieStore, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(1);
            expect(notificationSpy).toHaveBeenCalledWith(
                newNotifications[1].repoTitle + ' - ' + newNotifications[1].pullRequestTitle,
                {
                    body: convertedNotificationText,
                    tag: newNotifications[1].repoTitle,
                    lang: filter('translate')('global.bcp47'),
                    icon: 'http://gpullr.devbliss.com/styles/img/favicon/favicon.png'
                }
            );

            expect(cookieStore.get.calls.count()).toEqual(2);
            expect(cookieStore.remove.calls.count()).toEqual(1);
            expect(cookieStore.put.calls.count()).toEqual(1);
            expect(cookieStore.put).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(1);
        });

        it('when 2 new notifications have to be shown but both of them were shown before', function () {
            var knownNotifications = {5: 5};
            knownNotifications[newNotifications[0].id] = newNotifications[0].id;
            knownNotifications[newNotifications[1].id] = newNotifications[1].id;

            spyOn(cookieStore, 'get').and.returnValue(knownNotifications);

            service.sendNotificationsIfNew(newNotifications);

            expect(notificationSpy.calls.count()).toEqual(0);

            expect(cookieStore.get.calls.count()).toEqual(2);
            expect(cookieStore.remove.calls.count()).toEqual(1);
            expect(cookieStore.put.calls.count()).toEqual(1);
            expect(cookieStore.put).toHaveBeenCalledWith('notifications', expectedNotificationListToSave);

            expect(notificationDropdownItemService.convert.calls.count()).toEqual(0);
        });

    });

});
