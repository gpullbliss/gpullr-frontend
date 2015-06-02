'use strict';
angular.module('translateModule')
    .constant('TranslateConstIt', {
        global: {
            btn: {
                save: 'Salva',
                cancel: 'Annulla',
                confirm: 'Conferma'
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
            linkPullrequest: 'tutti pull requests',
            linkRanking: 'Classifica',
            linkSettings: 'Impostazioni',
            linkNotifications: 'Avvisi',
            notifications: {
                title: 'Avvisi',
                closedPr: 'chiudi tutti i tuoi pull request',
                inRepo: 'nel repository',
                markAsSeen: 'Segna come già letto'
            }
        },
        login: {
            headline: 'Login',
            errorMessage: 'Login fallito',
            username: 'Nome utente',
            btn: {
                login: 'Login'
            },
            oauthGithub: 'Login with GitHub'
        },
        dashboard: {
            headline: {
                openRequest: 'PR aperti'
            },
            filter: {
                byTime: 'filter by time'
            },
            pullRequest: {
                assign: {
                    toMe: 'assegna a me',
                    unassign: 'ritirare',
                    modal: {
                        headline: 'Pull request è già assegnato.',
                        text: 'Lo vuoi davvero assegnare a te?'
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
                    linesAdded: 'Righe aggiunti',
                    linesRemoved: 'Righe cancellati',
                    filesChanged: 'Files cambiati',
                    comments: 'Commenti',
                    build: 'Build'
                }
            }
        },
        ranking: {
            headline: 'Classifica utenti',
            tabs: {
                day: 'Giorno',
                week: 'Settimana',
                month: 'Mese',
                allTime: 'Permanante'
            },
            userInfos: {
                score: 'punteggio',
                prDone: 'Chiudi i pull request',
                linesAdded: 'Righe aggiunti',
                linesRemoved: 'Righe cancellati',
                filesChanged: 'Files cambiati'
            }
        },
        settings: {
            headline: {
                repo: 'Selezione di repository',
                settings: 'Impostazioni'
            },
            filter: {
                select: {
                    all: 'seleziona tutti',
                    none: 'deseleziona tutti'
                },
                search: 'Cerca'
            }
        }
    });
