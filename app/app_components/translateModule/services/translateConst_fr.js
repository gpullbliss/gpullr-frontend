'use strict';
angular.module('translateModule')
    .constant('TranslateConstFr', {
        global: {
            bcp47: 'fr-FR',
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
                closedPr: 'a contrôlé et accepté ta pull request',
                inRepo: 'dans le répertoire',
                markAsSeen: 'Tout effacer'
            }
        },
        login: {
            headline: 'Se connecter',
            errorMessage: 'La connexion a échoué',
            username: 'Nom d\'utilisateur',
            btn: {
                login: 'Se connecter'
            },
            oauthGithub: 'Connexion via GitHub'
        },
        oauth: {
            verifyGithub: 'Vérification du login GitHub',
            backToLogin: 'Retour à la connexion',
            error: 'Erreur!',
            errorText: 'Un problème est survenu.'
        },
        dashboard: {
            headline: {
                openRequest: 'Pull requests en attente',
                assignedRequest: 'Pull requests assignées'
            },
            filter: {
                byOldest: 'Trier du plus ancien au plus récent',
                byNewest: 'Trier du plus récent au plus ancien'
            },
            pullRequest: {
                assign: {
                    toMe: 'S\'assigner',
                    unassign: 'Quitter',
                    modal: {
                        headline: 'La pull request est déjà assignée',
                        text: 'Souhaites-tu vraiment t\'assigner?'
                    },
                    checkModal: {
                        headline: 'Dear Sir or Madam may I ask kindly for your attention to the older pull requests in your list. The author of the oldest pull request will be very pleased if you choose that pull request for review first.',
                        btn: {
                            assignSelected: 'Assign the one I selected',
                            assignOldest: 'Assign oldest pull request',
                        }
                    }
                },
                infos: {
                    linesAdded: 'Lignes ajoutées',
                    linesRemoved: 'Lignes supprimées',
                    filesChanged: 'Fichiers changés',
                    comments: 'Commentaires',
                    build: 'En cours'
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
                repo: 'Filtre répertoires',
                settings: 'Préférences'
            },
            filter: {
                select: {
                    all: 'tout sélectionner',
                    none: 'tout déselectionner'
                },
                search: 'Chercher'
            }
        }
    });
