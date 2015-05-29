'use strict';

describe('statisticsDetailsCtrl', function () {
    var controller,
        $scope,
        rankingList,
        statisticsService,
        state,
        testPeriod,
        $q;

    beforeEach(function () {
        module('dashboardModule');

        inject(function ($controller, _$rootScope_, _$state_, _statisticsService_, _$q_) {
            $scope = _$rootScope_.$new();
            statisticsService = _statisticsService_;
            state = _$state_;
            $q = _$q_;

            testPeriod = 'someTestPeriod';

            state.current = {data: {period: testPeriod}};

            rankingList = [
                {rank: 1, closedCount: 3, user: {username: 'testUser2'}},
                {rank: 1, closedCount: 2, user: {username: 'testUser3'}},

                {rank: 2, closedCount: 5, user: {username: 'testUser4'}},

                {rank: 3, closedCount: 1, user: {username: 'testUser5'}},
                {rank: 3, closedCount: 1, user: {username: 'testUser6'}},

                {rank: 4, closedCount: 9, user: {username: 'testUser7'}}
            ];

            spyOn(statisticsService, 'getRankingList').and.callFake(function () {
                var deferred = $q.defer();
                deferred.resolve(rankingList);
                return deferred.promise;
            });

            controller = $controller('statisticsDetailsCtrl', {
                $scope: $scope,
                statisticsService: statisticsService,
                $state: state
            });


        });
    });

    describe('several stats call for rankingListData ', function () {
        it('check for stats.today', function () {
            $scope.$digest();
            expect(statisticsService.getRankingList).toHaveBeenCalledWith(testPeriod);
            expect($scope.rankingList).toEqual(rankingList);
        });
    });

    describe('podium', function () {
        it('... filled properly', function () {
            $scope.$digest();
            expect($scope.podium['1']).toEqual( [ {username: 'testUser2'}, {username: 'testUser3'}] );
            expect($scope.podium['2']).toEqual( [ {username: 'testUser4'}] );
            expect($scope.podium['3']).toEqual( [ {username: 'testUser5'}, {username: 'testUser6'}] );
            expect($scope.podium['4']).toBeUndefined();
        });
    });
});
