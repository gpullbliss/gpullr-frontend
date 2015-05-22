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
            btn: {
                login: 'reingehn'
            },
            oauthGithub: 'Reingehen mit GitHub'
        },
        oauth: {
            verifyGithub: 'Github Daten überprüfen',
            backToLogin: 'Zurück zum Reingehen',
            error: 'Fehler!',
            errorText: 'Es trat ein Problem auf.'
        },
        dashboard: {
            headline: {
                openRequest: 'offene Zieh Anfragen',
                assignedRequest: 'zugewiesene Zieh Anfragen'
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
                    },
                    checkModal: {
                        headline: 'Es gibt Zieh Anfragen in deiner Liste, die schon länger auf Bearbeitung warten. Weise dir doch besser die älteste Zieh Anfrage zu.',
                        btn: {
                            assignSelected: 'Ausgewählten trotzdem zuweisen',
                            assignOldest: 'Ältesten zuweisen',
                        }
                    }
                },
                infos: {
                    linesAdded: 'Zeilen hinzugefügt',
                    linesRemoved: 'Zeilen entfernt',
                    filesChanged: 'Datein geändert',
                    comments: 'Kommentare',
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
                score: 'Punkte',
                prDone: 'geschlossene Zieh Anfragen',
                linesAdded: 'Zeilen hinzugefügt',
                linesRemoved: 'Zeilen entfernt',
                filesChanged: 'Dateien geändert'
            }
        },
        settings: {
            headline: {
                repo: 'Lager Filter',
                settings: 'Einstellungen'
            },
            filter: {
                select: {
                    all: 'alle auswählen',
                    none: 'alle abwählen'
                },
                search: 'suchen'
            }
        }
    });
