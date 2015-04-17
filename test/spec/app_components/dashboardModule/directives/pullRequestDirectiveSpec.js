'use strict';

describe('pullRequest', function () {
    var $compile,
        $scope,
        PullRequestCssClassService,
        cssColorClass = 'youngerThan2h';

    function getDirectiveHtml(createdAt) {
        var html = '<section class="overflowH" data-dvb-pull-request data-pull-request="{createdAt: ' + createdAt + '}" data-logged-in-user="{}"></section>';
        return html;
    }

    beforeEach(function () {
        PullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };

        spyOn(PullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function () {
            return cssColorClass;
        });

        module('dashboardModule', function ($provide) {
            $provide.value('PullRequestCssClassService', PullRequestCssClassService);
        });
        module('appTemplates');

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

            expect(PullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(createdAt);
            expect(element.attr('class')).toContain(cssColorClass);
        });
    });
});
