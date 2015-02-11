'use strict';
angular.module('dashboardModule')
    .controller('dashboardCtrl', ['$scope', function ($scope) {
        $scope.pullRequestCollection = [
            {
                title: 'Update 3001-angularjs-styleguide.md',
                url: 'https://github.com/devbliss/manuals/pull/44',
                repository: 'manuals',
                author: {
                    name: 'Ömer Karahan',
                    avatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3'
                },
                creationDate: '2015-02-11T12:12:31Z',
                filesChanged: 1,
                linesAdded: 112,
                linesRemoved: 0,
                status: 'Merged'
            }, {
                title: 'refactor/testSourceSets',
                url: 'https://github.com/devbliss/ecosystem-course-aggregation/pull/49',
                repository: 'ecosystem-course-aggregation',
                author: {
                    name: 'Elena Shafranova',
                    avatarUrl: 'https://avatars3.githubusercontent.com/u/1777303?v=3'
                },
                creationDate: '2015-02-11T13:12:31Z',
                filesChanged: 15,
                linesAdded: 334,
                linesRemoved: 313,
                status: 'Open'
            }
        ];
    }]);
