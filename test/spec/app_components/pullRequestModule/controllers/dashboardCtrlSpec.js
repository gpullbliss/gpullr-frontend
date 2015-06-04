'use strict';

describe('dashboardCtrl', function () {
    var controller,
        pullRequestService,
        userSettingsService,
        pullRequests,
        user,
        reqPayload,
        $interval,
        $q,
        $scope,
        $rootScope;

    beforeEach(function () {
        module('pullRequestModule');
        module('angularMoment');

        inject(function (_PullRequestService_, _userSettingsService_, $controller, _$interval_, _$rootScope_, _$q_) {
            pullRequestService = _PullRequestService_;
            userSettingsService = _userSettingsService_;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $q = _$q_;

            pullRequests = [{id: 123}];

            reqPayload = {orderOptionDto: 'DESC'};
            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: reqPayload};
            $rootScope.user = user;

            spyOn(pullRequestService, 'getPullRequests').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(pullRequests);
                return deferred.promise;
            });

            controller = $controller('dashboardCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                pullRequestService: pullRequestService,
                userSettingsService: userSettingsService
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
