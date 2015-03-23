'use strict';

describe('pullRequest', function () {
    var $compile,
        $scope,
        $cssColorClass = 'youngerThan2h',
        pullRequestCssClassService;

    function getDirectiveHtml(createdAt) {
        var html = '<pull-request class="block margin hPadding" pull-request="{createdAt: ' + createdAt + '}"></pull-request>';
        return html;
    }

    beforeEach(function () {
        module('dashboardModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });
        module('appTemplates');
        
        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };

        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function () {
            return $cssColorClass;
        });

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('pull requests', function () {
        it('sets the specified class for a 89 minutes old pull request', function () {
            var createdAt = 89,
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(createdAt);
            expect(element.attr('class')).toContain($cssColorClass);
        });
    });
});
