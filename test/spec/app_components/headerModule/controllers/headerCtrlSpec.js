'use strict';

describe('headerCtrl', function () {
    console.log('headerCtrlSpec');
    var controller,
        userService,
        user,
        $rootScope,
        $state,
        $scope;
        
    beforeEach(function () {
       module('gpullr');
       module('ui.router');
       module('loginModule');
       module('headerModule');
       inject(function (_userService_, $controller, _$rootScope_, _$state_) {
          userService = _userService_;
          $state = _$state_;
          $rootScope = _$rootScope_;
          $scope = $rootScope.$new();
          
          user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};
          
          spyOn(userService, 'whoAmI').and.callFake(function () {
             // will be triggered on startUp - after successful login there will be another whoAmI call which triggers
             // the updateUser event.
              expect(true).toEqual(true);
          });
          
          controller = $controller('headerCtrl', {
              $scope: $scope,
              $rootScope: $rootScope,
              userService: userService
          });
       });
    });
    
    describe('init header', function () {
       it('is set to the return value of userService.whoAmI() on startup', function () {
          expect($scope.userPresent).toEqual(false);
          // mock the successfull whoAmI call triggered by userService.logInUser
          $rootScope.$emit('updateUser', user);
          $scope.$digest();
          
          expect($scope.username).toEqual(user.username);
          expect($scope.avatarUrl).toEqual(user.avatarUrl);
          expect($scope.userPresent).toEqual(true);
       }); 
    });
    
    describe('init header', function () {
       it('changeRequestCount event procceeded', function () {
          expect($scope.countPresent).toEqual(false);
          $rootScope.$emit('changeRequestCount', 44);
          $scope.$digest();
          
          expect($scope.countPresent).toEqual(true);
          expect($scope.requestCount).toEqual(44);
       }); 
    });
});