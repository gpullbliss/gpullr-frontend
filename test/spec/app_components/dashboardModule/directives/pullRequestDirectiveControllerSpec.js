'use strict';

describe('pullRequestController', function () {
    var $compile,
        $scope,
        pullRequestCssClassService,
        pullRequestService,
        directiveScope,
        html = '<pull-request class="block margin hPadding" pull-request="{createdAt: 89}"></pull-request>';
        
    beforeEach(function () {
        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };
        
        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function () {
            return 'something';
        });
        
        module('dashboardModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });
        
        module('appTemplates');
        
       inject(function (_$compile_, _$rootScope_, _pullRequestService_) {
          $compile = _$compile_;
          $scope = _$rootScope_.$new();
          pullRequestService = _pullRequestService_;
          
            spyOn(pullRequestService, 'unassignPullRequest').and.callFake(function () {
                console.log('pullRequestService mock unassign');
               return true; 
            });
            
            spyOn(pullRequestService, 'assignPullRequest').and.callFake(function () {
                console.log('pullRequestService mock assign');
               return true; 
            });
            
          var element = $compile(angular.element(html))($scope);
          $scope.$digest();
          directiveScope = element.find('div').scope();
       }); 
    });
    
    it('assignPullRequest without assignee', function () {
       var pr = {id: 123, assignee: null};
       directiveScope.assignToMe(pr);
       
       expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
    });
    
    it('assignPullrequest with set assignee and abort confirmation view', function () {
       var pr = {id: 123, assignee: {id: 123, username: 'testUser'}};
       directiveScope.assignToMe(pr);
       expect(directiveScope.modalShown).toBeTruthy();
       
       directiveScope.abortAssignment();
       expect(pullRequestService.assignPullRequest).not.toHaveBeenCalledWith(123);
       expect(directiveScope.modalShown).not.toBeTruthy();
       
    });
    
    it('assignPullRequest with assignee and confirm', function () {
       var pr = {id: 123, assignee: {id: 123, username: 'testUser'}};
       directiveScope.assignToMe(pr);
       
       expect(directiveScope.modalShown).toBeTruthy();
       
       directiveScope.confirmAssignment();
       expect(pullRequestService.assignPullRequest).toHaveBeenCalledWith(123);
       expect(directiveScope.modalShown).not.toBeTruthy();
    });
    
    it('unassignPullRequest', function () {
       var pr = {id: 123};
       directiveScope.unassignMe(pr);
       
       expect(pullRequestService.unassignPullRequest).toHaveBeenCalledWith(123);
    });
});