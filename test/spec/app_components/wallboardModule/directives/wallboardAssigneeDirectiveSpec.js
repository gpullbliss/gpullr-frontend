'use strict';

describe('wallboardPullRequest', function () {
    var $compile,
        $scope,
        PullRequestCssClassService,
        cssColorClass = 'someCssClass';

    function getDirectiveHtml(assignedAt) {
        var html = '<p data-dvb-wallboard-assignee data-pull-request="pullRequest"{';
        if (angular.isString(assignedAt)) {
            html += ', assignedAt: \'' + assignedAt + '\'';
        }
        html += '}"></p>';
        return html;
    }

    beforeEach(function () {
        PullRequestCssClassService = {
            getColorClassDependingOnAge: function () {
            }
        };
        spyOn(PullRequestCssClassService, 'getColorClassDependingOnAge').and.callFake(function (dateTime, prefix) {
            var colorClass = cssColorClass;
            if (prefix) {
                colorClass = prefix + colorClass;
            }
            return colorClass;
        });

        module('wallboardModule', function ($provide) {
            $provide.value('PullRequestCssClassService', PullRequestCssClassService);
        });
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('assigned pull requests', function () {
        it('sets css class for an assigned pull request', function () {
            var assignedAt = '2014-03-03T19:38:10Z',
                element = $compile(getDirectiveHtml(assignedAt))($scope);

            expect(element.hasClass('assignment' + cssColorClass));
        });
    });
});
