'use strict';

describe('dashboardCtrl', function () {
    var controller,
        pullRequestService,
        pullRequests,
        $interval,
        $q,
        $scope,
        $rootScope;

    beforeEach(function () {
        module('dashboardModule');

        inject(function (_pullRequestService_, $controller, _$interval_, _$rootScope_, _$q_) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
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

        it('updatePullRequestsInterval is cancelled on $destroy', function () {
            spyOn($interval, 'cancel');
            $scope.$broadcast('$destroy');
            $scope.$digest();

            expect($interval.cancel).toHaveBeenCalled();
        });

        it('fetches pull requests after changeAssignee event', function () {
            $rootScope.$emit('changeAssignee');
            $scope.$digest();

            expect(pullRequestService.getPullRequests.calls.count()).toEqual(2);
        });
    });
});
