'use strict';
angular.module('translateModule')
    .constant('TranslateConstVmf', {
        global: {
            bcp47: 'de-VMF',
            btn: {
                save: 'schbeichern',
                cancel: 'obbrechn',
                confirm: 'jawoll'
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
            linkPullrequest: 'olla Bullrequesds',
            linkRanking: 'Ronglisdn',
            linkSettings: 'Astellunga',
            linkNotifications: 'Benochrichtigunga',
            notifications: {
                title: 'Benochrichtigunga',
                closedPr: 'hod dein Bullrequesd gschlossn',
                inRepo: 'im Rebbou',
                markAsSeen: 'olla wechhaun'
            }
        },
        login: {
            headline: 'Neigenna',
            errorMessage: 'des mim Login is fei nix gwordn',
            username: 'Nutzernoma',
            btn: {
                login: 'neigenna'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'offna Bullrequesds',
                assignedRequest: 'zugwiesne Bullrequesds'
            },
            filter: {
                byTime: 'filter by time'
            },
            pullRequest: {
                assign: {
                    toMe: 'mir schnabbn',
                    unassign: 'mir wieder foddnemma',
                    modal: {
                        headline: 'Bullrequesd is fei scho zugwiesn.',
                        text: 'Willstnan dir dennoch zuweisn?'
                    },
                    checkModal: {
                        headline: 'Dear Sir or Madam may I ask kindly for your attention to the older pull requests in your list. The author of the oldest pull request will be very pleased if you choose that pull request for review first.',
                        btn: {
                            assignSelected: 'Assign the one I selected',
                            assignOldest: 'Assign oldest pull request'
                        }
                    }
                },
                infos: {
                    linesAdded: 'naia Zeiln',
                    linesRemoved: 'nausgebfefferde Zeiln',
                    filesChanged: 'geänderde Dodain',
                    comments: 'Oomergunga',
                    build: 'Build'
                }
            }
        },
        ranking: {
            headline: 'Ronglisdn',
            noResultsJet: 'Do gibds fei noch nix.',
            tabs: {
                day: 'Dooch',
                week: 'Wochn',
                month: 'Monad',
                allTime: 'allawall'
            },
            userInfos: {
                score: 'Bungde',
                prDone: 'gschlossne Bullrequesds',
                linesAdded: 'naia Zeiln',
                linesRemoved: 'nausgebfefferde Zeiln',
                filesChanged: 'geänderde Dodain'                
            }
        },
        settings: {
            headline: {
                repo: 'Rebbou Filter',
                settings: 'Astellunga'
            },
            filter: {
                select: {
                    all: 'alla oohaagn',
                    none: 'alla wechhaun'
                },
                search: 'suchn'
            },
            desktopNotification: 'Desgdobb Benochrichtigunga'
        }
    });
