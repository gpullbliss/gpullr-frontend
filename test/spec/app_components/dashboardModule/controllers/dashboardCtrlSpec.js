'use strict';

describe('dashboardCtrl', function () {

    var controller,
        pullRequestService,
        pullRequests,
        $interval,
        $q,
        $scope;

    beforeEach(function () {
        module('dashboardModule');

        inject(function (_pullRequestService_, $controller, _$interval_, $rootScope, _$q_) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
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
                pullRequestService: pullRequestService
            });
        });
    });

    describe('$scope.pullRequests', function () {

        it('is set to the return value of pullRequestService.getPullRequests() on startup', function () {
            $scope.$digest();

            expect($scope.pullRequests).toEqual(pullRequests);
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

});
