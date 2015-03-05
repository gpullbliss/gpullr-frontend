'use strict';

describe('userService', function () {
    var $httpBackend, service, $rootScope, $state, response, errorResponseHandler;

    beforeEach(function () {
        module('gpullr');
        module('appTemplates');

        inject(function (userService, _$httpBackend_, _$rootScope_, _$state_, ErrorResponseHandler) {
            service = userService;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $state = _$state_;
            errorResponseHandler = ErrorResponseHandler;
            response = $httpBackend.when('GET', expectedUrl).respond(successPayload);
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    var expectedUrl = '/api/users/me',
        successPayload = {
            data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'}
        },
        errorPayload = {
            data: {errorKey: 'Forbidden', errorMessage: 'login required'},
            status: 403, 
            headers: Function,
            config: { method: 'GET',
                      transformRequest: [ Function ],
                      transformResponse: [ Function ],
                      url: '/api/users/me', 
                      headers: { Accept: 'application/json, text/plain, */*' 
                     } },
            statusText: ''
        };

    it('calls correct URL', function () {
        $httpBackend.expectGET(expectedUrl);
        service.whoAmI();
        $httpBackend.flush();
    });

    it('returns correct data', function () {
        spyOn($rootScope, '$emit');
        service.whoAmI();

        $httpBackend.flush();
        expect($rootScope.$emit).toHaveBeenCalledWith('updateUser', successPayload);
    });

    it('forwards error', function () {
        response.respond(403, errorPayload.data);
        spyOn($state, 'go');
        spyOn(errorResponseHandler, 'log');
        var returnedPromise = service.whoAmI();

        var result = null;
        returnedPromise.then(function (error) {
            result = error;
        });

        // flush the backend to "execute" the request to do the expectedGET assertion.
        $httpBackend.flush();
        expect($state.go).toHaveBeenCalledWith('login');
        expect(errorResponseHandler.log).toHaveBeenCalled();
    });
});
