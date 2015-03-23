'use strict';

describe('wallboardCtrl', function () {
    var controller,
        createController,
        pullRequestService,
        pullRequests,
        assignedPullRequests,
        unassignedPullRequests,
        $interval,
        $rootScope,
        $q,
        $scope,
        $stateParams,
        $timeout,
        $window;

    beforeEach(function () {
        module('wallboardModule');

        inject(function (_pullRequestService_, $controller, _$interval_, _$q_, _$rootScope_, _$stateParams_, _$timeout_) {
            pullRequestService = _pullRequestService_;
            $interval = _$interval_;
            $q = _$q_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $stateParams = _$stateParams_;
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

            $window = {location: {reload: jasmine.createSpy('window')}};

            createController = function (controllerParameters) {
                var parameters = {
                    $scope: $scope,
                    $rootScope: $rootScope,
                    $window: $window,
                    pullRequestService: pullRequestService
                };

                for (var parameter in controllerParameters) {
                    if (controllerParameters.hasOwnProperty(parameter)) {
                        parameters[parameter] = controllerParameters[parameter];
                    }
                }
                return $controller('wallboardCtrl', parameters);
            };
            controller = createController();
        });
    });

    describe('$scope.getPullRequests()', function () {
        it('calls pullRequestService.getPullRequests() with empty reposToInclude if repos param not set', function () {
            $scope.$digest();

            expect(pullRequestService.getPullRequests).toHaveBeenCalledWith([]);
        });

        it('sets unassignedPullRequests and assignedPullRequests on startup', function () {
            $scope.$digest();

            expect($scope.unassignedPullRequests).toEqual(unassignedPullRequests);
            expect($scope.assignedPullRequests).toEqual(assignedPullRequests);
        });

        describe('with repos', function () {
            beforeEach(function () {
                var stateParams = angular.copy($stateParams);
                stateParams.repos = 'docbliss;gpullr-frontend';

                controller = createController({$stateParams: stateParams});
            });

            afterEach(function () {
                controller = createController();
            });

            it('calls pullRequestService.getPullRequests() with reposToInclude if repos param is set', function () {
                $scope.$digest();

                expect(pullRequestService.getPullRequests).toHaveBeenCalledWith(['docbliss', 'gpullr-frontend']);
            });
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
