'use strict';

describe('headerCtrl', function () {
    var controller,
        $controller,
        userService,
        user,
        rootScope,
        scope,
        interval,
        UserNameService,
        notificationService,
        notificationDropdownItemService,
        httpBackend;
    ;

    beforeEach(function () {
        module('headerModule'   );

        inject(function (_$controller_,
                         _$rootScope_,
                         _$interval_,
                         _userService_,
                         _UserNameService_,
                         _notificationService_,
                         _notificationDropdownItemService_,
                         _$httpBackend_
        ) {

            $controller = _$controller_;
            userService = _userService_;
            rootScope = _$rootScope_;
            scope = rootScope.$new();
            interval = _$interval_;
            UserNameService = _UserNameService_;
            notificationService = _notificationService_;
            notificationDropdownItemService = _notificationDropdownItemService_;
            httpBackend = _$httpBackend_;

            user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};

            spyOn(userService, 'getCurrentUser');


            controller = $controller('headerCtrl', {
                $scope: scope,
                $rootScope: rootScope,
                userService: userService,
                UserNameService: UserNameService,
                notificationService: notificationService,
                notificationDropdownItemService: notificationDropdownItemService,
                STATE_STATS: 'stats',
                STATE_DASHBOARD: 'dashboard',
                STATE_REPO_FILTER: 'repoFilter'
            });
        });
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('$scope.requestCount', function () {
        it('processes changeRequestCount events and sets requestCount', function () {

            rootScope.$emit('changeRequestCount', 44);
            scope.$digest();
            $httpBackend.flush();

            expect(notificationService.getNotifications()).toHaveBeenCalled();
            expect($scope.requestCount).toEqual(44);
        });
    });

});
