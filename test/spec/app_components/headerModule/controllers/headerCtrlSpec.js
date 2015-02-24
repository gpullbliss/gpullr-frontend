'us strict';

describe('headerCtrl', function () {
    var controller,
        userService,
        user,
        $q,
        $scope;
        
    beforeEach(function () {
       module('headerModule');
       inject(function (_userService_, $controller, $rootScope, _$q_) {
          userService = _userService_;
          $scope = $rootScope.$new();
          $q = _$q_;
          
          user = {id: 1234, username: 'testUser', avatarUrl: 'http://www.jira.de'};
          
          spyOn(userService, 'whoAmI').and.callFake(function () {
             var deferred = $q.defer();
             deferred.resolve(user);
             return deferred.promise;
          });
          
          controller = $controller('headerCtrl', {
              $scope: $scope,
              userService: userService
          });
       });
    });
    
    describe('$scope.user', function () {
       it('is set to the return value of userService.whoAmI() on startup', function () {
          $scope.$digest();
          
          expect($scope.username).toEqual(user.username);
          expect($scope.avatarUrl).toEqual(user.avatarUrl);
       }); 
    });
});