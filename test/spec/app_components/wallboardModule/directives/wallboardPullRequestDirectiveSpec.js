'use strict';

describe('wallboardPullRequest', function () {
    var $compile,
        $scope,
        pullRequestCssClassService,
        cssColorClass = 'someCssClass';

    function getDirectiveHtml(createdAt, assignedAt) {
        var html = '<section data-dvb-wallboard-pull-request data-pull-request="{createdAt: \'' + createdAt + '\'';
        if (angular.isString(assignedAt)) {
            html += ', assignedAt: \'' + assignedAt + '\', assignee: {}';
        }
        html += '}"></section>';
        return html;
    }

    beforeEach(function () {
        pullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };
        spyOn(pullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function (dateTime, prefix) {
            var colorClass = cssColorClass;
            if (prefix) {
                colorClass = prefix + colorClass;
            }
            return colorClass;
        });

        module('wallboardModule', function ($provide) {
            $provide.value('pullRequestCssClassService', pullRequestCssClassService);
        });
        module('appTemplates');

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

            expect(element.attr('class')).toContain(cssColorClass);
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
    });
});
