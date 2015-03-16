'use strict';

describe('userSettingsService', function () {
    var $httpBackend,
        service,
        $rootScope,
        response;

    beforeEach(function () {
        module('loginModule');

        inject(function (userSettingsService, _$httpBackend_, _$rootScope_) {
            service = userSettingsService;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('persistUserSettings', function () {
        var reqPayload = {orderOptionDto: 'DESC'},
            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: reqPayload},
            expectedUrl = '/api/users/' + user.id + '/settings',
            successPayload = {status: 204},
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'failed to change sortOrder'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPUT(expectedUrl, reqPayload).respond(successPayload.status);
        });

        it('calls correct URL', function () {
            service.persistUserSettings(user);
            $httpBackend.flush();
        });

        it('successful change', function () {
            var success = null;

            service.persistUserSettings(user).then(function () {
                success = true;
            });

            $httpBackend.flush();

            expect(success).toBeTruthy();
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.persistUserSettings(user).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});