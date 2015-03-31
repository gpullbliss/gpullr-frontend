'use strict';

describe('assignmentDirectiveController', function () {
    var $compile,
        $scope,
        pullRequestService,
        element,
        directiveScope;

    function getDirectiveHtml(assigneeId) {
        var assigneeJson = '{}';
        
        if (assigneeId) {
            assigneeJson = '{assignee: {id: ' + assigneeId + '}}';
        }

        return '<div data-dvb-assignment data-pull-request="' + assigneeJson + '" data-logged-in-user="{id: 1234}"></div>';
    }

    beforeEach(function () {
        module('dashboardModule');
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_, _pullRequestService_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            pullRequestService = _pullRequestService_;
        });
    });
    
    describe('init', function () {
        it('sets default settings because no assignee given', function () {
            element = $compile(angular.element(getDirectiveHtml()))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('Assign myself');
            expect(directiveScope.assignment).toEqual('assignToMe');
            expect(directiveScope.assignmentStyle).toEqual('');
        });

        it('sets isAssignedToMe because logged in user is assigned', function () {
            element = $compile(angular.element(getDirectiveHtml(1234)))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('Unassign myself');
            expect(directiveScope.assignment).toEqual('unassignMe');
            expect(directiveScope.assignmentStyle).toEqual('isAssignedToMe');
        });

        it('sets isAssigned because anyone else is assigned', function () {
            element = $compile(angular.element(getDirectiveHtml(4321)))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();

            expect(directiveScope.assignTitle).toEqual('Assign myself');
            expect(directiveScope.assignment).toEqual('confirmAssignToMe');
            expect(directiveScope.assignmentStyle).toEqual('isAssigned');
       }); 
    });
    
    describe('assignmentAction', function () {
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
            
            expect(directiveScope.modalShown).toBeFalsy();
            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
        });

        it('calls with ACTION_CONFIRM_ASSIGN_TO_ME', function () {
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'confirmAssignToMe');
            
            expect(directiveScope.modalShown).toBeTruthy();
            expect(pullRequestService.assignPullRequest).not.toHaveBeenCalled();
        });

        it('calls with ACTION_UNASSIGN_ME', function () {
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'unassignMe');
            
            expect(directiveScope.modalShown).toBeFalsy();
            expect(pullRequestService.unassignPullRequest).toHaveBeenCalledWith(123);
        });
    });
    
    describe('confirm assign to me', function () {
        beforeEach(function () {
            spyOn(pullRequestService, 'assignPullRequest').and.returnValue(true);

            element = $compile(angular.element(getDirectiveHtml()))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();
            
            var pr = {id: 123};
            directiveScope.assignmentAction(pr, 'confirmAssignToMe');
            
            expect(directiveScope.modalShown).toBeTruthy();
            expect(pullRequestService.assignPullRequest).not.toHaveBeenCalled();
        });

        it('assigns the pull request because confirmAssignment was called', function () {
            directiveScope.confirmAssignment();
            expect(directiveScope.modalShown).toBeFalsy();
            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
        });

        it('does not assign the pull request because abortAssginment was called', function () {
            directiveScope.abortAssignment();
            expect(directiveScope.modalShown).toBeFalsy();
            expect(pullRequestService.assignPullRequest).not.toHaveBeenCalled();
        });
    });
});
