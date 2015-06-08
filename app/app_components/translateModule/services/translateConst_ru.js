'use strict';
angular.module('translateModule')
    .constant('TranslateConstRu', {
        global: {
            bcp47: 'ru-RU',
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
            btn: {
                login: 'Войти'
            },
            oauthGithub: 'Login with GitHub'
        },
        dashboard: {
            headline: {
                openRequest: 'Открытые запросы'
            },
            filter: {
                byTime: 'filter by time'
            },
            pullRequest: {
                assign: {
                    toMe: 'присвоить мне',
                    unassign: 'отменить присвоение',
                    modal: {
                        headline: 'Запрос уже обрабатывается другим пользователем.',
                        text: 'Действительно присвоить себе запрос?'
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
                    linesAdded: 'добавленных строк',
                    linesRemoved: 'удалённых строк',
                    filesChanged: 'изменённых файлов',
                    comments: 'комментариев',
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
                score: 'Рейтинг',
                prDone: 'Закрытых запросов',
                linesAdded: 'Добавленных строк',
                linesRemoved: 'Удалённых строк',
                filesChanged: 'Изменённых файлов'
            }
        },
        settings: {
            headline: {
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
            desktopNotification: 'Desktop notifications'
        }
    });
