'use strict';

describe('userSettingsCtrl', function () {
    var controller,
        $scope,
        $state,
        repoService,
        user,
        $q,
        userSettingsService,
        userService;

    beforeEach(function () {
        module('userSettingsModule');
        module('loginModule');

        inject(function (_repoService_, _userSettingsService_, $controller, _$q_, _$rootScope_, _userService_) {
            userSettingsService = _userSettingsService_;
            repoService = _repoService_;
            userService = _userService_;
            $q = _$q_;
            $scope = _$rootScope_.$new();

            _$rootScope_.user = user;
            
            var reqPayload = {
                id: 1,
                orderOptionDto: "DESC",
                repoBlackList: [
                    1, 4, 5
                ]
            };
            
            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: reqPayload};

            var repositories = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

            spyOn(repoService, 'getRepoList').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(repositories);
                return deferred.promise;
            });

            spyOn(userService, 'getCurrentUser').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(user);
                return deferred.promise;
            });

            spyOn(userSettingsService, 'persistUserSettings').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            controller = $controller('userSettingsCtrl', {
                $scope: $scope,
                $state: $state,
                repoService: repoService,
                userSettingsService: userSettingsService,
                userService: userService
            });
        });
    });

    describe('user settings page', function () {
        it('calls getRepoList and verify results count', function () {
            $scope.$digest();
            
            expect(repoService.getRepoList).toHaveBeenCalled();
            expect($scope.repos.length).toEqual(6);
        });

        it('', function () { });

        it('', function () { });

    });
});
