'use strict';

describe('notificationService', function () {
    var httpBackend,
        interval,
        q,
        filter,
        service;

    beforeEach(function () {
        module('headerModule');

        inject(function (notificationService, _$httpBackend_, _$interval_, _$q_, $filter) {
            service = notificationService;
            httpBackend = _$httpBackend_;
            q = _$q_;
            interval = _$interval_;
            filter = $filter;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    var expectedUrl = '/api/notifications',
        successPayload = {
            'userNotifications': [
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
            ],
            'systemNotifications': [
                {
                    'validUntil': '2015-05-20T12:00:00.000+02:00',
                    'notificationType': 'API_RATE_LIMIT_REACHED'
                }
            ]
        };

    describe('notification service', function () {

        it('calls correct URL for retrieval of notifications', function () {
            var result = {};
            httpBackend.expectGET(expectedUrl).respond(successPayload);
            httpBackend.flush();

            service.getNotifications().then(function (response) {
                result = response;
                expect(result).toEqual(successPayload);
            });
        });

        it('calls correct URL for removal of selected single notifications', function () {
            // initial call
            httpBackend.expectGET(expectedUrl).respond();
            httpBackend.expectDELETE(expectedUrl + '/1').respond();
            service.markNotificationRead(1);
            httpBackend.flush();
        });

        it('calls correct URL for removal of all notifications', function () {
            // initial call
            httpBackend.expectGET(expectedUrl).respond();

            httpBackend.expectDELETE(expectedUrl).respond();
            service.markAllNotificationsRead();
            httpBackend.flush();
        });

        it('polling', function () {
            // initial call
            httpBackend.expectGET(expectedUrl).respond(successPayload);
            httpBackend.flush();
            service.stopPolling();

            service.getNotifications().then(function (response) {
                expect(response).toEqual({});
            });

            service.startPolling();
            httpBackend.expectGET(expectedUrl).respond(successPayload);
            httpBackend.flush();

            service.getNotifications().then(function (response) {
                expect(response).toEqual(successPayload);
            });
        });

        it('polling stops on 403', function () {
            // initial call
            httpBackend.expectGET(expectedUrl).respond(403);
            httpBackend.flush();

            service.getNotifications().then(function (response) {
                expect(response).toEqual({});
            });

        });

    });

});