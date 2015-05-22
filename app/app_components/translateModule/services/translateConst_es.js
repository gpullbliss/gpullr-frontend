'use strict';
angular.module('translateModule')
    .constant('TranslateConstEs', {
        global: {
            btn: {
                save: 'guardar',
                cancel: 'cancelar',
                confirm: 'confirmar'
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
            linkPullrequest: 'Todas las Solicitudes',
            linkRanking: 'Ranking',
            linkSettings: 'Configuración',
            linkNotifications: 'Notificaciones',
            notifications: {
                title: 'Notificaciones',
                closedPr: 'cierra todas tus solicitudes',
                inRepo: 'en repositorio',
                markAsSeen: 'marcar todos como leidos'
            }
        },
        login: {
            headline: 'Ingreso',
            errorMessage: 'ingreso fallido',
            username: 'Nombre de Usuario',
            btn: {
                login: 'Ingresar'
            },
            oauthGithub: 'Login with GitHub'
        },
        dashboard: {
            headline: {
                openRequest: 'solicitudes abiertas'
            },
            filter: {
                byOldest: 'ordena decreciente por edad',
                byNewest: 'ordena ascendiente por edad'
            },
            pullRequest: {
                assign: {
                    toMe: 'asignamelo',
                    unassign: 'desasignamelo',
                    modal: {
                        headline: 'Solicitud ya asignada.',
                        text: 'Quieres realmente asignartelo?'
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
                    linesAdded: 'Líneas cambiadas',
                    linesRemoved: 'Líneas borrados',
                    filesChanged: 'Archivos cambiados',
                    comments: 'Comentarios',
                    build: 'Construye'
                }
            }
        },
        ranking: {
            headline: 'Ranking de Usuarios',
            tabs: {
                day: 'Día',
                week: 'Semana',
                month: 'Mes',
                allTime: 'siempre'
            },
            userInfos: {
                score: 'puntuación',
                prDone: 'Solicitudes finalizadas',
                linesAdded: 'Líneas cambiadas',
                linesRemoved: 'Líneas borrados',
                filesChanged: 'Archivos cambiados'
            }
        },
        settings: {
            headline: {
                repo: 'Seleción de Repositorio',
                settings: 'Configuración'
            },
            filter: {
                select: {
                    all: 'seleccionar todas',
                    none: 'deseleccionar todas'
                },
                search: 'Busqueda'
            }
        }
    });
