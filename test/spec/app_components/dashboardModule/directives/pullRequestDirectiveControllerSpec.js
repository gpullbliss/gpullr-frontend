'use strict';

describe('pullRequestDirectiveController', function () {
    var $compile,
        $scope,
        pullRequestCssClassService,
        pullRequestService,
        directiveScope,
        html = '<article class="dvb-pull-request overflowH" pull-request="{createdAt: 89}" logged-in-user="{}"></article>';

    beforeEach(function () {
        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };
        
        module('dashboardModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });
        
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_, _pullRequestService_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
            pullRequestService = _pullRequestService_;

            spyOn(pullRequestService, 'unassignPullRequest').and.returnValue(true);

            spyOn(pullRequestService, 'assignPullRequest').and.returnValue(true);

            var element = $compile(angular.element(html))($scope);
            $scope.$digest();
            directiveScope = element.isolateScope();
        });
    });

    describe('assignToMe', function () {
        it('calls assignPullRequest without assignee', function () {
            var pr = {id: 123, assignee: null};
            directiveScope.assignToMe(pr);

            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
        });

        it('calls assignPullRequest with set assignee and aborts confirmation view', function () {
            var pr = {id: 123, assignee: {id: 123, username: 'testUser'}};
            directiveScope.assignToMe(pr);
            expect(directiveScope.modalShown).toBeTruthy();

            directiveScope.abortAssignment();
            expect(pullRequestService.assignPullRequest).not.toHaveBeenCalledWith(123);
            expect(directiveScope.modalShown).toBeFalsy();

        });

        it('calls assignPullRequest with assignee and confirms', function () {
            var pr = {id: 123, assignee: {id: 123, username: 'testUser'}};
            directiveScope.assignToMe(pr);

            expect(directiveScope.modalShown).toBeTruthy();

            directiveScope.confirmAssignment();
            expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
            expect(directiveScope.modalShown).toBeFalsy();
        });
    });

    describe('unassignMe', function () {
        it('calls unassignPullRequest when unassignMe is called', function () {
            var pr = {id: 123};
            directiveScope.unassignMe(pr);

            expect(pullRequestService.unassignPullRequest).toHaveBeenCalledWith(123);
        });
    });
});
