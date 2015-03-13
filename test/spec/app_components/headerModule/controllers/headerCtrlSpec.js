'use strict';

describe('headerCtrl', function () {
    var controller,
        userService,
        user,
        $rootScope,
        $scope;

    beforeEach(function () {
        module('headerModule');
        module('loginModule');

        inject(function (_userService_, $controller, _$rootScope_) {
            userService = _userService_;
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();

            user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};

            spyOn(userService, 'getCurrentUser');

            controller = $controller('headerCtrl', {
                $scope: $scope,
                $rootScope: $rootScope,
                userService: userService,
                STATE_STATS: 'stats',
                STATE_DASHBOARD: 'dashboard'
            });
        });
    });

    describe('$scope.requestCount', function () {
        it('processes changeRequestCount events and sets requestCount', function () {
            $rootScope.$emit('changeRequestCount', 44);
            $scope.$digest();

            expect($scope.requestCount).toEqual(44);
        });
    });

    describe('$scope.user', function () {
        it('calls userService.getCurrentUser()', function () {
            expect(userService.getCurrentUser).toHaveBeenCalled();
        });

        it('processes updateUser events and sets user', function () {
            expect($scope.user).toBeUndefined();

            $rootScope.$emit('updateUser', user);
            $scope.$digest();

            expect($scope.user).toEqual(user);
        });
    });
});
