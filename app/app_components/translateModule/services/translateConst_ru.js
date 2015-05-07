'use strict';
angular.module('translateModule')
    .constant('TranslateConstRu', {
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
            linkPullrequest: 'Все запросы',
            linkRanking: 'Горячая десятка',
            linkSettings: 'Настройки',
            linkNotifications: 'Уведомления',
            notifications: {
                title: 'Уведомления',
                closedPr: 'закрыл(а) твой запрос на включение',
                inRepo: 'в проекте',
                markAsSeen: 'все удалить'
            }
        },
        login: {
            headline: 'Вход в систему',
            errorMessage: 'ошибка при входе в систему',
            username: 'Имя пользователя',
            btn:{
                login: 'Войти'
            }
        },
        dashboard: {
            headline: {
                openRequest: 'Открытые запросы'
            },
            filter: {
                byOldest: 'сортировать по дате по убыванию',
                byNewest: 'сортировать по дате по возрастанию'
            },
            pullRequest: {
                assign: {
                    toMe: 'присвоить мне',
                    unassign: 'отменить присвоение',
                    modal: {
                        headline: 'Запрос уже обрабатывается другим пользователем.',
                        text: 'Действительно присвоить себе запрос?'
                    }
                },
                infos: {
                    linesAdded: 'добавленных строк',
                    linesRemoved: 'удалённых строк',
                    filesChanged: 'изменённых файлов',
                    comments: 'комментариев',
                    createdAt: 'дата создания',
                    build: 'Текущая сборка'
                }
            }
        },
        ranking: {
            headline: 'Горячая десятка',
            tabs: {
                day: 'День',
                week: 'Неделя',
                month: 'Месяц',
                allTime: 'Всё время'
            },
            userInfos: {
                prDone: 'Закрытые запросы'
            }
        },
        settings: {
            headline:{
                repo: 'Фильтр проектов',
                settings: 'Настройки'
            },
            filter: {
                select: {
                    all: 'Выделить все',
                    none: 'Снять выделение'
                },
                search: 'искать'
            },
            lang: {
                de: 'Deutsch',
                en: 'English',
                es: 'Castellano',
                it: 'Italiano',
                tr: 'Türkçe',
                ru: 'Русский',
                pl: 'Polski',
                vmf: 'Fränggisch'
            }
        }
    });
