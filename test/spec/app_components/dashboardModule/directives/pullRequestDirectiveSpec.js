'use strict';

describe('directive: pullrequest', function () {
    var $compile,
        $scope,
        $cssColorClass = 'youngerThan2h',
        pullRequestCssClassServiceMock = {
            getColorClassDependingOnAge: function() {}
        },
        momentMock = {
            diff: function () {
            }
        }
        ;

    function getDirectiveHtml(pr) {
        var html = '<pull-request class="block margin hPadding" prdata="{createdAt: '  + pr.createdAt + '}"></pull-request>';
        return html;
    }

    beforeEach(function () {
        var pullRequestCssClassService = function () {
                return pullRequestCssClassServiceMock;
            },
            moment = function () {
                return momentMock;
            };

        spyOn(momentMock, 'diff').and.callFake(function (timestamp) {
            console.log('momentmock fake call');
            return timestamp; 
        });

        spyOn(pullRequestCssClassServiceMock, 'getColorClassDependingOnAge').and.callFake(function (blbla) {
            console.log(blbla);
            console.log('in getColorCss fake call in test');
            return 'arschloch';
        });

        module('dashboardModule', function ($provide) {
            $provide.value('_pullRequestCssClassService_', pullRequestCssClassService);
            $provide.value('moment', moment);
        });
        
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('pull requests', function () {
        it('sets the class youngerThan2h for a 89 minutes old pull request', function () {
            var pr = {createdAt: 89},
                element = $compile(getDirectiveHtml(pr))($scope);

            $scope.$digest();

            expect(pullRequestCssClassServiceMock.getColorClassDependingOnAge).toHaveBeenCalledWith(89);
            expect(momentMock.diff).toHaveBeenCalledWith(pr.createdAt, 'minutes');
            expect(element.attr('class')).toContain($cssColorClass);
        });
    });
});