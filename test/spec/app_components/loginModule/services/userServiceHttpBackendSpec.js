'use strict';

describe('userService', function () {

    var $httpBackend, service, $rootScope, $state, response;

    // Set up the module
    beforeEach(module('gpullr'));

    beforeEach(inject(function (userService, _$httpBackend_, _$rootScope_, _$state_) {
        service = userService;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        $httpBackend.when('GET', 'app_components/dashboardModule/views/dashboard.html').respond("html");
        response = $httpBackend.when('GET', expectedUrl).respond(successPayload);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    var expectedUrl = '/api/users/me',
        successPayload = {
            data: {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de'}
        },
        errorPayload = {
            data: {status: 403}
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
        $rootScope.$digest();
    });

    it('forwards error', function () {
        response.respond(403, errorPayload);
        spyOn($state, 'go');
        var returnedPromise = service.whoAmI();

        var result = null;
        returnedPromise.then(function (error) {
            result = error;
        });

        // flush the backend to "execute" the request to do the expectedGET assertion.
        $httpBackend.flush();
        expect($state.go).toHaveBeenCalledWith('login');
    });
});
