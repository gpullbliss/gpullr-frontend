'use strict';
angular.module('translateModule')
    .constant('TranslateConstDe', {
        global: {
            btn: {
                save: 'сохранить',
                cancel: 'отменить',
                confirm: 'подтвердить'
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
            linkPullrequest: 'все запросы на включение',
            linkRanking: 'лидеры',
            linkSettings: 'настройки',
            linkNotifications: 'уведомления',
            notifications: {
                title: 'уведомления',
                closedPr: 'закрыть запрос на включение',
                inRepo: 'в хранилище',
                markAsSeen: 'удалить все'
            }
        },
        login: {
            headline: 'войти',
            errorMessage: 'ошибка при входе в систему',
            username: 'имя пользователя',
            btn:{
                login: 'войти'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'открытые запросы на включение'
            },
            filter: {
                byOldest: 'старые вначале',
                byNewest: 'новые вначале'
            },
            pullRequest: {
                assign: {
                    toMe: 'присвоить мне',
                    unassign: 'отменить присвоение',
                    modal: {
                        headline: 'Запрос на слияние уже обрабатывается другим пользователем.',
                        text: 'Хочешь ли ты действительно присвоить себе запрос на слияние?'
                    }
                },
                infos: {
                    linesChanged: 'измененных строк',
                    filesChanged: 'измененных файлов',
                    filesRemoved: 'удаленных файлов',
                    comments: 'комментариев',
                    createdAt: 'дата создания',
                    build: 'текущая сборка'
                }
            }
        },
        ranking: {
            headline: 'Лист лидеров',
            tabs: {
                day: 'день',
                week: 'неделя',
                month: 'месяц',
                allTime: 'всё время'
            },
            userInfos: {
                prDone: 'закрытые запросы на включение'
            }
        },
        settings: {
            headline:{
                repo: 'фильтр репозитория',
                settings: 'настройки'
            },
            filter: {
                select: {
                    all: 'выбрать все',
                    none: 'отменить выборку'
                },
                search: 'найти'
            },
            lang: {
                de: 'Deutsch',
                en: 'English',
                ru: 'Русский'
            }
        }
    });
