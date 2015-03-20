'use strict';

describe('directive: pullrequest', function () {
    var $compile,
        $scope,
        momentMock = {
            diff: function () {
            }
        };

    function getDirectiveHtml(pr) {
        var html = '<pull-request class="block margin hPadding" prdata="{createdAt: '  + pr.createdAt + '}"></pull-request>';
        return html;
    }

    beforeEach(function () {
        var moment = function () {
            return momentMock;
        };

        spyOn(momentMock, 'diff').and.callFake(function (timestamp) {
            return timestamp;
        });

        module('dashboardModule', function ($provide) {
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

            expect(momentMock.diff).toHaveBeenCalledWith(pr.createdAt, 'minutes');
            expect(element.attr('class')).toContain('youngerThan2h');
        });
    });
});