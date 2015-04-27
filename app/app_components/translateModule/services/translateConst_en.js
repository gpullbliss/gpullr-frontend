'use strict';
angular.module('translateModule')
    .constant('TranslateConstEn', {
        global: {
            btn: {
                save: 'Save',
                cancel: 'Cancel',
                confirm: 'ok'
            }
        },
        meta: {
            title: 'gPullRequestTool',
            description: 'gPullRequestTool'
        },
        header: {
            logoAlt: 'gPullRequestTool 2015'
        },
        navi: {
            linkPullrequest: 'All Requests',
            linkRanking: 'Ranking',
            linkSettings: 'Settings'
        },
        login: {
            headline: 'Login',
            errorMessage: 'Login failed',
            username: 'Username',
            btn:{
                login: 'Sign in'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'Open PR\'s'
            },
            filter: {
                byOldest: 'filter by time oldest first',
                byNewest: 'filter by time newest first'
            },
            pullRequest: {
                assign: {
                    toMe: 'Assign myself',
                    unassign: 'Unassign myself'
                },
                infos: {
                    linesChanged: 'Lines Changed',
                    filesChanged: 'Files Changed',
                    filesRemoved: 'Files Removed',
                    comments: 'Comments',
                    createdAt: 'Pull Requests created at',
                    build: 'Build'
                }
            }
        },
        ranking: {
            headline: 'User Ranking',
            noResultsJet: 'No Ranks jet! Do Something!',
            tabs: {
                day: 'Day',
                week: 'Week',
                month: 'Month',
                allTime: 'All Time'
            },
            userInfos: {
                prDone: 'Closed Pull Requests'
            }
        },
        settings: {
            headline:{
                repo: 'Repo Filter',
                settings: 'Settings'
            },
            filter: {
                select: {
                    all: 'select all',
                    none: 'unselect all'
                },
                search: 'Search'
            },
            lang: {
                de: 'Deutsch',
                en: 'English'
            }
        }
    });
