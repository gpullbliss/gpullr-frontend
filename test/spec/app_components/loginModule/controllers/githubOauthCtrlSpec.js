'use strict';

describe('githubOauthCtrl', function () {
    var createController,
        $controller,
        scope,
        $state,
        $stateParams,
        $cookieStore,
        userService,
        $q;

    var cookieState = 'some-state',
        stateDashboard = 'dashboard';

    beforeEach(function () {
        module('loginModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$state_,
                         _$stateParams_,
                         _$cookieStore_,
                         _userService_,
                         _$q_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $stateParams = _$stateParams_;
            $cookieStore = _$cookieStore_;
            userService = _userService_;
            $q = _$q_;

            $stateParams.code = 'some-github-code';

            spyOn(userService, 'authenticateWithGithubAndLogInUser').and.callFake(function (code) {
                var deferred = $q.defer();
                if (code === $stateParams.code) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
                return deferred.promise;
            });

            spyOn($state, 'go');

            createController = function (controllerParameters) {
                var parameters = {
                    $scope: scope,
                    $state: $state,
                    $stateParams: $stateParams,
                    $cookieStore: $cookieStore,
                    STATE_DASHBOARD: stateDashboard
                };

                for (var parameter in controllerParameters) {
                    if (controllerParameters.hasOwnProperty(parameter)) {
                        parameters[parameter] = controllerParameters[parameter];
                    }
                }
                return $controller('githubOauthCtrl', parameters);
            };
        });
    });

    describe('check the errorState when the state cookie', function () {
        var cookieStore,
            stateParams,
            controller;

        beforeEach(function () {
            cookieStore = angular.copy($cookieStore);
            stateParams = angular.copy($stateParams);
        });

        it('is not set, the errorstate is true', function () {
            spyOn(cookieStore, 'get');
            spyOn(cookieStore, 'remove');

            controller = createController({$cookieStore: cookieStore});

            scope.$digest();

            expect(cookieStore.get).toHaveBeenCalled();
            expect(cookieStore.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeTruthy();
        });

        it('is different to the stateparams state, the errorstate is true', function () {
            spyOn(cookieStore, 'get').and.returnValue(cookieState);
            spyOn(cookieStore, 'remove');

            stateParams.state = 'some other state';

            controller = createController({$stateParams: stateParams, $cookieStore: cookieStore});

            scope.$digest();

            expect(cookieStore.get).toHaveBeenCalled();
            expect(cookieStore.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeTruthy();
        });

        it('is the same like stateparams state, the errorstate is false', function () {
            spyOn(cookieStore, 'get').and.returnValue(cookieState);
            spyOn(cookieStore, 'remove');

            stateParams.state = cookieState;

            controller = createController({$stateParams: stateParams, $cookieStore: cookieStore});

            scope.$digest();

            expect(cookieStore.get).toHaveBeenCalled();
            expect(cookieStore.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeFalsy();
        });
    });


    describe('when the state cookie is ok', function () {
        var cookieStore,
            stateParams,
            controller;

        beforeEach(function () {
            cookieStore = angular.copy($cookieStore);
            spyOn(cookieStore, 'get').and.returnValue(cookieState);
            spyOn(cookieStore, 'remove');

            stateParams = angular.copy($stateParams);
            stateParams.state = cookieState;
        });

        it('and the backend authentication went fine', function () {
            controller = createController({$stateParams: stateParams, $cookieStore: cookieStore});

            scope.$digest();

            expect(scope.errorState).toBeFalsy();
            expect($state.go).toHaveBeenCalledWith(stateDashboard);
        });

        it('and the backend authentication went wrong', function () {
            stateParams.code = 'just-another-code';

            controller = createController({$stateParams: stateParams, $cookieStore: cookieStore});

            scope.$digest();

            expect(scope.errorState).toBeTruthy();
            expect($state.go).not.toHaveBeenCalledWith(stateDashboard);
        });

    });
});
