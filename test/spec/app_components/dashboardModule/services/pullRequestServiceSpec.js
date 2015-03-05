'use strict';

describe('pullRequestService', function () {

    var service,
        errorResponseHandler,
        $httpBackend;

    // Set up the module
    beforeEach(module('gpullr'));

    beforeEach(inject(function (pullRequestService, _$httpBackend_, ErrorResponseHandler) {
            $httpBackend = _$httpBackend_;
            errorResponseHandler = ErrorResponseHandler;
            service = pullRequestService;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getPullRequests', function () {
        var endpointUrl = '/api/pulls',
            responseData =
            {
                items: [
                    {
                        id: 12345,
                        title: 'Update 3001-angularjs-styleguide.md',
                        url: 'https://github.com/devbliss/manuals/pull/44',
                        repository: 'manuals',
                        author: {
                            username: 'Ömer Karahan',
                            avatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3'
                        },
                        creationDate: '2015-02-11T12:12:31Z',
                        filesChanged: 1,
                        linesAdded: 112,
                        linesRemoved: 0,
                        assignee: null,
                        status: 'Merged'
                    }, {
                        id: 12345,
                        title: 'refactor/testSourceSets',
                        url: 'https://github.com/devbliss/ecosystem-course-aggregation/pull/49',
                        repository: 'ecosystem-course-aggregation',
                        author: {
                            username: 'Elena Shafranova',
                            avatarUrl: 'https://avatars3.githubusercontent.com/u/1777303?v=3'
                        },
                        creationDate: '2015-02-11T13:12:31Z',
                        filesChanged: 15,
                        linesAdded: 334,
                        linesRemoved: 313,
                        assignee: {
                            username: 'marcelb',
                            avatarUrl: 'https://avatars1.githubusercontent.com/u/308374?v=3'
                        },
                        status: 'Open'
                    }
                ]
            };

        it('calls correct URL', function () {
            $httpBackend.expectGET(endpointUrl).respond(200, '');

            expect(service.getPullRequests()).toBeDefined();

            $httpBackend.flush();
        });

        it('returns data', function () {
            var result = null;
            $httpBackend.expectGET(endpointUrl).respond(200, responseData);

            service.getPullRequests().then(function (pullRequests) {
                result = pullRequests;
            });

            $httpBackend.flush();
            expect(result).toEqual(responseData.items);
        });

    });
    
    describe('assignPullRequest', function () {
        var pr = {id: 12345, repoName: 'testRepo'},
            endpointUrl = '/api/pulls/' + pr.id,
            responseData =
            {
                data: true,
                status: 204
            },
            errorPayload = {
              data: { errorKey: 'AnyErrorKey', errorMessage: 'assign pullrequest failed'}
            };

        it('calls correct URL', function () {
            $httpBackend.expectPOST(endpointUrl, '').respond(204, '');
            
            expect(service.assignPullRequest(pr.id)).toBeDefined();

            $httpBackend.flush();
        });
        
        it('call returns data', function () {
            var result = null;
            $httpBackend.expectPOST(endpointUrl, '').respond(204, responseData);
            service.assignPullRequest(pr.id).then(function (res) {
                result = res;
            });

            $httpBackend.flush();
            expect(result).toEqual(responseData.data);
        });

        it('return data fails', function () {
            $httpBackend.expectPOST(endpointUrl, '').respond(400, errorPayload);
            service.assignPullRequest(pr.id);
            spyOn(errorResponseHandler, 'log');

            $httpBackend.flush();
            expect(errorResponseHandler.log).toHaveBeenCalled();
        });

    });

});
