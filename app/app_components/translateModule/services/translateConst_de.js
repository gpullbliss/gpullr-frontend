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
                closedPr: 'schloss dein Pull Request',
                inRepo: 'im Repo',
                markAsSeen: 'alle löschen'
            }
        },
        login: {
            headline: 'Login',
            errorMessage: 'Login fehlgeschlagen',
            username: 'Nutzername',
            btn: {
                login: 'Login'
            },
            oauthGithub: 'mit GitHub Einloggen'
        },
        oauth: {
            verifyGithub: 'Github Daten überprüfen',
            backToLogin: 'Zurück zum Login',
            error: 'Fehler!',
            errorText: 'Es trat ein Problem auf.'
        },
        dashboard: {
            systemNotification: {
                apiRateLimitReached: 'Anzahl zulässiger Requests an GitHub überschritten. In ca. {{ resetTime }} geht es weiter.'
            },
            headline: {
                openRequest: 'offene Pull Requests',
                assignedRequest: 'zugewiesene Pull Requests'
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
                        headline: 'Pull Request ist schon zugewiesen.',
                        text: 'Willst du dich wirklich zuweisen?'
                    },
                    checkModal: {
                        headline: 'Es gibt Pull Requests in deiner Liste, die schon länger auf Bearbeitung warten. Weise dir doch besser einen älteren Pull Request zu.',
                        btn: {
                            assignOldest: 'Ältesten zuweisen'
                        }
                    }
                },
                infos: {
                    linesAdded: 'Zeilen hinzugefügt',
                    linesRemoved: 'Zeilen entfernt',
                    filesChanged: 'Datein geändert',
                    comments: 'Kommentare',
                    build: 'Build'
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
                prDone: 'geschlossene Pull Requests',
                linesAdded: 'Zeilen hinzugefügt',
                linesRemoved: 'Zeilen entfernt',
                filesChanged: 'Dateien geändert'
            }
        },
        settings: {
            headline: {
                repo: 'Repo Filter',
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
