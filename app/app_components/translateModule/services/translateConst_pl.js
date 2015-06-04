'use strict';
angular.module('translateModule')
    .constant('TranslateConstPl', {
        global: {
            bcp47: 'pl-PL',
            btn: {
                save: 'Zachowaj',
                cancel: 'Anuluj',
                confirm: 'Potwierdź'
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
            linkPullrequest: 'Wszystkie prośby',
            linkRanking: 'Ranking',
            linkSettings: 'Ustawienia',
            linkNotifications: 'Powiadomienia',
            notifications: {
                title: 'Powiadomienia',
                closedPr: 'zamknął twoją prośbę o połączenie',
                inRepo: 'w repozytorium',
                markAsSeen: 'oznaczyć wszystkie jako przeczytane'
            }
        },
        login: {
            headline: 'Logowanie',
            errorMessage: 'Błąd logowania',
            username: 'Użytkownik',
            btn: {
                login: 'Login'
            },
            oauthGithub: 'Login with GitHub'
        },
        dashboard: {
            headline: {
                openRequest: 'Otwarte prośby o połączenie'
            },
            filter: {
                byTime: 'filter by time'
            },
            pullRequest: {
                assign: {
                    toMe: 'sobie przydzielić',
                    unassign: 'cofnąć przydzielenie',
                    modal: {
                        headline: 'Prośba o połączenie już jest przydzielona',
                        text: 'Czy na pewno chcesz to sobie przydzielić?'
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
                    linesAdded: 'Dodane linijki',
                    linesRemoved: 'Usuniete linijki',
                    filesChanged: 'Zmienione pliki',
                    comments: 'komentarze',
                    build: 'Budowa'
                }
            }
        },
        ranking: {
            headline: 'Ranking użytkowników',
            tabs: {
                day: 'Dzień',
                week: 'Tydzień',
                month: 'Miesiąc',
                allTime: 'Cały czas'
            },
            userInfos: {
                score: 'Punkty',
                prDone: 'Zamknięte prośby o połączenie',
                linesAdded: 'Dodane linijki',
                linesRemoved: 'Usuniete linijki',
                filesChanged: 'Zmienione pliki'
            }
        },
        settings: {
            headline: {
                repo: 'Filtrowanie repozytoriów',
                settings: 'Ustawienia'
            },
            filter: {
                select: {
                    all: 'wszystkie wybrać',
                    none: 'wszystkie odznaczyć'
                },
                search: 'szukać'
            },
            desktopNotification: 'Desktop notifications'
        }
    });
