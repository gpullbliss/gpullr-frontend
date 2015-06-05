'use strict';

describe('loginCtrl', function () {
    var controller,
        $controller,
        scope,
        $state,
        $cookies,
        thisEnvConfig;

    beforeEach(function () {
        module('userModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$state_,
                         _$cookies_,
                         envConfig) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $cookies = _$cookies_;
            thisEnvConfig = envConfig;

            spyOn($cookies, 'put');
            envConfig.githubClientId = 'a-client-id';

            controller = $controller('loginCtrl', {
                $scope: scope,
                $state: $state,
                $cookies: $cookies,
                envConfig: thisEnvConfig
            });
        });
    });

    describe('whenever the loginCtrl is called', function () {

        it('a random state string is generated', function () {
            scope.$digest();

            expect(scope.state).not.toBeNull();
            expect(scope.githubClientId).toEqual(thisEnvConfig.githubClientId);
            expect($cookies.put).toHaveBeenCalledWith('state', scope.state);
        });

    });
});
