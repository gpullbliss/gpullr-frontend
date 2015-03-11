'use strict';

angular.module('dashboardModule')
       .controller('statisticsCtrl', ['$scope', 'userService', function($scope, userService) {
       var defaultTabs = [
                    {qp: 'today', title: 'Day', selected: 'active'},
                    {qp: 'last_7_days', title: 'Week', selected: ''},
                    {qp: 'last_30_days', title: 'Month', selected: ''},
                    {qp: 'all_time', title: 'All time', selected: ''}
                ];
                
        $scope.getScopedRankingList = function (selectedTab) {
                    getScopedRankingList(selectedTab);
        };
        
        var getScopedRankingList = function (selectedTab) {
            console.log(selectedTab);
            angular.forEach(defaultTabs, function (tab) {
               if (tab.qp === selectedTab.qp) {
                   tab.selected='active';
               } else {
                   tab.selected='';
               }
            });
            $scope.tabs = defaultTabs;
            $scope.rankingList = userService.getRankingList(selectedTab.qp).items;
        };
        
        getScopedRankingList(defaultTabs[0]);
        
       }]);