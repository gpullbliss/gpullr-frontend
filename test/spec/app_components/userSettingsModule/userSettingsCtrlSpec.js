'use strict';

describe('userSettingsCtrl', function () {
    var controller,
        $scope,
        $state,
        repoService,
        user,
        userSettingsService,
        userService;

    beforeEach(function () {
        module('userSettingsModule');

        inject(function (_pullRequestService_, _userSettingsService_, $controller) {
            userSettingsService = _userSettingsService_;
            $scope = $rootScope.$new();

            var reqPayload = {
                id: 1,
                orderOptionDto: "DESC",
                repoBlackList: [
                    1, 4, 5
                ]
            };
            user = {id: 12345, username: 'testUser', avatarUrl: 'http://www.jira.de', userSettingsDto: reqPayload};
            $rootScope.user = user;

            var pullRequests = [{id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}, {id: 6}];

            spyOn(pullRequestService, 'getPullRequests').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(pullRequests);
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
        it('', function () { });

        it('', function () { });

        it('', function () { });

    });
});
