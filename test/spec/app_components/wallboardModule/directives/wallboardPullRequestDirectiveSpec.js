'use strict';

describe('wallboardPullRequest', function () {
    var $compile,
        $scope,
        pullRequestCssClassService,
        cssClass = 'someCssClass';

    function getDirectiveHtml(createdAt, assignedAt) {
        var html = '<wallboard-pull-request pull-request="{createdAt: \'' + createdAt + '\'';
        if (angular.isString(assignedAt)) {
            html += ', assignedAt: \'' + assignedAt + '\'';
        }
        html += '}"></wallboard-pull-request>';
        return html;
    }

    beforeEach(function () {
        module('wallboardModule');
        module('appTemplates');

        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };
        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function (dateTime, prefix) {
            var colorClass = cssClass;
            if (prefix) {
                colorClass = prefix + colorClass;
            }
            return colorClass;
        });

        module('pullRequestModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();

        });
    });

    describe('unassigned pull requests', function () {
        it('calls getColorClassDependingOnAge with the createdAt attribute of the pull request', function () {
            var createdAt = '2014-03-03T18:58:10Z';

            $compile(getDirectiveHtml(createdAt))($scope);
            $scope.$digest();

            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(createdAt);
            expect(pullRequestCssClassService.getColorClassDependingOnAge.calls.count()).toEqual(1);
        });

        it('sets one css class for an unassigned pull request', function () {
            var createdAt = '2014-03-03T18:58:10Z',
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(element.attr('class')).toContain(cssClass);
            expect(element.attr('class')).not.toContain('assignment');
        });
    });

    describe('assigned pull requests', function () {
        it('calls getColorClassDependingOnAge with the createdAt AND assignedAt attribute of the pull request', function () {
            var createdAt = '2014-03-03T18:58:10Z',
                assignedAt = '2014-03-03T19:38:10Z';

            $compile(getDirectiveHtml(createdAt, assignedAt))($scope);
            $scope.$digest();

            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(createdAt);
            expect(pullRequestCssClassService.getColorClassDependingOnAge).toHaveBeenCalledWith(assignedAt, 'assignment');
            expect(pullRequestCssClassService.getColorClassDependingOnAge.calls.count()).toEqual(2);
        });

        it('sets two css classes for an assigned pull request', function () {
            var createdAt = '2014-03-03T18:58:10Z',
                assignedAt = '2014-03-03T19:38:10Z',
                element = $compile(getDirectiveHtml(createdAt, assignedAt))($scope);

            $scope.$digest();

            expect(element.attr('class')).toContain(cssClass);
            expect(element.attr('class')).toContain('assignment' + cssClass);
        });
    });
});
