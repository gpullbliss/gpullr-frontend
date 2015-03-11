'use strict';

describe('userService', function () {
    var service,
        $q,
        $http,
        $state,
        errorResponseHandler,
        $rootScope;

    beforeEach(function () {
        module('gpullr');
        module('appTemplates');

        inject(function (_$rootScope_, _$q_, _$state_, _$http_, userService, ErrorResponseHandler) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            $state = _$state_;
            $http = _$http_;
            service = userService;
            errorResponseHandler = ErrorResponseHandler;
        });
    });

    describe('getUsersForLogin', function () {
        var expectedUrl = '/api/users',
            mockedResponseData = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'},
            successPayload = {
                data: mockedResponseData
            },
            errorPayload = {
                data: {errorKey: 'AnyErrorK', errorMessage: 'no users available'}
            };

        function mockUserForLoginRequest(fail) {
            var deferred = $q.defer();

            if (!fail) {
                deferred.resolve(successPayload);
            } else {
                deferred.reject(errorPayload);
            }

            spyOn($http, 'get').and.callFake(function () {
                return deferred.promise;
            });
        }

        it('calls correct URL', function () {
            mockUserForLoginRequest();

            service.getUsersForLogin();
            expect($http.get).toHaveBeenCalledWith(expectedUrl);
        });

        it('returns correct data', function (done) {
            mockUserForLoginRequest();

            service.getUsersForLogin().then(function (data) {
                expect(data).toEqual(mockedResponseData);
                done();
            });
            $rootScope.$digest();
        });

        it('forwards error', function (done) {
            mockUserForLoginRequest(true);
            spyOn(errorResponseHandler, 'log');
            service.getUsersForLogin().then(function () {
                expect(errorResponseHandler.log).toHaveBeenCalledWith(errorPayload);
                done();
            });
            $rootScope.$digest();
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
                data: {errorKey: 'AnyErrorKey', errorMessage: 'login failed'}
            };

        function mockLoginRequest(fail) {
            var deferred = $q.defer();

            if (!fail) {
                deferred.resolve(successPayload);
            } else {
                deferred.reject(errorPayload);
            }

            spyOn($http, 'post').and.callFake(function () {
                return deferred.promise;
            });
        }

        it('calls correct URL', function () {
            mockLoginRequest();

            service.logInUser(user);
            expect($http.post).toHaveBeenCalledWith(expectedUrl, '');
        });

        it('returns correct data', function (done) {
            mockLoginRequest();
            spyOn($http, 'get').and.callFake(function () {
                var deferred = $q.defer();
                return deferred.promise;
            });

            service.logInUser(user).then(function (data) {
                expect(data).toEqual(successPayload.data);
                done();
            });
            $rootScope.$digest();
        });

        it('forwards error', function (done) {
            mockLoginRequest(true);
            spyOn(errorResponseHandler, 'log');
            service.logInUser(user).then(function () {
                expect(errorResponseHandler.log).toHaveBeenCalledWith(errorPayload);
                done();
            });
            $rootScope.$digest();
        });
    });
});
