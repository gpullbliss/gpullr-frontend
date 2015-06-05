'use strict';

describe('withFilter', function () {
    var filter;

    beforeEach(function () {
        module('pullRequestModule');

        inject(function (withFilter) {
            filter = withFilter;
        });

    });

    describe('filterFilter', function () {

        var items = [{
            oneTestProperty: 'a String',
            anotherTestProperty: null,
            omnipresentProperty: 'is omnipresent'
        }, {
            anotherTestProperty: 'another String',
            omnipresentProperty: 'is omnipresent'
        }];

        var expectedEmptyResult = [],
            expectedResultWithOneTestProperty = [
                items[0]
            ],
            expectedResultWithAnotherTestProperty = [
                items[1]
            ],
            expectedResultWithOmnipresentProperty = [
                items[0],
                items[1]
            ];


        it('with wrong parameter', function () {
            expect(filter()).toEqual(expectedEmptyResult);
            expect(filter(items)).toEqual(expectedEmptyResult);
            expect(filter(null, 'omnipresentProperty')).toEqual(expectedEmptyResult);
        });

        it('default filter property does exist', function () {
            expect(filter(items, 'oneTestProperty')).toEqual(expectedResultWithOneTestProperty);
            expect(filter(items, 'anotherTestProperty')).toEqual(expectedResultWithAnotherTestProperty);
            expect(filter(items, 'differentTestProperty')).toEqual(expectedEmptyResult);
            expect(filter(items, 'omnipresentProperty')).toEqual(expectedResultWithOmnipresentProperty);
        });

        it('property does exist', function () {
            expect(filter(items, 'oneTestProperty', true)).toEqual(expectedResultWithOneTestProperty);
            expect(filter(items, 'anotherTestProperty', true)).toEqual(expectedResultWithAnotherTestProperty);
            expect(filter(items, 'differentTestProperty', true)).toEqual(expectedEmptyResult);
            expect(filter(items, 'omnipresentProperty', true)).toEqual(expectedResultWithOmnipresentProperty);
        });

        it('property does not exist', function () {
            expect(filter(items, 'oneTestProperty', false)).toEqual(expectedResultWithAnotherTestProperty);
            expect(filter(items, 'anotherTestProperty', false)).toEqual(expectedResultWithOneTestProperty);
            expect(filter(items, 'differentTestProperty', false)).toEqual(expectedResultWithOmnipresentProperty);
            expect(filter(items, 'omnipresentProperty', false)).toEqual(expectedEmptyResult);
        });

    });

});
