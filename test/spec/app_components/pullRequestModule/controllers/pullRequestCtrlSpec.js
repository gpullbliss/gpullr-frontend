'use strict';

describe('pullRequestCtrl', function () {

    var $scope,
        userService,
        pullRequestService,
        pullRequestCssClassService,
        controller;

    // test data
    var currentUser = {
            id: 1,
            username: 'me'
        },
        prNotAssignedNoElders = {
            'id': 1,
            'title': 'not assigned and no elder pull requests',
            'createdAt': '2015-06-01T12:32:20Z',
            'status': 'OPEN',
            'assignee': null,
            'elders': []
        },
        prNotAssignedWithElders = {
            'id': 2,
            'title': 'not assigned butno elder pull requests exist',
            'createdAt': '2015-06-01T12:32:20Z',
            'status': 'OPEN',
            'assignee': null,
            'elders': [prNotAssignedNoElders]
        },
        prAssignedToMe = {
            'id': 1,
            'title': 'not assigned and no elder pull requests',
            'createdAt': '2015-06-01T12:32:20Z',
            'status': 'OPEN',
            'assignee': currentUser,
            'elders': []
        },
        prAssignedToSomebody = {
            'id': 1,
            'title': 'not assigned and no elder pull requests',
            'createdAt': '2015-06-01T12:32:20Z',
            'status': 'OPEN',
            'assignee': {
                'id': 2,
                'username': 'someBodyElse'
            },
            'elders': []
        };

    beforeEach(function () {
        module('angularMoment');
        module('pullRequestModule');

        inject(function ($controller, _$rootScope_, _userService_, _PullRequestService_, _PullRequestCssClassService_) {
            _$rootScope_.user = currentUser;

            $scope = _$rootScope_.$new();
            userService = _userService_;
            pullRequestService = _PullRequestService_;
            pullRequestCssClassService = _PullRequestCssClassService_;

            spyOn(pullRequestService, 'assignPullRequest').and.callFake(function () {
            });
            spyOn(pullRequestService, 'unassignPullRequest').and.callFake(function () {
            });

            controller = $controller('pullRequestCtrl', {
                $scope: $scope,
                userService: userService,
                pullRequestService: pullRequestService,
                pullRequestCssClassService: pullRequestCssClassService
            });
        });
    });

    describe('binds service methods', function () {

        it('binds userService#getName', function () {
            expect($scope.getName).toBeDefined();
        });

        it('binds pullRequestCssClassService#getColorClassDependingOnAge', function () {
            expect($scope.getColorClassDependingOnAge).toBeDefined();
        });

        it('binds pullRequestService#getAbbreviateLines', function () {
            expect($scope.getAbbreviateLines).toBeDefined();
        });

    });

    describe('determine assignment action', function () {

        it('assign to me', function () {
            $scope.assignmentAction(prNotAssignedNoElders);

            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(prNotAssignedNoElders.id);
        });

        it('there are elder pull requests', function () {
            $scope.assignmentAction(prNotAssignedWithElders);

            expect($scope.selectedPullRequest).toEqual(prNotAssignedWithElders);
            expect($scope.elderPullRequests).toEqual(prNotAssignedWithElders.elders);
        });

        it('pull request is assigned to me', function () {
            $scope.assignmentAction(prAssignedToMe);

            expect(pullRequestService.unassignPullRequest).toHaveBeenCalledWith(prAssignedToMe.id);
        });

        it('pull request assigned to somebody else', function () {
            $scope.assignmentAction(prAssignedToSomebody);

            expect($scope.selectedPullRequest).toEqual(prAssignedToSomebody);
        });

    });

    describe('getAssignmentStyle', function () {

        it('no assignee and no elder pull request', function () {

        });

        it('no assignee but elder pull requests exist', function () {

        });

        it('pull request already assigned to myself', function () {

        });

        it('pull request assigned to somebody else', function () {

        });

    });

});