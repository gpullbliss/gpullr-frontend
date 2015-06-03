'use strict';

describe('notificationDropdownItemService', function () {
    var filter,
        service;

    beforeEach(function () {
        module('headerModule');

        inject(function (notificationDropdownItemService, $filter) {
            service = notificationDropdownItemService;
            filter = $filter;
        });
    });

    describe('convert a notification', function () {

        it('of type PULLREQUEST_CLOSED', function () {
            var notification = {
                type: 'PULLREQUEST_CLOSED',
                actorName: 'that actor',
                pullRequestTitle: 'my pull request title',
                repoTitle: 'with a repo title'
            };
            var expectedText = notification.actorName + ' ' + filter('translate')('navi.notifications.closedPr') + ' ' + notification.pullRequestTitle + ' ' + filter('translate')('navi.notifications.inRepo') + ' ' + notification.repoTitle;

            var text = service.convert(notification);
            expect(text).toBe(expectedText);
        });

        it('of unknown type', function () {
            var notification = {
                type: 'unknown-type'
            };

            var text = service.convert(notification);
            expect(text).toBe('');
        });

    });

});
