'use strict';
angular.module('translateModule')
    .constant('TranslateConstTr', {
        global: {
            bcp47: 'tr-TR',
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
                openRequest: 'Tahsis Edilmemiş Değişiklik Talepleri',
                assignedRequest: 'Tahsis Edilmiş Değişiklik Talepleri'
            },
            filter: {
                byTime: 'filter by time'
            },
            pullRequest: {
                assign: {
                    toMe: 'Kendime tahsis et',
                    unassign: 'Tahsisi kendimden kaldır',
                    modal: {
                        headline: 'Değişiklik talebi zaten tahsis edilmiş durumda.',
                        text: 'Gerçekten kendine tahsis etmek istiyor musun?'
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
                    linesAdded: 'Satırlar değiştirildi',
                    linesRemoved: 'Satırlar silindi',
                    filesChanged: 'Dosyalar değiştirildi',
                    comments: 'Yorum',
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
                score: 'puan',
                prDone: 'Kapanmış değişiklik talepleri',
                linesAdded: 'Satırlar değiştirildi',
                linesRemoved: 'Satırlar silindi',
                filesChanged: 'Dosyalar değiştirildi'
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
            }
        }
    });
