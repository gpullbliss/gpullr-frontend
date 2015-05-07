'use strict';
angular.module('translateModule')
    .constant('TranslateConstFr', {
        global: {
            btn: {
                save: 'Sauvegarder',
                cancel: 'Annuler',
                confirm: 'Confirmer'
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
            linkPullrequest: 'Pull Requests',
            linkRanking: 'Classement',
            linkSettings: 'Préférences',
            linkNotifications: 'Notifications',
            notifications: {
                title: 'Notifications',
                closedPr: 'schloss deine Zieh Anfrage',
                inRepo: 'in Lager',
                markAsSeen: 'Tout effacer'
            }
        },
        login: {
            headline: 'Se connecter',
            errorMessage: 'La connexion a échoué',
            username: 'Nom d\'utilisateur',
            btn: {
                login: 'Se connecter'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'Pull Requests en attente',
                assignedRequest: 'Pull Requests assignées'
            },
            filter: {
                byOldest: 'Trier du plus ancien au plus récent',
                byNewest: 'Trier du plus récent au plus ancien'
            },
            pullRequest: {
                assign: {
                    toMe: 'S\'assigner',
                    unassign: 'quitter',
                    modal: {
                        headline: 'La Pull Request déjà assignée',
                        text: 'Souhaites-tu vraiment t\'assigner?'
                    }
                },
                infos: {
                    linesAdded: 'Lignes ajoutées',
                    linesRemoved: 'Lignes supprimées',
                    filesChanged: 'Fichiers changés',
                    comments: 'Commentaires',
                    createdAt: 'Pull Request crée le',
                    assignedAt: 'Reviewer assigné le',
                    build: 'Bau'
                }
            }
        },
        ranking: {
            headline: 'Classement',
            noResultsJet: 'Pas de score pour l\'instant. Au boulot!',
            tabs: {
                day: 'Jour',
                week: 'Semaine',
                month: 'Mois',
                allTime: 'Général'
            },
            userInfos: {
                score: 'Points',
                prDone: 'Pull Requests terminées',
                linesAdded: 'Lignes ajoutées',
                linesRemoved: 'Lignes supprimées',
                filesChanged: 'Fichiers changés'
            }
        },
        settings: {
            headline: {
                repo: 'Lager Filter',
                settings: 'Préférences'
            },
            filter: {
                select: {
                    all: 'tout sélectionner',
                    none: 'tout déselectionner'
                },
                search: 'chercher'
            }
        }
    });
