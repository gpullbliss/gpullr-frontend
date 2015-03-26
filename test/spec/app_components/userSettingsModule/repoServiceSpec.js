'use strict';

describe('repoService', function () {
    var service,
        $httpBackend,
        response;

    beforeEach(function () {
        module('userSettingsModule');

        inject(function (repoService,  _$httpBackend_) {
            $httpBackend =  _$httpBackend_;
            service = repoService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getRepoList', function () {
        var expectedUrl = '/api/repos',
            responseData =
            [
                {
                    id:4444047,
                    name:'coporate_design'
                },{
                    id:4445366,
                    name:'paulparser'
                },{
                    id:4595809,
                    name:'GWT-XDM'
                }
            ],
            successPayload = {data: responseData, status: 200},
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'reops request failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectGET(expectedUrl).respond(successPayload.status, successPayload.data);
        });

        it('calls correct URL', function () {
            expect(service.getRepoList()).toBeDefined();
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var result = null;

            service.getRepoList().then(function (repoService) {
                result = repoService;
            });

            $httpBackend.flush();
            expect(result).toEqual(responseData);
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.getRepoList().then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});