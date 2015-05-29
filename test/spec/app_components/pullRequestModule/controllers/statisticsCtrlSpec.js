'use strict';

describe('statisticsCtrl', function () {
    var controller,
        $scope,
        tabs,
        $state;

    beforeEach(function () {
        module('dashboardModule');

        inject(function ($controller, _$rootScope_, _$state_) {
            $scope = _$rootScope_.$new();
            $state = _$state_;

            tabs = [
                {state: 'stats.today', title: 'ranking.tabs.day'},
                {state: 'stats.last_7_days', title: 'ranking.tabs.week'},
                {state: 'stats.last_30_days', title: 'ranking.tabs.month'},
                {state: 'stats.all_time', title: 'ranking.tabs.allTime'}
            ];

            spyOn($state, 'go');

            controller = $controller('statisticsCtrl', {
                $scope: $scope,
                $state: $state
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

        it('check for $state.go() to today\'s ranking screen by default', function () {
            $scope.$digest();
            expect($state.go).toHaveBeenCalledWith('stats.today');
        });
    });
});