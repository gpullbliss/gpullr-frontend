'use strict';
angular.module('translateModule')
    .constant('TranslateConstTr', {
        global: {
            btn: {
                save: 'Kaydet',
                cancel: 'İptal',
                confirm: 'Onayla'
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
            linkPullrequest: 'Tüm talepler',
            linkRanking: 'Sıralama',
            linkSettings: 'Ayarlar',
            linkNotifications: 'Bildiriler',
            notifications: {
                title: 'bildiriler',
                closedPr: 'değişiklik talebini tamamladı',
                inRepo: 'depoda',
                markAsSeen: 'tümünü okunmuş olarak işaretle'
            }
        },
        login: {
            headline: 'Giriş',
            errorMessage: 'Giriş yapılamadı',
            username: 'Kullanıcı adı',
            btn: {
                login: 'Giriş yap'
            },
            oauthGithub: 'Login with GitHub'
        },
        dashboard: {
            headline: {
                openRequest: 'Açık Değişiklik Talepleri'
            },
            filter: {
                byOldest: 'eskiden yeniye sırala',
                byNewest: 'yeniden eskiye sırala'
            },
            pullRequest: {
                assign: {
                    toMe: 'Kendime tahsis et',
                    unassign: 'Tahsisi kendimden kaldır',
                    modal: {
                        headline: 'Değişiklik talebi zaten tahsis edilmiş durumda.',
                        text: 'Gerçekten kendine tahsis etmek istiyor musun?'
                    }
                },
                infos: {
                    linesAdded: 'Satırlar değiştirildi',
                    linesRemoved: 'Satırlar silindi',
                    filesChanged: 'Dosyalar değiştirildi',
                    comments: 'Yorum',
                    createdAt: 'Değişiklik talebi şu tarihte oluşturuldu:',
                    build: 'Oluştur'
                }
            }
        },
        ranking: {
            headline: 'Kullanıcı sıralaması',
            tabs: {
                day: 'Gün',
                week: 'Hafta',
                month: 'Ay',
                allTime: 'Tüm zaman'
            },
            userInfos: {
                prDone: 'Kapanmış değişiklik talepleri'
            }
        },
        settings: {
            headline: {
                repo: 'Depo filtresi',
                settings: 'Ayarlar'
            },
            filter: {
                select: {
                    all: 'hepsini seç',
                    none: 'hepsinden seçimi kaldır'
                },
                search: 'Arama'
            },
            lang: {
                de: 'Deutsch',
                en: 'English',
                it: 'Italiano',
                tr: 'Türkçe',
                ru: 'Русский'
            }
        }
    });
