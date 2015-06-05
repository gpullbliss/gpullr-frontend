'use strict';

describe('githubOauthCtrl', function () {
    var createController,
        $controller,
        scope,
        $state,
        $stateParams,
        $cookies,
        userService,
        notificationService,
        $q;

    notificationService = {
        getNotifications: function () {
        },
        startPolling: function () {
        }
    };

    var cookieState = 'some-state',
        stateDashboard = 'dashboard';

    beforeEach(function () {
        module('userModule');
        module('dashboardModule');
        module('angularMoment');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$state_,
                         _$stateParams_,
                         _$cookies_,
                         _userService_,
                         _$q_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $stateParams = _$stateParams_;
            $cookies = _$cookies_;
            userService = _userService_;
            $q = _$q_;

            $stateParams.code = 'some-github-code';

            spyOn(notificationService, 'getNotifications').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve({});
                return deferred.promise;
            });


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
                    $cookies: $cookies,
                    STATE_DASHBOARD: stateDashboard,
                    notificationService: notificationService
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
        var cookies,
            stateParams,
            controller;

        beforeEach(function () {
            cookies = angular.copy($cookies);
            stateParams = angular.copy($stateParams);
        });

        it('is not set, the errorstate is true', function () {
            spyOn(cookies, 'get');
            spyOn(cookies, 'remove');

            controller = createController({$cookies: cookies});

            scope.$digest();

            expect(cookies.get).toHaveBeenCalled();
            expect(cookies.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeTruthy();
        });

        it('is different to the stateparams state, the errorstate is true', function () {
            spyOn(cookies, 'get').and.returnValue(cookieState);
            spyOn(cookies, 'remove');

            stateParams.state = 'some other state';

            controller = createController({$stateParams: stateParams, $cookies: cookies});

            scope.$digest();

            expect(cookies.get).toHaveBeenCalled();
            expect(cookies.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeTruthy();
        });

        it('is the same as stateparams state, the errorstate is false', function () {
            spyOn(cookies, 'get').and.returnValue(cookieState);
            spyOn(cookies, 'remove');

            stateParams.state = cookieState;

            controller = createController({$stateParams: stateParams, $cookies: cookies});

            scope.$digest();

            expect(cookies.get).toHaveBeenCalled();
            expect(cookies.remove).toHaveBeenCalled();
            expect(scope.errorState).toBeFalsy();
        });
    });


    describe('when the state cookie is ok', function () {
        var cookies,
            stateParams,
            controller;

        beforeEach(function () {
            cookies = angular.copy($cookies);
            spyOn(cookies, 'get').and.returnValue(cookieState);
            spyOn(cookies, 'remove');

            stateParams = angular.copy($stateParams);
            stateParams.state = cookieState;
        });

        it('and the backend authentication went fine', function () {
            controller = createController({$stateParams: stateParams, $cookies: cookies});

            scope.$digest();

            expect(scope.errorState).toBeFalsy();
            expect($state.go).toHaveBeenCalledWith(stateDashboard);
        });

        it('and the backend authentication went wrong', function () {
            stateParams.code = 'just-another-code';

            controller = createController({$stateParams: stateParams, $cookies: cookies});

            scope.$digest();

            expect(scope.errorState).toBeTruthy();
            expect($state.go).not.toHaveBeenCalledWith(stateDashboard);
        });

    });
});
