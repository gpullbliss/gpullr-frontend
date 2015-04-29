'use strict';
angular.module('translateModule')
    .constant('TranslateConstPl', {
        global: {
            btn: {
                save: 'Zachowaj',
                cancel: 'Poniechaj',
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
                title: 'powiadomienia',
                closedPr: 'zamknął twoją prośbę o połączenie',
                inRepo: 'w repozytorium',
                markAsSeen: 'oznaczyć wszystkie jako przeczytane'
            }
        },
        login: {
            headline: 'Logowanie',
            errorMessage: 'Błąd logowania',
            username: 'Użytkownik ',
            btn:{
                login: 'Login'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'Otwarte prośby o połączenie'
            },
            filter: {
                byOldest: 'najpierw najstarszy',
                byNewest: 'najpierw najnowszy'
            },
            pullRequest: {
                assign: {
                    toMe: 'sobie przydzielić',
                    unassign: 'cofnąć przydzielenie',
                    modal: {
                        headline: 'Prośba o połączenie już jest przydzielona',
                        text: 'na pewno chcesz to sobie przydzielić?'
                    }
                },
                infos: {
                    linesChanged: 'Zmienione linijki',
                    filesChanged: 'Zmienione pliki',
                    filesRemoved: 'Usuniete pliki',
                    comments: 'komentarze',
                    createdAt: 'Wiek prośby o połączenie',
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
                prDone: 'Zamknięte prośby o połączenie'
            }
        },
        settings: {
            headline:{
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
            lang: {
                de: 'Deutsch',
                en: 'English',
                it: 'Italiano',
                pl: 'polski'
            }
        }
    });
