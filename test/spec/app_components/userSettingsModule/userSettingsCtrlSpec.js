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

            var userSettingsDto = {
                id: 1,
                orderOptionDto: "DESC",
                repoBlackList: [1, 4, 5]
            };

            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: userSettingsDto};

            var repositories = [
                {id: 1, name: 'repo1'}, {id: 2, name: 'repo2'}, {id: 3, name: 'repo3'},
                {id: 4, name: 'repo4'}, {id: 5, name: 'repo5'}, {id: 6, name: 'repo6'}];

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
            expect(userService.getCurrentUser).toHaveBeenCalled();
            expect(repoService.getRepoList).toHaveBeenCalled();
            expect($scope.repos.length).toEqual(6);
        });

        it('blacklisted repos are unchecked in the list', function () {
            $scope.$digest();

            // blacklisting ids: 1, 4, 5
            expect($scope.repos[0].id).toEqual(1);
            expect($scope.repos[0].checked).toBeFalsy();

            expect($scope.repos[1].id).toEqual(2);
            expect($scope.repos[1].checked).toBeTruthy();

            expect($scope.repos[2].id).toEqual(3);
            expect($scope.repos[2].checked).toBeTruthy();

            expect($scope.repos[3].id).toEqual(4);
            expect($scope.repos[3].checked).toBeFalsy();

            expect($scope.repos[4].id).toEqual(5);
            expect($scope.repos[4].checked).toBeFalsy();

            expect($scope.repos[5].id).toEqual(6);
            expect($scope.repos[5].checked).toBeTruthy();
        });

        it('should send an empty list of blacklisted ids to the backend', function () {
            $scope.$digest();
            $scope.checkAll();

            expect($scope.repos[0].id).toEqual(1);
            expect($scope.repos[0].checked).toBeTruthy();

            expect($scope.repos[1].id).toEqual(2);
            expect($scope.repos[1].checked).toBeTruthy();

            expect($scope.repos[2].id).toEqual(3);
            expect($scope.repos[2].checked).toBeTruthy();

            expect($scope.repos[3].id).toEqual(4);
            expect($scope.repos[3].checked).toBeTruthy();

            expect($scope.repos[4].id).toEqual(5);
            expect($scope.repos[4].checked).toBeTruthy();

            expect($scope.repos[5].id).toEqual(6);
            expect($scope.repos[5].checked).toBeTruthy();

            $scope.saveBlacklist();

            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(0);
        });

        it('should send a fully populated list of (blacklisted) ids to the backend', function () {
            $scope.$digest();
            $scope.uncheckAll();

            expect($scope.repos[0].id).toEqual(1);
            expect($scope.repos[0].checked).toBeFalsy();

            expect($scope.repos[1].id).toEqual(2);
            expect($scope.repos[1].checked).toBeFalsy();

            expect($scope.repos[2].id).toEqual(3);
            expect($scope.repos[2].checked).toBeFalsy();

            expect($scope.repos[3].id).toEqual(4);
            expect($scope.repos[3].checked).toBeFalsy();

            expect($scope.repos[4].id).toEqual(5);
            expect($scope.repos[4].checked).toBeFalsy();

            expect($scope.repos[5].id).toEqual(6);
            expect($scope.repos[5].checked).toBeFalsy();

            $scope.saveBlacklist();

            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(6);
            expect(user.userSettingsDto.repoBlackList).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('should send a fully populated list of (blacklisted) ids to the backend', function () {
            $scope.$digest();

            $scope.checkAll();
            $scope.saveBlacklist();
            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(0);
            expect(user.userSettingsDto.repoBlackList).toEqual([]);

            $scope.uncheckAll();
            $scope.saveBlacklist();
            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(6);
            expect(user.userSettingsDto.repoBlackList).toEqual([1, 2, 3, 4, 5, 6]);
        });

    });
});
