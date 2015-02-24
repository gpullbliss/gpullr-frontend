'use strict';

describe('userService', function () {
   var service,
       $httpBackend;
       
   beforeEach(function () {
       module('gpullr');
       inject(function (userService, _$httpBackend_) {
          $httpBackend = _$httpBackend_;
          service = userService;
       });
   });
   
   afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
   });
   
   describe('whoAmI', function () {
      var endpointUrl = '/api/users/me',
          responseData = 
          { id: 12345,
            username: 'testUser',
            avatarUrl: 'http://www.jira.de'};
        
      it('calls correct URL', function () {
          $httpBackend.expectGET(endpointUrl).respond(200, '');
          
          expect(service.whoAmI()).toBeDefined();

          $httpBackend.flush(); 
      });
      
      it('returns data', function () {
         var result = null;
         $httpBackend.expectGET(endpointUrl).respond(200, responseData);
         
         service.whoAmI().then(function (user) {
            result = user; 
         });
         
         $httpBackend.flush();
         expect(result).toEqual(responseData);
      });
   });
});