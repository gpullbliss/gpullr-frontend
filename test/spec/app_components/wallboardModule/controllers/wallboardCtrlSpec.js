'use strict';

describe('wallboardCtrl', function () {
    var controller,
        pullRequestService,
        pullRequests,
        assignedPullRequests,
        unassignedPullRequests,
        $interval,
        $q,
        $scope,
        $rootScope;

    beforeEach(function () {
        module('wallboardModule');
        module('gpullr');

        inject(function (_pullRequestService_, $controller, _$interval_, _$rootScope_, _$q_) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $q = _$q_;

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

            controller = $controller('wallboardCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
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
