'use strict';

describe('pullRequest', function () {
    var $compile,
        $scope,
        userNameService,
        pullRequestCssClassService,
        cssColorClass = 'youngerThan2h';

    function getDirectiveHtml(createdAt) {
        var html = '<section data-dvb-pull-request data-age-property="\'createdAt\'" data-pull-request="{createdAt: ' + createdAt + ',author: {fullName: \'user name\'}}" data-logged-in-user="{}"></section>';
        return html;
    }

    beforeEach(function () {
        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };

        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function () {
            return cssColorClass;
        });

        module('dashboardModule', function ($provide) {
            $provide.value('PullRequestCssClassService', pullRequestCssClassService);
        });
        module('appTemplates');
        module('userSettingsModule');

        inject(function (_$compile_, _$rootScope_, _UserNameService_) {
            $compile = _$compile_;
            userNameService = _UserNameService_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('pull requests', function () {
        it('sets the specified class for a 89 minutes old pull request', function () {
            var createdAt = 89,
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(createdAt);
            expect(element.attr('class')).toContain(cssColorClass);
        });

        it('adds function getName to scope', function () {
            var createdAt = 89,
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(element.isolateScope().getName).toBeDefined();
            expect(element.isolateScope().getName).toBe(userNameService.getName);
        });
    });
});
