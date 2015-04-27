'use strict';

describe('notificationService', function () {
    var httpBackend,
        service,
        response;

    beforeEach(function () {
        module('dashboardModule');

        inject(function (notificationService, _$httpBackend_) {
            service = notificationService;
            httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    var expectedUrl = '/api/notifications',
        successPayload = [
            {
                'id': 1,
                'createdAt': '2015-04-17T14:55:59Z',
                'type': 'PULLREQUEST_CLOSED',
                'actorName': 'u1',
                'repoTitle': 'repo1',
                'pullRequestTitle': 'feature1'
            },
            {
                'id': 2,
                'createdAt': '2015-04-17T14:56:00Z',
                'type': 'PULLREQUEST_CLOSED',
                'actorName': 'u2',
                'repoTitle': 'repo2',
                'pullRequestTitle': 'feature2'
            },
            {
                'id': 3,
                'createdAt': '2015-04-17T14:55:59Z',
                'type': 'PULLREQUEST_CLOSED',
                'actorName': 'u1',
                'repoTitle': 'repo1',
                'pullRequestTitle': 'feature3'
            }
        ];

    describe('notification service', function () {

        it('calls correct URL for retrieval of notifications', function () {
            var result;
            httpBackend.expectGET(expectedUrl).respond(successPayload);

            service.getNotifications().then(function (response) {
                result = response;
            });
            httpBackend.flush();

            expect(result).toEqual(successPayload.items);
        });

        it('calls correct URL for removal of selected single notifications', function () {
            httpBackend.expectDELETE(expectedUrl + '/1').respond();
            service.markNotificationRead(1);
            httpBackend.flush();
        });

        it('calls correct URL for removal all notifications', function () {
            httpBackend.expectDELETE(expectedUrl).respond();
            service.markAllNotificationsRead();

            httpBackend.flush();
        });

    })

});