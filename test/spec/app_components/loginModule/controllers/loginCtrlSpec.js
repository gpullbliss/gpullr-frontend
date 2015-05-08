'use strict';

describe('loginCtrl', function () {
    var controller,
        $controller,
        scope,
        $state,
        $cookieStore;

    beforeEach(function () {
        module('loginModule');

        inject(function (_$controller_,
                         _$rootScope_,
                         _$state_,
                         _$cookieStore_) {
            $controller = _$controller_;
            scope = _$rootScope_.$new();
            $state = _$state_;
            $cookieStore = _$cookieStore_;

            spyOn($cookieStore, 'put');

            controller = $controller('loginCtrl', {
                $scope: scope,
                $state: $state,
                $cookieStore: $cookieStore
            });
        });
    });

    describe('whenever the loginCtrl is called', function () {

        it('a random state string is generated', function () {
            scope.$digest();

            expect(scope.state).not.toBeNull();
            expect($cookieStore.put).toHaveBeenCalledWith('state', scope.state);
        });

    });
});
