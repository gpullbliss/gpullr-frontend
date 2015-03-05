'use strict';

describe('dashboardCtrl', function () {

    var controller,
        pullRequestService,
        pullRequests,
        $interval,
        $q,
        $scope,
        errorResponseHandler,
        $rootScope;

    beforeEach(function () {
        module('dashboardModule');
        module('gpullr');

        inject(function (_pullRequestService_, $controller, _$interval_, _$rootScope_, _$q_, ErrorResponseHandler) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
            errorResponseHandler = ErrorResponseHandler;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $q = _$q_;

            pullRequests = [{id: 123}];

            spyOn(pullRequestService, 'getPullRequests').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(pullRequests);
                return deferred.promise;
            });

            controller = $controller('dashboardCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                pullRequestService: pullRequestService
            });
        });
    });

    describe('$scope.pullRequests', function () {
        it('is set to the return value of pullRequestService.getPullRequests() and fire changeRequestCount event on startup', function () {
           spyOn($rootScope, '$emit');
           $scope.$digest();

           expect($scope.pullRequests).toEqual(pullRequests);
           expect($rootScope.$emit).toHaveBeenCalledWith('changeRequestCount', 1);
        });
        
        it('calls pullRequestService.getPullRequests() via $timeout', function () {
            $scope.$digest();

            expect(pullRequestService.getPullRequests.calls.count()).toEqual(1);

            $interval.flush(60000);

            expect(pullRequestService.getPullRequests.calls.count()).toEqual(2);
        });
    });

    describe('controller.updatePullRequestsInterval', function () {
        beforeEach(function () {
            spyOn($interval, 'cancel');
        });

        it('is cancelled on $destroy', function () {
            $scope.$broadcast('$destroy');
            $scope.$digest();

            expect($interval.cancel).toHaveBeenCalled();
        });
    });
    
    describe(' controller catch changeAssignee event', function () {
        
        it('catch event', function () {
           $rootScope.$emit('changeAssignee');
           $scope.$digest(); 
           
           expect(pullRequestService.getPullRequests.calls.count()).toEqual(2);
        });
    });
});
