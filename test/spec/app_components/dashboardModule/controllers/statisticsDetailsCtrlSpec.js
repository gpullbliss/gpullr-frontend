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
        module('gpullr');
        module('appTemplates');

        inject(function ($controller, _$rootScope_, _$state_, _statisticsService_, _$q_) {
            $scope = _$rootScope_.$new();
            statisticsService = _statisticsService_;
            state = _$state_;
            $q = _$q_;

            testPeriod = 'someTestPeriod';

            state.current = {data: {period: testPeriod}};

            rankingList = [{id: 12345, username: 'testUser', rank: 1, closedCount: 3}];

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
});
