'use strict';

describe('rankingDirective', function () {
    var $compile,
        $scope;

    function getDirectiveHtml(ranking, user) {
        var html = '<div data-dvb-ranking-list class="rankingStats" rankdata="{rank: ' + ranking.rank + ', closedCount: ' + ranking.closedCount + '}" userdata="{username: ' + user.username + ', avatarUrl: ' + user.avatarUrl + '}"></div>';
        return html;
    }

    beforeEach(function () {
        module('pullRequestModule');
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('ranking list', function () {
        it('check for ranking list item', function () {
            var rank = {rank: 1, closedCount: 12},
                user = {username: 'testuser', avatarUrl: 'www.jira.de'},
                element = $compile(getDirectiveHtml(rank, user))($scope);

            $scope.$digest();

            expect(element.find('img').attr('class')).toContain('avatar');
            expect(element.text()).toContain(rank.rank);
            expect(element.text()).toContain(rank.closedCount);
        });
    });
});