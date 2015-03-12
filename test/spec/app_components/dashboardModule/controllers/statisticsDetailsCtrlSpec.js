'use strict';

describe('statisticsDetailsCtrl', function () {
   var controller,
       $scope,
       rankingList,
       userService,
       state,
       testPeriod,
       $q;
       
   beforeEach(function () {
      module('dashboardModule');
      module('gpullr');
      module('appTemplates');

      inject(function ($controller, _$rootScope_, _$state_, _userService_, _$q_) {
          $scope = _$rootScope_.$new();
          userService = _userService_;
          state = _$state_;
          $q = _$q_;
          
          testPeriod = 'someTestPeriod';
          
          state.current = {data: {period: testPeriod}};
          
          rankingList = [{id: 12345, username: 'testUser', rank: 1, closedCount: 3 }];
         
          spyOn(userService, 'getRankingList').and.callFake(function () {
              var deferred = $q.defer();
                deferred.resolve(rankingList);
                return deferred.promise;
          });

          controller = $controller('statisticsDetailsCtrl', {
             $scope: $scope,
             userService: userService,
             $state: state
          });
          
              
      });
   });
   
   describe('several stats call for rankingListData ', function () {
      
       it('check for stats.today', function () {
           $scope.$digest();
           
           expect(userService.getRankingList).toHaveBeenCalledWith(testPeriod);
           expect($scope.rankingList).toEqual(rankingList);
       });
   });
});