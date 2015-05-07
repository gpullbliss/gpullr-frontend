'use strict';
angular.module('translateModule')
    .constant('TranslateConstVmf', {
        global: {
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
                byOldest: 'aaordna nooch ältester zuerschd',
                byNewest: 'aaordna nooch jüngster zuerschd'
            },
            pullRequest: {
                assign: {
                    toMe: 'mir schnabbn',
                    unassign: 'mir wieder foddnemma',
                    modal: {
                        headline: 'Bullrequesd is fei scho zugwiesn.',
                        text: 'Willstnan dir dennoch zuweisn?'
                    }
                },
                infos: {
                    linesAdded: 'naia Zeiln',
                    linesRemoved: 'nausgebfefferde Zeiln',
                    filesChanged: 'Datein geändert',
                    comments: 'Oomergunga',
                    createdAt: 'Bullrequesd gschdelld om',
                    assignedAt: 'zugwiesn om',
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
                prDone: 'gschlossne Bullrequesds'
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
            lang: {
                de: 'Deutsch',
                en: 'English',
                es: 'Castellano',
                it: 'Italiano',
                tr: 'Türkçe',
                ru: 'Русский',
                vmf: 'Fränggisch'
            }
        }
    });
