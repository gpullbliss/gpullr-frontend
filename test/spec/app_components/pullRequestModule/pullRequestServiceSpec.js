'use strict';

describe('PullRequestService', function () {
    var service,
        $httpBackend,
        response;

    beforeEach(function () {
        module('pullRequestModule');

        inject(function (PullRequestService, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            service = PullRequestService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getPullRequests', function () {
        describe('without reposToInclude', function () {
            var expectedUrl = '/api/pulls',
                responseData =
                {
                    items: [
                        {
                            id: 12345,
                            title: 'Update 3001-angularjs-styleguide.md',
                            url: 'https://github.com/devbliss/manuals/pull/44',
                            repository: 'manuals',
                            author: {
                                username: 'okarahan',
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
                                username: 'shafel',
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
                },
                successPayload = {data: responseData, status: 200},
                errorPayload = {
                    data: {errorKey: 'AnyErrorKey', errorMessage: 'assign pull request failed'},
                    status: 400
                };

            beforeEach(function () {
                response = $httpBackend.expectGET(expectedUrl).respond(successPayload.status, successPayload.data);
            });

            it('calls correct URL', function () {
                expect(service.getPullRequests()).toBeDefined();

                $httpBackend.flush();
            });

            it('returns correct data', function () {
                var result = null;

                service.getPullRequests().then(function (pullRequests) {
                    result = pullRequests;
                });

                $httpBackend.flush();
                expect(result).toEqual(responseData.items);
            });

            it('forwards error', function () {
                response.respond(errorPayload.status, errorPayload.data);

                service.getPullRequests().then(function (successResponse) {
                    expect(successResponse).toBeNull();
                }, function (errorResponse) {
                    expect(errorResponse.data).toEqual(errorPayload.data);
                });

                $httpBackend.flush();
            });
        });

        describe('with reposToInclude', function () {
            var reposToInclude = ['docbliss', 'gpullr-frontend'],
                expectedUrl = '/api/pulls?repos=docbliss;gpullr-frontend',
                responseData =
                {
                    items: [
                        {
                            id: 12345,
                            title: 'feature/zuul-reverse-proxy',
                            url: 'https://github.com/devbliss/docbliss/pull/25',
                            repository: 'docbliss',
                            author: {
                                username: 'doernbrackandre',
                                avatarUrl: 'https://avatars3.githubusercontent.com/u/7847193?v=3'
                            },
                            creationDate: '2015-02-11T12:12:31Z',
                            filesChanged: 1,
                            linesAdded: 112,
                            linesRemoved: 0,
                            assignee: null,
                            status: 'Merged'
                        }
                    ]
                },
                successPayload = {data: responseData, status: 200},
                errorPayload = {
                    data: {errorKey: 'AnyErrorKey', errorMessage: 'assign pull request failed'},
                    status: 400
                };

            beforeEach(function () {
                response = $httpBackend.expectGET(expectedUrl).respond(successPayload.status, successPayload.data);
            });

            it('calls correct URL', function () {
                expect(service.getPullRequests(reposToInclude)).toBeDefined();

                $httpBackend.flush();
            });

            it('returns correct data', function () {
                var result = null;

                service.getPullRequests(reposToInclude).then(function (pullRequests) {
                    result = pullRequests;
                });

                $httpBackend.flush();
                expect(result).toEqual(responseData.items);
            });

            it('forwards error', function () {
                response.respond(errorPayload.status, errorPayload.data);

                service.getPullRequests(reposToInclude).then(function (successResponse) {
                    expect(successResponse).toBeNull();
                }, function (errorResponse) {
                    expect(errorResponse.data).toEqual(errorPayload.data);
                });

                $httpBackend.flush();
            });
        });
    });
    
    describe('assignPullRequest', function () {
        var pr = {id: 12345, repoName: 'testRepo'},
            expectedUrl = '/api/pulls/' + pr.id,
            successPayload = {status: 204},
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'assign pull request failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPOST(expectedUrl).respond(successPayload.status);
        });

        it('calls correct URL', function () {
            expect(service.assignPullRequest(pr.id)).toBeDefined();

            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var success = null;

            service.assignPullRequest(pr.id).then(function () {
                success = true;
            });

            $httpBackend.flush();
            expect(success).toBeTruthy();
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.assignPullRequest(pr.id).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });
});
