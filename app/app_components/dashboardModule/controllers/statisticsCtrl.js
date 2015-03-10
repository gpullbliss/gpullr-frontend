'use strict';

angular.module('dashboardModule')
       .controller('statisticsCtrl', ['$scope', 'userService', function($scope, userService) {
       var defaultTabs = [
                    {id: 1, qp: 'today', title: 'Day', selected: 'active'},
                    {id: 2, qp: 'last_7_days', title: 'Week', selected: ''},
                    {id: 3, qp: 'last_30_days', title: 'Month', selected: ''},
                    {id: 4, qp: 'all_time', title: 'All time', selected: ''}
                ];
                
        $scope.getScopedRankingList = function (selectedTab) {
                    getScopedRankingList(selectedTab);
        };
        
        var getScopedRankingList = function (selectedTab) {
            console.log(selectedTab);
            angular.forEach(defaultTabs, function (tab) {
               if (tab.id === selectedTab.id) {
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