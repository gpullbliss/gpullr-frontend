'use strict';

describe('statisticsCtrl', function () {
    var controller,
        $scope,
        tabs;

    beforeEach(function () {
        module('dashboardModule');
        module('angularMoment');

        inject(function ($controller, _$rootScope_) {
            $scope = _$rootScope_.$new();

            tabs = [
                {state: 'stats.today', title: 'ranking.tabs.day'},
                {state: 'stats.last_7_days', title: 'ranking.tabs.week'},
                {state: 'stats.last_30_days', title: 'ranking.tabs.month'},
                {state: 'stats.all_time', title: 'ranking.tabs.allTime'}
            ];

            controller = $controller('statisticsCtrl', {
                $scope: $scope
            });
        });
    });

    describe('initial stats test', function () {
        it('sets tabs on $scope', function () {
            var tabsCount = 4;

            expect($scope.tabs.length).toEqual(tabsCount);

            for (var i = 0; i < tabsCount; i++) {
                expect($scope.tabs[i]).toEqual(tabs[i]);
            }
        });
    });
});
