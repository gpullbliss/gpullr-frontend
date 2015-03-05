'use strict';

describe('directive: pullrequest', function () {
       var testHtml, element, testElem, scope;
       module('angularMoment');
       beforeEach(inject(function ($rootScope, $compile, $httpBackend) {
           scope = $rootScope.$new();
           $httpBackend.when('GET', 'app_components/dashboardModule/views/pullRequest.html').respond('html');
           scope.pr = {author: {
                          username: "testUser", 
                          avatarUrl: "http://www.jira.de/avatarUrl"
                          },
                          url: "http://www.jira.de", 
                          number: 2,
                          title: "testPRTitle",
                          repoName: "testRepoName",
                          createdAt: 12345,
                          status: "OPEN",
                          linesAdded: 42,
                          linesRemoved: 21,
                          filesChanged: "2",
                          assignee: null};
                      
           testHtml = '<span class="avatarWrapper"><img class="avatar" ng-src="{{pr.author.avatarUrl}}"></span>' +
                           '{{pr.author.username}}' + 
                           '<a ng-href="{{pr.url}}" target="_blank">#{{pr.number}} {{pr.title}}</a> ' +
                           '<br>Repo: {{pr.repoName}} | <i class="fa fa-clock-o helpIcon" title="Created"></i>' +
                           ' | Status: {{pr.status}}' +
                           '<i class="fa fa-align-left helpIcon" title="Lines changed"></i>' +
                           '<span class="linesAdded">+{{pr.linesAdded}}</span>' +
                           '<span class="linesRemoved">-{{pr.linesRemoved}}</span>' +
                           '<i class="fa fa-file-o helpIcon" title="Files changed"></i>{{pr.filesChanged}}' +
                           '<a class="assignMe" ng-class="{isAssigned: pr.assignee!==null}" title="Assign myself">' +
                           '<i data-ng-click="assignToMe(pr)" class="fa fa-user-plus"></i>' +
                           '<img class="avatar" ng-if="pr.assignee!==null" ng-src="{{pr.assignee.avatarUrl}}"></a>'
                   ;
           
           testElem = angular.element(testHtml);
           element = $compile(testElem)(scope);
           scope.$digest();
       }));
       
       it('is doch scheiße', function () {
           expect(element.length).toBe(14);
           expect(element.find('img').attr('ng-src')).toBe(scope.pr.author.avatarUrl);
           expect(element.eq(1).text()).toEqual(scope.pr.author.username);
           expect(element.eq(2).attr('ng-href')).toBe(scope.pr.url);
           expect(element.eq(5).text()).toEqual('Repo: ' + scope.pr.repoName + ' | ');
           expect(element.eq(6).attr('title')).toEqual('Created');
           expect(element.eq(7).text()).toEqual(' | Status: ' + scope.pr.status);
           expect(element.eq(8).attr('title')).toEqual('Lines changed');
           expect(element.eq(9).text()).toEqual('+' + scope.pr.linesAdded);
           expect(element.eq(10).text()).toEqual('-' + scope.pr.linesRemoved);
           expect(element.eq(11).attr('title')).toEqual('Files changed');
           expect(element.eq(12).text()).toEqual(scope.pr.filesChanged);
           expect(element.eq(13).attr('title')).toEqual('Assign myself');
           expect(element.eq(13).attr('class')).toEqual('assignMe ng-scope');
           expect(element.eq(13).find('i').attr('data-ng-click')).toEqual('assignToMe(pr)');
           expect(element.eq(13).find('i').attr('class')).toEqual('fa fa-user-plus');
       });
    });