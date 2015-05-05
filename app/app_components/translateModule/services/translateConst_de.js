'use strict';
angular.module('translateModule')
    .constant('TranslateConstDe', {
        global: {
            btn: {
                save: 'speichern',
                cancel: 'abbrechen',
                confirm: 'bestätigen'
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
            linkPullrequest: 'alle Anfragen',
            linkRanking: 'Rangliste',
            linkSettings: 'Einstellungen',
            linkNotifications: 'Benachrichtigungen',
            notifications: {
                title: 'Benachrichtigungen',
                closedPr: 'schloss deine Zieh Anfrage',
                inRepo: 'in Lager',
                markAsSeen: 'alle löschen'
            }
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
                openRequest: 'offene Zieh Anfragen'
            },
            filter: {
                byOldest: 'sortieren nach ältester zuerst',
                byNewest: 'sortieren nach jüngster zuerst'
            },
            pullRequest: {
                assign: {
                    toMe: 'mir zuweisen',
                    unassign: 'mir abweisen',
                    modal: {
                        headline: 'Zieh Anfrage ist schon zugewiesen.',
                        text: 'Willst du dich wirklich zuweisen?'
                    }
                },
                infos: {
                    linesAdded: 'Zeilen hinzugefügt',
                    linesRemoved: 'Zeilen entfernt',
                    filesChanged: 'Datein geändert',
                    comments: 'Kommentare',
                    createdAt: 'Zieh Anfrage erstellt am',
                    build: 'Bau'
                }
            }
        },
        ranking: {
            headline: 'Rangliste',
            tabs: {
                day: 'Tag',
                week: 'Woche',
                month: 'Monat',
                allTime: 'aller Zeit'
            },
            userInfos: {
                prDone: 'geschlossene Zieh Anfragen'
            }
        },
        settings: {
            headline:{
                repo: 'Lager Filter',
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
                en: 'English',
                es: 'Castellano',
                it: 'Italiano',
                tr: 'Türkçe',
                ru: 'Русский'
            }
        }
    });
