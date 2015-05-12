'use strict';

describe('loginCtrl', function () {
    var controller,
        $controller,
        scope,
        $state,
        $cookieStore,
        thisEnvConfig;

    beforeEach(function () {
        module('loginModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$state_,
                         _$cookieStore_,
                         envConfig) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $cookieStore = _$cookieStore_;
            thisEnvConfig = envConfig;

            spyOn($cookieStore, 'put');
            envConfig.githubClientId = 'a-client-id';

            controller = $controller('loginCtrl', {
                $scope: scope,
                $state: $state,
                $cookieStore: $cookieStore,
                envConfig: thisEnvConfig
            });
        });
    });

    describe('whenever the loginCtrl is called', function () {

        it('a random state string is generated', function () {
            scope.$digest();

            expect(scope.state).not.toBeNull();
            expect(scope.githubClientId).toEqual(thisEnvConfig.githubClientId);
            expect($cookieStore.put).toHaveBeenCalledWith('state', scope.state);
        });

    });
});
