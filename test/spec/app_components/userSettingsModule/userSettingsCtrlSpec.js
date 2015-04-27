'use strict';

describe('userSettingsCtrl', function () {
    var controller,
        scope,
        state,
        timeout,
        filter,
        repoService,
        user,
        q,
        userSettingsService,
        userService;

    beforeEach(function () {
        module('userSettingsModule');
        module('loginModule');

        inject(function (_repoService_, _userSettingsService_, $controller, _$q_, _$rootScope_, _userService_, _$filter_, _$timeout_) {
            userSettingsService = _userSettingsService_;
            repoService = _repoService_;
            userService = _userService_;
            q = _$q_;
            scope = _$rootScope_.$new();
            timeout = _$timeout_;
            filter = _$filter_('filter');

            _$rootScope_.user = user;

            var userSettingsDto = {
                id: 1,
                orderOptionDto: 'DESC',
                repoBlackList: [1, 4, 5]
            };

            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: userSettingsDto};

            var repositories = [
                {id: 1, name: 'ABC'}, {id: 2, name: 'BCD'}, {id: 3, name: 'CDE'},
                {id: 4, name: 'FGH'}, {id: 5, name: 'HIJ'}, {id: 6, name: 'XYZ'}];

            spyOn(repoService, 'getRepoList').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve(repositories);
                return deferred.promise;
            });

            spyOn(userService, 'getCurrentUser').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve(user);
                return deferred.promise;
            });

            spyOn(userSettingsService, 'persistUserSettings').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            spyOn(userService, 'getLanguages').and.callFake(function () {
                var deferred = q.defer();
                deferred.resolve();
                return deferred.promise;
            });

            controller = $controller('userSettingsCtrl', {
                $scope: scope,
                $state: state,
                repoService: repoService,
                userSettingsService: userSettingsService,
                userService: userService
            });
        });
    });

    describe('user settings controller', function () {
        it('calls getRepoList and verify results count', function () {
            scope.$digest();
            expect(userService.getCurrentUser).toHaveBeenCalled();
            expect(repoService.getRepoList).toHaveBeenCalled();
            expect(scope.filteredRepos.length).toEqual(6);
        });

        it('blacklisted filteredRepos are unchecked in the list', function () {
            scope.$digest();

            // blacklisting ids: 1, 4, 5
            expect(
                scope.filteredRepos.map(function (o) {
                    var res = {};
                    res[o.id] = o.checked;
                    return res;
                })
            ).toEqual(
                [
                    {1: false},
                    {2: true},
                    {3: true},
                    {4: false},
                    {5: false},
                    {6: true}
                ]
            );

            // same as....

            expect(scope.filteredRepos[0].id).toEqual(1);
            expect(scope.filteredRepos[0].checked).toBeFalsy();

            expect(scope.filteredRepos[1].id).toEqual(2);
            expect(scope.filteredRepos[1].checked).toBeTruthy();

            expect(scope.filteredRepos[2].id).toEqual(3);
            expect(scope.filteredRepos[2].checked).toBeTruthy();

            expect(scope.filteredRepos[3].id).toEqual(4);
            expect(scope.filteredRepos[3].checked).toBeFalsy();

            expect(scope.filteredRepos[4].id).toEqual(5);
            expect(scope.filteredRepos[4].checked).toBeFalsy();

            expect(scope.filteredRepos[5].id).toEqual(6);
            expect(scope.filteredRepos[5].checked).toBeTruthy();
        });

        it('should send an empty list of blacklisted ids to the backend', function () {
            scope.$digest();
            scope.checkAll();

            expect(scope.filteredRepos[0].id).toEqual(1);
            expect(scope.filteredRepos[0].checked).toBeTruthy();

            expect(scope.filteredRepos[1].id).toEqual(2);
            expect(scope.filteredRepos[1].checked).toBeTruthy();

            expect(scope.filteredRepos[2].id).toEqual(3);
            expect(scope.filteredRepos[2].checked).toBeTruthy();

            expect(scope.filteredRepos[3].id).toEqual(4);
            expect(scope.filteredRepos[3].checked).toBeTruthy();

            expect(scope.filteredRepos[4].id).toEqual(5);
            expect(scope.filteredRepos[4].checked).toBeTruthy();

            expect(scope.filteredRepos[5].id).toEqual(6);
            expect(scope.filteredRepos[5].checked).toBeTruthy();

            scope.saveBlacklist();

            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(0);
        });

        it('should send a fully populated list of (blacklisted) ids to the backend', function () {
            scope.$digest();
            scope.uncheckAll();

            expect(scope.filteredRepos[0].id).toEqual(1);
            expect(scope.filteredRepos[0].checked).toBeFalsy();

            expect(scope.filteredRepos[1].id).toEqual(2);
            expect(scope.filteredRepos[1].checked).toBeFalsy();

            expect(scope.filteredRepos[2].id).toEqual(3);
            expect(scope.filteredRepos[2].checked).toBeFalsy();

            expect(scope.filteredRepos[3].id).toEqual(4);
            expect(scope.filteredRepos[3].checked).toBeFalsy();

            expect(scope.filteredRepos[4].id).toEqual(5);
            expect(scope.filteredRepos[4].checked).toBeFalsy();

            expect(scope.filteredRepos[5].id).toEqual(6);
            expect(scope.filteredRepos[5].checked).toBeFalsy();

            scope.saveBlacklist();

            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(6);
            expect(user.userSettingsDto.repoBlackList).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('should send a fully populated list of (blacklisted) ids to the backend', function () {
            scope.$digest();

            scope.checkAll();
            scope.saveBlacklist();
            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(0);
            expect(user.userSettingsDto.repoBlackList).toEqual([]);

            scope.uncheckAll();
            scope.saveBlacklist();
            expect(userSettingsService.persistUserSettings).toHaveBeenCalled();
            expect(user.userSettingsDto.repoBlackList.length).toBe(6);
            expect(user.userSettingsDto.repoBlackList).toEqual([1, 2, 3, 4, 5, 6]);
        });

        it('should list all repositories when the search query is empty', function () {
            timeout.flush();

            expect(scope.filteredRepos.length).toEqual(6);
        });

        it('should list only the repositories whose name match the search query', function () {
            scope.searchText = 'A';
            scope.$digest();
            timeout.flush();
            expect(scope.filteredRepos.length).toEqual(1);
            expect(scope.filteredRepos[0].id).toEqual(1);

            scope.searchText = 'C';
            scope.$digest();
            timeout.flush();
            expect(scope.filteredRepos.length).toEqual(3);
            expect(scope.filteredRepos.map(function (o) {
                return o.id;
            })).toEqual([1, 2, 3]);

            scope.searchText = 'X';
            scope.$digest();
            timeout.flush();
            expect(scope.filteredRepos.length).toEqual(1);
            expect(scope.filteredRepos[0].id).toEqual(6);

        });
    });
});
