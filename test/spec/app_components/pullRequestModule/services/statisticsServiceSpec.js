'use strict';

describe('statisticsService', function () {
    var $httpBackend,
        service,
        response;

    beforeEach(function () {
        module('dashboardModule');

        inject(function (statisticsService, _$httpBackend_) {
            service = statisticsService;
            $httpBackend = _$httpBackend_;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    var rankingScope = 'today',
        expectedUrl = '/api/rankings?rankingScope=' + rankingScope,
        successPayload = {
            items: [{id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', ranking: 1, closedCount: 12}]
        },
        errorPayload = {
            data: {errorKey: 'Forbidden', errorMessage: 'login required'},
            status: 403,
            headers: Function,
            config: {
                method: 'GET',
                transformRequest: [Function],
                transformResponse: [Function],
                url: '/api/rankings?rankingScope=' + rankingScope,
                headers: {
                    Accept: 'application/json, text/plain, */*'
                }
            },
            statusText: ''
        };

    describe('getRankingList', function () {
        beforeEach(function () {
            response = $httpBackend.expectGET(expectedUrl).respond(successPayload);
        });

        it('calls correct URL', function () {
            service.getRankingList(rankingScope);
            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var result = null;
            service.getRankingList(rankingScope).then(function (response) {
                result = response;
            });

            $httpBackend.flush();
            expect(result).toEqual(successPayload.items);
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.getRankingList(rankingScope).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});
