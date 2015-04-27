'use strict';

describe('notificationService', function () {
    var httpBackend,
        service;

    beforeEach(function () {
        module('dashboardModule');

        inject(function (notificationService, _$httpBackend_) {
            service = notificationService
            httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    var expectedUrl = '/api/notifications',
        successPayload =            {
            'items': [
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
            ]
        };
    ;

    describe('getNotifications', function () {
        beforeEach(function () {
            response = httpBackend.expectGET(expectedUrl).respond(successPayload);
        });

    })

});