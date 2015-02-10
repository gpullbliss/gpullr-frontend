'use strict';
angular.module('dashboardModule')
    .controller('dashboardCtrl', ['$scope', function ($scope) {
        $scope.pullRequestCollection = [
            {
                title: 'Update 3001-angularjs-styleguide.md',
                url: 'https://github.com/devbliss/manuals/pull/44',
                repository: 'manuals',
                authorName: 'Ömer Karahan',
                authorAvatarUrl: 'https://avatars2.githubusercontent.com/u/3127128?v=3&s=40',
                creationDate: '2015-02-10T15:09:31Z',
                filesChanged: 1,
                linesAdded: 112,
                linesRemoved: 0,
                assigneeName: 'Marcel Bankmann',
                assigneeAvatarUrl: 'https://avatars1.githubusercontent.com/u/308374?v=3&s=40',
                commentCount: 14,
                status: 'Merged'
            }, {
                title: 'refactor/testSourceSets',
                url: 'https://github.com/devbliss/ecosystem-course-aggregation/pull/49',
                repository: 'ecosystem-course-aggregation',
                authorName: 'Elena Shafranova',
                authorAvatarUrl: 'https://avatars3.githubusercontent.com/u/1777303?v=3&s=40',
                creationDate: '2015-02-10T12:39:11Z',
                filesChanged: 15,
                linesAdded: 334,
                linesRemoved: 313,
                assigneeName: '',
                assigneeAvatarUrl: '',
                commentCount: 0,
                status: 'Open'
            }
        ];
    }]);
