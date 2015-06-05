'use strict';

describe('pullRequestService', function () {
    var service,
        $httpBackend,
        response;

    beforeEach(function () {
        module('pullRequestModule');

        inject(function (pullRequestService, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            service = pullRequestService;
        });
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('getPullRequests', function () {
        describe('without reposToInclude', function () {
            var expectedUrl = '/api/pulls',
                item1 = {
                    id: 12345,
                    title: 'Update 3001-angularjs-styleguide.md',
                    url: 'https://github.com/devbliss/manuals/pull/44',
                    repository: 'manuals',
                    author: {
                        username: 'okarahan',
                        avatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3'
                    },
                    createdAt: '2015-02-11T12:12:31Z',
                    filesChanged: 1,
                    linesAdded: 112,
                    linesRemoved: 0,
                    assignee: null,
                    status: 'Open'
                },
                item2 = {
                    id: 12345,
                    title: 'Update 3001-angularjs-styleguide.md',
                    url: 'https://github.com/devbliss/manuals/pull/45',
                    repository: 'manuals',
                    author: {
                        username: 'bastien03',
                        avatarUrl: 'https://avatars3.githubusercontent.com/u/496860?v=3'
                    },
                    createdAt: '2015-02-12T12:12:31Z',
                    filesChanged: 7,
                    linesAdded: 15,
                    linesRemoved: 27,
                    assignee: null,
                    status: 'Open'
                },
                item3 = {
                    id: 12345,
                    title: 'refactor/testSourceSets',
                    url: 'https://github.com/devbliss/ecosystem-course-aggregation/pull/49',
                    repository: 'ecosystem-course-aggregation',
                    author: {
                        username: 'shafel',
                        avatarUrl: 'https://avatars3.githubusercontent.com/u/1777303?v=3'
                    },
                    createdAt: '2015-02-12T13:12:31Z',
                    filesChanged: 15,
                    linesAdded: 334,
                    linesRemoved: 313,
                    assignee: {
                        username: 'marcelb',
                        avatarUrl: 'https://avatars1.githubusercontent.com/u/308374?v=3'
                    },
                    status: 'Open'
                },
                responseData =
                {
                    items: [
                        item1,
                        item2,
                        item3
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

                item1.elders = [];
                item2.elders = [item1];

                var expectedResult = [
                    item1, item2, item3
                ];

                $httpBackend.flush();
                expect(result).toEqual(expectedResult);
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
                            status: 'Merged',
                            elders: []
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

    describe('unassignPullRequest', function () {
        var pr = {id: 12345, repoName: 'testRepo'},
            expectedUrl = '/api/pulls/' + pr.id,
            successPayload = {status: 204},
            errorPayload = {
                data: {errorKey: 'AnyErrorKey', errorMessage: 'unassign pull request failed'},
                status: 400
            };

        beforeEach(function () {
            response = $httpBackend.expectPUT(expectedUrl).respond(successPayload.status);
        });

        it('calls correct URL', function () {
            expect(service.unassignPullRequest(pr.id)).toBeDefined();

            $httpBackend.flush();
        });

        it('returns correct data', function () {
            var success = null;

            service.unassignPullRequest(pr.id).then(function () {
                success = true;
            });

            $httpBackend.flush();
            expect(success).toBeTruthy();
        });

        it('forwards error', function () {
            response.respond(errorPayload.status, errorPayload.data);

            service.unassignPullRequest(pr.id).then(function (successResponse) {
                expect(successResponse).toBeNull();
            }, function (errorResponse) {
                expect(errorResponse.data).toEqual(errorPayload.data);
            });

            $httpBackend.flush();
        });
    });

    describe('abbreviateLinesService', function () {

        it('has more than 1000 lines', function(){
            var pull = {linesAdded: 1111, linesRemoved: 1599};
            expect(service.getAbbreviateLines(pull.linesAdded)).toEqual('1k');
            expect(service.getAbbreviateLines(pull.linesRemoved)).toEqual('2k');
        });

        it('has less than 1000 lines', function(){
            var pull = {linesAdded: 111, linesRemoved: 222};
            expect(service.getAbbreviateLines(pull.linesAdded)).toEqual(111);
            expect(service.getAbbreviateLines(pull.linesRemoved)).toEqual(222);
        });
    });
});
