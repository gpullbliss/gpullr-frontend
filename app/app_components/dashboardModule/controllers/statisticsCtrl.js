'use strict';

angular.module('dashboardModule')
       .controller('statisticsCtrl', ['$scope', function($scope) {
       //var ranking,
         //  rankingList;
       
       $scope.rankingList = [
                    {id: 12345,
                     rank: 1,
                     closedCount: 32,
                     username: 'pkarstedt',
                     avatarUrl: 'https://avatars.githubusercontent.com/u/1460875?v=3'
                    },
                    {id: 54321,
                     rank: 2,
                     closedCount: 30,
                     username: 'henning',
                     avatarUrl: 'https://avatars.githubusercontent.com/u/1460875?v=3'
                    },
                    {id: 54321,
                     rank: 3,
                     closedCount: 26,
                     username: 'daniel',
                     avatarUrl: 'https://avatars.githubusercontent.com/u/1460875?v=3'
                    },
                    {id: 54331,
                     rank: 4,
                     closedCount: 25,
                     username: 'micha',
                     avatarUrl: 'https://avatars.githubusercontent.com/u/1460875?v=3'
                    },
                    {id: 54321,
                     rank: 5,
                     closedCount: 18,
                     username: 'alex',
                     avatarUrl: 'https://avatars.githubusercontent.com/u/1460875?v=3'
                    }];
       }]);