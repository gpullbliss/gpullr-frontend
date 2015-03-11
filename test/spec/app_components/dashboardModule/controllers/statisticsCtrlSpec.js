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
      
       it('check for correct url was called ', function () {
           
       });
   });
});