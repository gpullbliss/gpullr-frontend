'use strict';

describe('userService', function () {

    var service,
        $q,
        $http,
        $state,
        $rootScope;

    beforeEach(function () {
        module('gpullr');

        inject(function (_$rootScope_, _$q_, _$state_, _$http_, userService) {
            $rootScope = _$rootScope_;
            $q = _$q_;
            $state = _$state_;
            $http = _$http_;
            service = userService;
        });
    });

    describe('whoAmI', function () {
      var expectedUrl = '/api/users/me',
          mockedResponseData = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'},
          successPayload = {
            data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'}
          },
          errorPayload = {
              data: { status: 403, code: 'Forbidden', message: 'login required'}
          };
         
      function mockWhoAmIRequest(fail) {
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
            mockWhoAmIRequest();

            service.whoAmI();
            expect($http.get).toHaveBeenCalledWith(expectedUrl);
      });
      
      it('returns correct data', function (done) {
          mockWhoAmIRequest();
          spyOn($rootScope, '$emit');
          
          service.whoAmI().then(function (data) {
              expect($rootScope.$emit).toHaveBeenCalledWith('updateUser', mockedResponseData);
              done();
          });
          $rootScope.$digest();
      });
      
      it('forwards error', function (done) {
            mockWhoAmIRequest(true);
            spyOn($state, 'go');
            service.whoAmI().then(function () {
                expect($state.go).toHaveBeenCalledWith('login');
                done(); 
            });
            $rootScope.$digest();
      });
    });
    
    describe('getUsersForLogin', function () {
      var expectedUrl = '/api/users',
          mockedResponseData = { id: 496860, username: 'testUser', avatarUrl: 'http://www.jira.de'},
          successPayload = {
            data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'}
          },
          errorPayload = {
              data: { status: 403, code: 'Forbidden', message: 'login required'}
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
    });
    /*
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
    //});
    
});
