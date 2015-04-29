'use strict';
angular.module('translateModule')
    .constant('TranslateConstEn', {
        global: {
            btn: {
                save: 'Save',
                cancel: 'Abort',
                confirm: 'Confirm'
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
            linkSettings: 'Settings',
            linkNotifications: 'Notifications',
            notifications: {
                title: 'notifications',
                closedPr: 'closed your pull request',
                inRepo: 'in repository',
                markAsSeen: 'mark all as read'
            }
        },
        login: {
            headline: 'Login',
            errorMessage: 'Login failed',
            username: 'Username',
            btn: {
                login: 'Sign in'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'Unassigned PR\'s',
                assignedRequest: 'Assigned PR\'s'
            },
            filter: {
                byOldest: 'filter by time oldest first',
                byNewest: 'filter by time newest first'
            },
            pullRequest: {
                assign: {
                    toMe: 'Assign myself',
                    unassign: 'Unassign myself',
                    modal: {
                        headline: 'Pull request is already assigned.',
                        text: 'Do you really want to assign it to you?'
                    }
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
            headline: {
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
                en: 'English',
                it: 'Italiano'
            }
        }
    });
