'use strict';

var gpullr = {
    host: '0.0.0.0',
    port: 8889,
    backendHost: '0.0.0.0',
    backendPort: 8888,
    testPort: 9091,
    liveReload: 9999
};

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            rules: [{
                from: '^(.(?!\\.(css|html|jpg|js|png|eot|otf|svg|ttf|woff|woff2)))*$',
                to: '/index.html'
            }],
            proxies: [{
                context: '/api',
                host: gpullr.backendHost,
                port: gpullr.backendPort,
                rewrite: {
                    '^/api': ''
                }
            }],
            options: {
                port: gpullr.port,
                hostname: gpullr.host
            },

            app: {
                options: {
                    open: true,
                    livereload: gpullr.liveReload,
                    base: ['.tmp', 'app']
                }
            },

            dist: {
                options: {
                    open: true,
                    base: 'dist'
                }
            },

            testApp: {
                options: {
                    port: gpullr.testPort,
                    base: ['.tmp', 'test', 'app']
                }
            },

            testDist: {
                options: {
                    port: gpullr.testPort,
                    base: ['.tmp', 'test', 'dist']
                }
            },

            e2eApp: {
                options: {
                    port: gpullr.testPort,
                    base: ['.tmp', 'test', 'app']
                }
            }
        },

        jshint: {
            options: {
                jshintrc: true
            }
        },

        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            app: {
                autoWatch: false,
                browsers: ['PhantomJS'],
                singleRun: true
            }
        },

        copy: {
            components: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'dist',
                        src: [
                            '.htaccess',
                            'bower_components/**/*.html',
                            'app_components/**/*.html',
                            'views/**/*.html',
                            'index.html'
                        ]
                    }
                ]
            },
            js: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/concat/scripts/',
                        dest: 'dist/scripts/',
                        src: ['*.js']
                    }
                ]
            },
            font: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        src: [
                            'styles/css/bootstrap/fonts/**/*',
                            'styles/fonts/**/*',
                            'bower_components/ecosystem-main-fe/release/styles/bootstrap/fonts/**/*'
                        ],
                        dest: 'dist'
                    }
                ]
            },
            img: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        src: [
                            'bower_components/ecosystem-main-fe/release/images/**/*',
                            'images/placeholder/*',
                            'styles/img/**/*'
                        ],
                        dest: 'dist'
                    }
                ]
            },
            release: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app/app_components/pageModule/',
                        dest: 'release/',
                        src: [
                            '**/*'
                        ]
                    }
                ]
            },
            iconfont: {
                expand: true,
                cwd: 'app/styles/fonts',
                dest: 'dist/styles/fonts',
                src: [
                    '*.*'
                ]
            }
        },

        replace: {
            development: {
                options: {
                    patterns: [{
                        json: grunt.file.readJSON('config/environments/development.json')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['config/envConfig.js'],
                    dest: 'app/scripts/config/'
                }]
            },
            production: {
                options: {
                    patterns: [{
                        json: grunt.file.readJSON('config/environments/production.json')
                    }]
                },
                files: [{
                    expand: true,
                    flatten: true,
                    src: ['config/envConfig.js'],
                    dest: 'app/scripts/config/'
                }]
            }
        },

        wiredep: {
            task: {
                // Point to the files that should be updated when
                // you run `grunt wiredep`
                src: [
                    'app/index.html'
                ]
            }
        },

        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            'app/styles/css/base.min.css',
                            'dist/*',
                            '!dist/.git*'
                        ]
                    }
                ]
            },
            e2eDist: {
                files: [
                    {
                        dot: true,
                        src: [
                            'dist/app_dev_components',
                            'dist/bower_components',
                            'dist/index_e2e.html'
                        ]
                    }
                ]
            },
            release: {
                files: [
                    {
                        dot: true,
                        src: [
                            'release/*'
                        ]
                    }
                ]
            }
        },

        recess: {
            options: {
                compile: true
            },
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/styles/less',
                        src: 'base.less',
                        dest: 'app/styles/.tmp/',
                        ext: '.css'
                    }
                ]
            }
        },

        eslint: {
            target: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                'app/app_components/**/*.js',
                'app/app_dev_components/**/*.js'
            ],
            test: {
                src: ['test/**/*.js']
            },
            options: {
                configFile: 'config/eslint.json'
            }
        },

        usemin: {
            html: ['dist/index.html'],
            options: {
                assetsDirs: ['dist']
            }
        },

        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist'
            }
        },

        rev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 4
            },
            dist: {
                files: {
                    src: [
                        'dist/scripts/**/*.js',
                        'dist/styles/**/*.css'
                    ]
                }
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist',
                        src: ['**/*.html'],
                        dest: 'dist'
                    }
                ]
            }
        },

        configureRewriteRules: {
            connect: {
                rules: [{
                    from: '^/lat/$',
                    to: 'http://0.0.0.0:8096/',
                    redirect: 'permanent'
                }, {
                    from: '^/edi/$',
                    to: 'http://0.0.0.0:8084/',
                    redirect: 'permanent'
                }, {
                    from: '^/prep/$',
                    to: 'http://0.0.0.0:8087/',
                    redirect: 'permanent'
                }, {
                    from: '^/monitoring/(.*)$',
                    to: 'http://0.0.0.0:8082',
                    redirect: 'permanent'
                }]
            }
        },

        watch: {

            // application files

            html: {
                files: ['app/**/*.html'],
                options: {
                    livereload: gpullr.liveReload
                }
            },

            js: {
                files: ['app/**/*.js'],
                tasks: ['eslint'],
                options: {
                    livereload: gpullr.liveReload
                }
            },

            less: {
                files: ['app/styles/less/**/*.less'],
                tasks: ['clean', 'recess'],
                options: {
                    livereload: gpullr.liveReload
                }
            },

            css: {
                files: ['app/**/*.css'],
                options: {
                    livereload: gpullr.liveReload
                }
            },

            // tests

            jsTest: {
                files: ['test/**/*.js'],
//                tasks: ['eslint:test'] TODO
            },

            // setup

            bower: {
                files: ['bower.json'],

                tasks: ['wiredep']
            },

            gruntfile: {
                files: ['Gruntfile.js'],
//                tasks: ['eslint'], TODO
                options: {
                    livereload: gpullr.liveReload
                }
            }
        }

    });

    grunt.registerTask('buildpullr', function (target) {
        grunt.log.warn('The `buildpullr` task has been deprecated. Use `grunt build` to build the application.');
        grunt.task.run(['build:' + target]);
    });

    grunt.registerTask('build', [
        'replace:production',
        'wiredep',
        'clean',
        'recess',
//      'eslint', TODO
        'useminPrepare',
        'copy:components',
        'copy:font',
        'copy:img',
        'concat',
        'cssmin',
        'copy:js',
        'rev:dist',
        'usemin',
        'htmlmin',
        'copy:iconfont'
    ]);

    grunt.registerTask('serve', [
        'build',
        'replace:development',
        'configureRewriteRules',
        'connect:app',
        'watch'
    ]);

    grunt.registerTask('test', [
        'replace:development',
        'karma:app'
    ]);
};
