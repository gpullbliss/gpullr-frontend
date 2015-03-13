'use strict';

describe('userService', function () {
    var $httpBackend,
        service,
        $rootScope,
        $state,
        response;

    beforeEach(function () {
        module('loginModule');

        inject(function (userService, _$httpBackend_, _$rootScope_, _$state_) {
            service = userService;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $state = _$state_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getUsersForLogin', function () {
        var expectedUrl = '/api/users',
            successPayload = {
                data: [
                    {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'},
                    {id: 42, username: 'user2', avatarUrl: 'http://example.org'}
                ],
                status: 200
            },
            errorPayload = {
                data: {errorKey: 'AnyErrorK', errorMessage: 'no users available'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectGET(expectedUrl).respond(successPayload.status, successPayload.data);
        });

        it('calls correct URL', function () {
            service.getUsersForLogin();
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var result = null;

            service.getUsersForLogin().then(function (users) {
                result = users;
            });

            $httpBackend.flush();
            expect(result).toEqual(successPayload.data);
        });


        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.getUsersForLogin().then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });

    describe('logInUser', function () {
        var user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'},
            expectedUrl = '/api/users/login/' + user.id,
            successPayload = {
                data: true,
                status: 201
            },
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'login failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPOST(expectedUrl).respond(successPayload.status, successPayload.data);
        });

        it('calls correct URL', function () {
            service.logInUser(user);
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var result = null;

            service.logInUser(user).then(function (success) {
                result = success;
            });

            $httpBackend.flush();
            expect(result).toEqual(successPayload.data);
        });


        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.logInUser(user).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});
