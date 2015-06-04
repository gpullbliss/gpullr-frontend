'use strict';

describe('userService', function () {
    var $httpBackend,
        service,
        $rootScope,
        $translate,
        amMoment,
        response;

    beforeEach(function () {
        module('userModule');
        module('angularMoment');

        inject(function (userService, _$httpBackend_, _$rootScope_, _$translate_, _amMoment_) {
            service = userService;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $translate = _$translate_;
            amMoment = _amMoment_;

            spyOn($translate, 'use');
            spyOn(amMoment, 'changeLocale');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getCurrentUser', function () {
        var expectedUrl = '/api/users/me',
            successPayload = {
                data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: {language: 'en'}},
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

            expect($translate.use).toHaveBeenCalledWith(successPayload.data.userSettingsDto.language);
            expect(amMoment.changeLocale).toHaveBeenCalledWith(successPayload.data.userSettingsDto.language + '-short');
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

    describe('getNameService', function () {

        it('has full name', function(){
            var user = {fullName: 'Full Name', username: 'User Name'};
            expect(service.getName(user)).toEqual('Full Name');
        });

        it('has only username', function(){
            var user = {fullName: '', username: 'User Name'};
            expect(service.getName(user)).toEqual('User Name');
        });
    });

});
