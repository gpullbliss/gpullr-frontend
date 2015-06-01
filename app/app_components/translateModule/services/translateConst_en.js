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
                merged: '{{user}} closed your pull request {{prName}} in repository {{repoName}}',
                title: 'notifications',
                markAsSeen: 'mark all as read'
            }
        },
        login: {
            headline: 'Login',
            errorMessage: 'Login failed',
            username: 'Username',
            btn: {
                login: 'Sign in'
            },
            oauthGithub: 'Login with GitHub'
        },
        oauth: {
            verifyGithub: 'Verifying GitHub login',
            backToLogin: 'Back to Login',
            error: 'Error!',
            errorText: 'A problem has been occurred.'
        },
        dashboard: {
            systemNotification: {
                apiRateLimitReached: 'Maximum allowed requests to GitHub exceeded. It will progress in about {{ resetTime }}.'
            },
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
                    },
                    checkModal: {
                        headline: 'Dear Sir or Madam may I ask kindly for your attention to the older pull requests in your list. The author of the oldest pull request will be very pleased if you choose that pull request for review first.',
                        btn: {
                            assignSelected: 'Assign the one I selected',
                            assignOldest: 'Assign oldest pull request',
                        }
                    }
                },
                infos: {
                    linesAdded: 'Lines added',
                    linesRemoved: 'Lines Removed',
                    filesChanged: 'Files Changed',
                    comments: 'Comments',
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
            }
        }
    });
