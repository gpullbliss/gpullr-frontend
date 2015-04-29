'use strict';

describe('assignmentDirectiveController', function () {
    var $compile,
        $scope,
        userNameService,
        pullRequestService,
        element,
        directiveScope;

    function getDirectiveHtml(assigneeId) {
        var assigneeJson = '{}';
        
        if (assigneeId) {
            assigneeJson = '{assignee: {id: ' + assigneeId + ', fullName: \'user name\'}}';
        }

        return '<div data-dvb-assignment data-pull-request="' + assigneeJson + '" data-logged-in-user="{id: 1234}"></div>';
    }
    beforeEach(function () {
        module('userSettingsModule');
        module('dashboardModule');
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_, _PullRequestService_, _UserNameService_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            pullRequestService = _PullRequestService_;
            userNameService = _UserNameService_;
        });
    });

    describe('init', function () {
        it('sets default settings because no assignee given', function () {
            element = $compile(angular.element(getDirectiveHtml()))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('dashboard.pullRequest.assign.toMe');
            expect(directiveScope.assignment).toEqual('assignToMe');
            expect(directiveScope.assignmentStyle).toEqual('');
        });

        it('sets isAssignedToMe because logged in user is assigned', function () {
            element = $compile(angular.element(getDirectiveHtml(1234)))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('dashboard.pullRequest.assign.unassign');
            expect(directiveScope.assignment).toEqual('unassignMe');
            expect(directiveScope.assignmentStyle).toEqual('isAssignedToMe');
        });

        it('sets isAssigned because anyone else is assigned', function () {
            element = $compile(angular.element(getDirectiveHtml(4321)))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('dashboard.pullRequest.assign.toMe');
            expect(directiveScope.assignment).toEqual('confirmAssignToMe');
            expect(directiveScope.assignmentStyle).toEqual('isAssigned');
       }); 
    });
    
    describe('assignmentAction without modal', function () {
        beforeEach(function () {
            spyOn(pullRequestService, 'unassignPullRequest').and.returnValue(true);
            spyOn(pullRequestService, 'assignPullRequest').and.returnValue(true);

            element = $compile(angular.element(getDirectiveHtml()))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();
        });

        it('calls with ACTION_ASSIGN_TO_ME', function () {
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'assignToMe');

            expect(directiveScope.assignmentModal).toEqual('');
            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
        });

        it('calls with ACTION_UNASSIGN_ME', function () {
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'unassignMe');

            expect(directiveScope.assignmentModal).toEqual('');
            expect(pullRequestService.unassignPullRequest).toHaveBeenCalledWith(123);
        });
    });
    
    describe('assignmentAction with modal and confirm assign to me', function () {
        beforeEach(function () {
            spyOn(pullRequestService, 'assignPullRequest').and.returnValue(true);

            element = $compile(angular.element(getDirectiveHtml(4321)))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();
            
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'confirmAssignToMe');

            expect(directiveScope.assignmentModal).toEqual('modal');
            expect(pullRequestService.assignPullRequest).not.toHaveBeenCalled();
        });

        it('assigns the pull request because confirmAssignment was called', function () {
            directiveScope.confirmAssignment();
            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
        });
    });
});
