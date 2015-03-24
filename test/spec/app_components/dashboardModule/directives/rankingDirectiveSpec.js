'use strict';

describe('directive: ranking', function () {
    var $compile,
        $scope;

    function getDirectiveHtml(rank) {
        var html = '<ranking-list class="block margin hPadding rankingStats" ' +
                   'rankdata="{username: ' + rank.username +
                            ', avatarUrl: ' + rank.avatarUrl +
                            ', rank: ' + rank.rank +
                            ', closedCount: ' + rank.closedCount + '}"></ranking-list>';
        return html;
    }

    beforeEach(function () {
        module('dashboardModule');
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('ranking list', function () {
        it('check for ranking list item', function () {
            var rank = {username: 'testuser', avatarUrl: 'www.jira.de', rank: 1, closedCount: 12},
                element = $compile(getDirectiveHtml(rank))($scope);

            $scope.$digest();

            expect(element.find('img').attr('class')).toContain('avatar');
            expect(element.text()).toContain(rank.rank);
            expect(element.text()).toContain(rank.closedCount);
        });
    });
});