'use strict';

describe('userSettingsService', function () {
    var $httpBackend,
        service,
        $rootScope,
        response,
        userService;

    beforeEach(function () {
        module('userModule');
        module('angularMoment');

        inject(function (userSettingsService, _$httpBackend_, _$rootScope_, _userService_) {
            service = userSettingsService;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            userService = _userService_;

            spyOn(userService, 'clearCacheForGetCurrentUser');
            spyOn(userService, 'getCurrentUser');
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('persistUserSettings', function () {
        var reqPayload = {orderOptionDto: 'DESC'},
            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: reqPayload},
            expectedUrl = '/api/users/' + user.id + '/settings';

        beforeEach(function () {
            response = $httpBackend.expectPUT(expectedUrl, reqPayload);
        });

        describe('success', function () {
            var successPayload = {status: 204};

            beforeEach(function () {
                response.respond(successPayload.status);
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

            it('calls the user service to update the currently logged in user\'s settings', function () {
                service.persistUserSettings(user);
                $httpBackend.flush();

                expect(userService.clearCacheForGetCurrentUser).toHaveBeenCalled();
                expect(userService.getCurrentUser).toHaveBeenCalled();
            });
        });

        describe('error', function () {
            var errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'failed to change sortOrder'},
                status: 400
            };

            beforeEach(function () {
                response.respond(errorPayload.status, errorPayload.data);
            });

            it('forwards error', function () {
                service.persistUserSettings(user).then(function (successResponse) {
                    expect(successResponse).toBeNull();
                }, function (errorResponse) {
                    expect(errorResponse.data).toEqual(errorPayload.data);
                });

                $httpBackend.flush();
            });

            it('does NOT call the user service upon error', function () {
                service.persistUserSettings(user);
                $httpBackend.flush();

                expect(userService.clearCacheForGetCurrentUser).not.toHaveBeenCalled();
                expect(userService.getCurrentUser).not.toHaveBeenCalled();
            });
        });
    });
});
