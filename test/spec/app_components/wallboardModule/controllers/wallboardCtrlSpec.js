'use strict';

describe('wallboardCtrl', function () {
    var controller,
        pullRequestService,
        pullRequests,
        assignedPullRequests,
        unassignedPullRequests,
        $interval,
        $rootScope,
        $q,
        $scope,
        $timeout,
        $window;

    beforeEach(function () {
        module('wallboardModule');
        module('dashboardModule');

        inject(function (_pullRequestService_, $controller, _$interval_, _$q_, _$rootScope_, _$timeout_) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $timeout = _$timeout_;

            assignedPullRequests = [{
                id: 456,
                assignee: {
                    username: 'marcelb',
                    avatarUrl: 'https://avatars1.githubusercontent.com/u/308374?v=3'
                }
            }];
            unassignedPullRequests = [{
                id: 123,
                assignee: null
            }];
            pullRequests = unassignedPullRequests.concat(assignedPullRequests);

            spyOn(pullRequestService, 'getPullRequests').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(pullRequests);
                return deferred.promise;
            });

            $window = {location: {reload: jasmine.createSpy()}};

            controller = $controller('wallboardCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                $window: $window,
                pullRequestService: pullRequestService
            });
        });
    });

    describe('$scope.getPullRequests()', function () {
        it('sets unassignedPullRequests and assignedPullRequests on startup', function () {
            $scope.$digest();

            expect($scope.unassignedPullRequests).toEqual(unassignedPullRequests);
            expect($scope.assignedPullRequests).toEqual(assignedPullRequests);
        });
    });

    describe('controller.updatePullRequestsInterval', function () {
        beforeEach(function () {
            spyOn($interval, 'cancel');
        });

        it('calls pullRequestService.getPullRequests() via $interval', function () {
            $scope.$digest();

            expect(pullRequestService.getPullRequests.calls.count()).toEqual(1);

            $interval.flush(60000);

            expect(pullRequestService.getPullRequests.calls.count()).toEqual(2);
        });

        it('is cancelled on $destroy', function () {
            $scope.$broadcast('$destroy');
            $scope.$digest();

            expect($interval.cancel).toHaveBeenCalled();
        });
    });

    describe('reloadApp', function () {
        beforeEach(function () {
            spyOn($timeout, 'cancel');
        });

        it('is called after 24 hours', function () {
            var delayOneDay = 1000 * 60 * 60 * 24;
            expect($window.location.reload.calls.count()).toEqual(0);

            $timeout.flush(delayOneDay - 1);

            expect($window.location.reload.calls.count()).toEqual(0);

            $timeout.flush(delayOneDay);

            expect($window.location.reload.calls.count()).toEqual(1);
            $timeout.verifyNoPendingTasks();
        });

        it('is cancelled on $destroy', function () {
            $scope.$broadcast('$destroy');
            $scope.$digest();

            expect($timeout.cancel).toHaveBeenCalled();
        });
    });
});
