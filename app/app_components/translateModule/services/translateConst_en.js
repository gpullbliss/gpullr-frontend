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
                openRequest: 'Unassigned PRs',
                assignedRequest: 'Assigned PRs'
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
                    linesAdded: 'Lines added',
                    linesRemoved: 'Lines Removed',
                    filesChanged: 'Files Changed',
                    comments: 'Comments',
                    createdAt: 'Pull Requests created at',
                    assignedAt:'Reviewer assigned at',
                    build: 'Build'
                }
            }
        },
        ranking: {
            headline: 'User Ranking',
            noResultsJet: 'No ranks yet! Do something!',
            tabs: {
                day: 'Day',
                week: 'Week',
                month: 'Month',
                allTime: 'All Time'
            },
            userInfos: {
                score: 'Score',
                prDone: 'Closed Pull Requests',
                linesAdded: 'Lines added',
                linesRemoved: 'Lines Removed',
                filesChanged: 'Files Changed'
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
                es: 'Castellano',
                it: 'Italiano',
                tr: 'Türkçe',
                ru: 'Русский'
            }
        }
    });
