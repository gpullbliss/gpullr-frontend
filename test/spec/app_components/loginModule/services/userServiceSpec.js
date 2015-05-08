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

    describe('getCurrentUser', function () {
        var expectedUrl = '/api/users/me',
            successPayload = {
                data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'},
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
            service.getCurrentUser();
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var result = null;

            service.getCurrentUser().then(function (currentUser) {
                result = currentUser;
            });

            $httpBackend.flush();
            expect(result).toEqual(successPayload.data);
        });

        it('sets user data to $rootScope.user', function () {
            service.getCurrentUser();
            $httpBackend.flush();
            $rootScope.$digest();

            expect($rootScope.user).toEqual(successPayload.data);
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.getCurrentUser().then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
/*
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
                data: {
                    id: 42, username: 'user2', avatarUrl: 'http://example.org', userSettingsDto: {
                        language: 'de'
                    }
                },
                status: 201
            },
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'login failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPOST(expectedUrl).respond(successPayload.status);
        });

        it('calls correct URL', function () {
            $httpBackend.expectGET('/api/users/me').respond(successPayload.status, successPayload.data);

            service.logInUser(user);
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            $httpBackend.expectGET('/api/users/me').respond(successPayload.status, successPayload.data);
            var success = null;

            service.logInUser(user).then(function () {
                success = true;
            });

            $httpBackend.flush();
            expect(success).toBeTruthy();
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
*/
    describe('authenticateWithGithubAndLogInUser', function() {
        var githubCode = 'some-random-code-123',
            expectedUrl = '/api/users/oauth/github/' + githubCode,
            successPayload = {
                data: {
                    id: 42, username: 'user2', avatarUrl: 'http://example.org', userSettingsDto: {
                        language: 'de'
                    }
                },
                status: 201
            },
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'login failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPOST(expectedUrl).respond(successPayload.status);
        });

        it('calls correct URL', function () {
            service.authenticateWithGithubAndLogInUser(githubCode);
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var success = null;

            service.authenticateWithGithubAndLogInUser(githubCode).then(function () {
                success = true;
            });

            $httpBackend.flush();
            expect(success).toBeTruthy();
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.authenticateWithGithubAndLogInUser(githubCode).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});
