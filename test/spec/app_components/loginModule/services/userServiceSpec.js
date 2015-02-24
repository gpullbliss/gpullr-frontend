'use strict';

describe('pullRequestService', function () {

    var service,
        $httpBackend;

    beforeEach(function () {
        module('gpullr');

        inject(function (userService, _$httpBackend_) {
            $httpBackend = _$httpBackend_;

            service = userService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getUsersForLogin', function () {
        var endpointUrl = '/api/users',
            response = {
                status: 200,
                data: [
                    {
                        id: 5,
                        username: 'laGenteEstaMuyLoca81',
                        avatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3'
                    }, {
                        id: 42,
                        username: 'shafel',
                        avatarUrl: 'https://avatars3.githubusercontent.com/u/1777303?v=3'
                    }
                ]
            };

        it('calls correct URL', function () {
            $httpBackend.expectGET(endpointUrl).respond(response.status, '');

            expect(service.getUsersForLogin()).toBeDefined();

            $httpBackend.flush();
        });

        it('returns data', function () {
            var result = null;
            $httpBackend.expectGET(endpointUrl).respond(response.status, response.data);

            service.getUsersForLogin().then(function (users) {
                result = users;
            });

            $httpBackend.flush();
            expect(result).toEqual(response.data);
        });

    });

    describe('logInUser', function () {
        var user = {
                id: 5,
                username: 'laGenteEstaMuyLoca81',
                avatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3'
            },
            endpointUrl = '/api/users/login/' + user.id,
            response = {
                status: 201,
                data: ''
            };

        it('calls correct URL', function () {
            $httpBackend.expectPOST(endpointUrl, '').respond(response.status, response.data);

            expect(service.logInUser(user)).toBeDefined();

            $httpBackend.flush();
        });

        it('logs in successful', function () {
            var result = null;

            $httpBackend.expectPOST(endpointUrl, '').respond(response.status, response.data);

            service.logInUser(user).then(function (success) {
                result = success;
            });

            $httpBackend.flush();
            expect(result).toBeTruthy();
        });
        /* TODO (Michael Diodone 2015-02-24): fix "$digest already in progress" error if you know how
         it('fails to login due to wrong status code', function () {
         var result = null,
         error = null,
         wrongStatus = 403,
         expectedError = 'Got response code ' + wrongStatus + ' instead of 201';

         $httpBackend.expectPOST(endpointUrl, '').respond(wrongStatus, response.data);

         service.logInUser(user).then(function (success) {
         result = success;
         }, function (errorMessage) {
         error = errorMessage;
         });

         $httpBackend.flush();
         expect(result).toBeNull();
         expect(expectedError).toEqual(error);
         });
         */
    });

});
