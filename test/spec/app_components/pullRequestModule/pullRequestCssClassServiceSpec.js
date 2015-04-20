'use strict';

describe('PullRequestCssClassService', function () {
    var momentMock;
    /** @type {pullRequestCssClassService} */
    var service;

    beforeEach(function () {
        momentMock = {
            diff: function () {
            }
        };
        var moment = function () {
            return momentMock;
        };

        spyOn(momentMock, 'diff').and.callFake(function (dateTime) {
            return dateTime;
        });

        module('pullRequestModule', function ($provide) {
            $provide.value('moment', moment);
        });

        inject(function (PullRequestCssClassService) {
            service = PullRequestCssClassService;
        });
    });

    describe('getColorClassDependingOnAge', function () {
        it('calls moment().diff with dateTime', function () {
            var dateTime = '2014-03-03T18:58:10Z';

            service.getColorClassDependingOnAge(dateTime);

            expect(momentMock.diff).toHaveBeenCalledWith(dateTime, 'minutes');
            expect(momentMock.diff.calls.count()).toEqual(1);
        });

        it('returns youngerThan2h between 0 and 119 minutes diff', function () {
            expect(service.getColorClassDependingOnAge(0)).toEqual('youngerThan2h');
            expect(service.getColorClassDependingOnAge(119)).toEqual('youngerThan2h');
        });

        it('returns olderThan2h between 120 and 239 minutes diff', function () {
            expect(service.getColorClassDependingOnAge(120)).toEqual('olderThan2h');
            expect(service.getColorClassDependingOnAge(239)).toEqual('olderThan2h');
        });

        it('returns olderThan4h between 240 and 479 minutes diff', function () {
            expect(service.getColorClassDependingOnAge(240)).toEqual('olderThan4h');
            expect(service.getColorClassDependingOnAge(479)).toEqual('olderThan4h');
        });

        it('returns olderThan8h between 480 and 43199 minutes diff', function () {
            expect(service.getColorClassDependingOnAge(480)).toEqual('olderThan8h');
            expect(service.getColorClassDependingOnAge(43199)).toEqual('olderThan8h');
        });

        it('returns olderThanAMonth after 43200 minutes diff', function () {
            expect(service.getColorClassDependingOnAge(43200)).toEqual('olderThanAMonth');
            expect(service.getColorClassDependingOnAge(123456789)).toEqual('olderThanAMonth');
        });
    });
});
