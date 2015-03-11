'use strict';

describe('statisticsCtrl', function () {
   var controller,
       userService,
       rankingList,
       $scope,
       $q;
       
   beforeEach(function () {
      module('dashboardModule');
      module('gpullr');

      inject(function (_userService_, $controller, _$rootScope_, _$q_) {
          userService = _userService_;
          $scope = _$rootScope_.$new();
          $q = _$q_;
          
          rankingList = [{id: 123, username: 'testUser', closedPR: 42, avatarUrl: 'http://www.jira.de', rank: 1},
                         {id: 321, username: 'testUser2', closedPR: 41, avatarUrl: 'http://www.jira.de', rank: 2}];
                     rankingList = 'helloWolrd';

          spyOn(userService, 'getRankingList').and.callFake(function () {
              var deferred = $q.defer();
              deferred.resolve(rankingList);
              return deferred.promise;
          });
          
          controller = $controller('statisticsCtrl', {
             $scope: $scope,
             userService: userService
          });
      });
   });
   
   describe('statisticsCtrl getRankinglist test', function () {
      
       it('check for correct inital call for rankingList with "today" ', function () {
           $scope.$digest();
           
           expect(userService.getRankingList).toHaveBeenCalledWith('today');
       });
       
       it('check for initial tabs', function () {
           $scope.$digest();
           
           expect($scope.tabs.length).toEqual(4);
           expect($scope.tabs[0].qp).toEqual('today');
           expect($scope.tabs[0].selected).toEqual('active');
           expect($scope.tabs[1].qp).toEqual('last_7_days');
           expect($scope.tabs[2].qp).toEqual('last_30_days');
           expect($scope.tabs[3].qp).toEqual('all_time');
       });
       
       it('trigger getRankingList with each possible param', function () {
           $scope.getScopedRankingList($scope.tabs[1]);
           expect($scope.tabs[1].selected).toEqual('active');
           expect(userService.getRankingList).toHaveBeenCalledWith('last_7_days');
           
           $scope.getScopedRankingList($scope.tabs[2]);
           expect($scope.tabs[2].selected).toEqual('active');
           expect(userService.getRankingList).toHaveBeenCalledWith('last_30_days');
           
           $scope.getScopedRankingList($scope.tabs[3]);
           expect($scope.tabs[3].selected).toEqual('active');
           expect(userService.getRankingList).toHaveBeenCalledWith('all_time');
           
           var fakeTab = {qp: 'foobar', title: 'foobar', selected: ''}
           
           $scope.getScopedRankingList(fakeTab);
           expect(fakeTab.selected).toEqual('');
           expect(userService.getRankingList).not.toHaveBeenCalledWith('foobar');
       });
   });
});