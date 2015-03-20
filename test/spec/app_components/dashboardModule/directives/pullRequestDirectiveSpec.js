'use strict';

describe('directive: pullrequest', function () {
    var $compile,
        $scope,
        $cssColorClass = 'youngerThan2h',
        pullRequestCssClassService;

    function getDirectiveHtml(pr) {
        var html = '<pull-request class="block margin hPadding" prdata="{createdAt: '  + pr.createdAt + '}"></pull-request>';
        return html;
    }

    beforeEach(function () {
        module('dashboardModule');
        module('appTemplates');
        
        pullRequestCssClassService = {
             getColorClassDependingOnAge: function () {
             }
        };

        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function () {
            return $cssColorClass;
        });

        module('pullRequestModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('pull requests', function () {
        it('sets the specified class for a 89 minutes old pull request', function () {
            var pr = {createdAt: 89},
                element = $compile(getDirectiveHtml(pr))($scope);

            $scope.$digest();

            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(pr.createdAt);
            expect(element.attr('class')).toContain($cssColorClass);
        });
    });
});