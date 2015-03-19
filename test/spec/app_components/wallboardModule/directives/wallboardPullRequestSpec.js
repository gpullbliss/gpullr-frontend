'use strict';

describe('wallboardPullRequest', function () {
    var $compile,
        $scope,
        momentMock = {
            diff: function () {
            }
        };

    function getDirectiveHtml(createdAt, assignedAt) {
        var html = '<wallboard-pull-request pull-request="{createdAt: ' + createdAt;
        if (angular.isNumber(assignedAt)) {
            html += ', assignedAt: ' + assignedAt;
        }
        html += '}"></wallboard-pull-request>';
        return html;
    }

    beforeEach(function () {
        var moment = function () {
            return momentMock;
        };

        spyOn(momentMock, 'diff').and.callFake(function (timestamp) {
            return timestamp;
        });

        module('wallboardModule', function ($provide) {
            $provide.value('moment', moment);
        });
        module('appTemplates');

        inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $scope = _$rootScope_.$new();
        });
    });

    describe('unassigned pull requests', function () {
        it('calls moment().diff with the createdAt attribute of the pull request', function () {
            var createdAt = 12345;

            $compile(getDirectiveHtml(createdAt))($scope);
            $scope.$digest();

            expect(momentMock.diff).toHaveBeenCalledWith(createdAt, 'minutes');
            expect(momentMock.diff.calls.count()).toEqual(1);
        });

        it('calls moment().diff with the createdAt AND assignedAt attribute of the pull request', function () {
            var createdAt = 1111,
                assignedAt = 2222;

            $compile(getDirectiveHtml(createdAt, assignedAt))($scope);
            $scope.$digest();

            expect(momentMock.diff).toHaveBeenCalledWith(createdAt, 'minutes');
            expect(momentMock.diff).toHaveBeenCalledWith(assignedAt, 'minutes');
            expect(momentMock.diff.calls.count()).toEqual(2);
        });

        it('sets the class youngerThan2h for a 0 minutes old pull request', function () {
            var createdAt = 89,
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(element.attr('class')).toContain('youngerThan2h');
            expect(element.attr('class')).not.toContain('assignment');
        });

        it('sets the class youngerThan2h for a 89 minutes old pull request', function () {
            var createdAt = 89,
                element = $compile(getDirectiveHtml(createdAt))($scope);

            $scope.$digest();

            expect(element.attr('class')).toContain('youngerThan2h');
            expect(element.attr('class')).not.toContain('assignment');
        });
    });
});
