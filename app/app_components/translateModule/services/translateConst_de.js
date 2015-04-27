'use strict';
angular.module('translateModule')
    .constant('TranslateConstDe', {
        global: {
            btn: {
                save: 'speichern',
                cancel: 'abbrechen',
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
            linkPullrequest: 'alle Requests',
            linkRanking: 'Rangliste',
            linkSettings: 'Einstellungen'
        },
        login: {
            headline: 'Reingehen',
            errorMessage: 'Login fehlgeschlagen',
            username: 'Nutzername',
            btn:{
                login: 'reingehn'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'offene PR\'s'
            },
            filter: {
                byOldest: 'sortieren nach ältester zuerst',
                byNewest: 'sortieren nach jüngster zuerst'
            },
            pullRequest: {
                assign: {
                    toMe: 'mir zuweisen',
                    unassign: 'mich entfernen'
                },
                infos: {
                    linesChanged: 'Zeilen geändert',
                    filesChanged: 'Datein geändert',
                    filesRemoved: 'Datein entfernt',
                    comments: 'Kommentare',
                    createdAt: 'Pull Requests erstellt am',
                    build: 'Bau'
                }
            }
        },
        ranking: {
            headline: 'Rangliste',
            noResultsJet: 'Keine Wertung bis jetzt! Mach was!',
            tabs: {
                day: 'Tag',
                week: 'Woche',
                month: 'Monat',
                allTime: 'aller Zeit'
            },
            userInfos: {
                prDone: 'geschlossene Pull Requests'
            }
        },
        settings: {
            headline:{
                repo: 'Repo Filter',
                settings: 'Einstellungen'
            },
            filter: {
                select: {
                    all: 'alle auswählen',
                    none: 'alle abwählen'
                },
                search: 'suchen'
            },
            lang: {
                de: 'Deutsch',
                en: 'English'
            }
        }
    });
