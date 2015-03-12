'use strict';

describe('statisticsService', function () {
    var $httpBackend, service, response, errorResponseHandler;

    beforeEach(function () {
        module('gpullr');
        module('appTemplates');

        inject(function (statisticsService, _$httpBackend_, ErrorResponseHandler) {
            service = statisticsService;
            $httpBackend = _$httpBackend_;
            errorResponseHandler = ErrorResponseHandler;
            response = $httpBackend.when('GET', expectedUrl).respond(successPayload);
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

    it('calls correct URL', function () {
        $httpBackend.expectGET(expectedUrl);
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
        response.respond(403, errorPayload.data);
        spyOn(errorResponseHandler, 'log');
        service.getRankingList(rankingScope);

        // flush the backend to "execute" the request to do the expectedGET assertion.
        $httpBackend.flush();
        expect(errorResponseHandler.log).toHaveBeenCalled();
    });
});
