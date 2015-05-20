'use strict';

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
                host: 'localhost',
                //host: 'gpullr.devbliss.com',
                port: 8888,
                rewrite: {
                    '^/api': ''
                }
            }],
            options: {
                port: 8889,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: '0.0.0.0',
                middleware: function (connect, options) {
                    var middlewares = [];
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }

                    // Setup the proxy Backend
                    var proxyOptions1 = require('url').parse('http://172.17.42.1:8070/api');
                    proxyOptions1.route = '/api';
                    middlewares.push(require('proxy-middleware')(proxyOptions1));

                    // Setup the proxy qti player
                    var proxyOptions2 = require('url').parse('http://localhost:13771/');
                    proxyOptions2.route = '/qtiplayer';
                    middlewares.push(require('proxy-middleware')(proxyOptions2));


                    // RewriteRules support
                    middlewares.push(require('grunt-connect-rewrite/lib/utils').rewriteRequest);

                    // Serve static files
                    options.base.forEach(function (base) {
                        middlewares.push(connect.static(base));
                    });
                    return middlewares;
                }
            },

            app: {
                options: {
                    open: true,
                    livereload: 35729,
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
                    port: 8888,
                    base: ['.tmp', 'test', 'app']
                }
            },

            testDist: {
                options: {
                    port: 8888,
                    base: ['.tmp', 'test', 'dist']
                }
            },

            e2eApp: {
                options: {
                    port: 8888,
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

        devbliss: {
            port: 8889,
            testport: 9091,
            livereload: 9999
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
                    livereload: 35729
                }
            },

            js: {
                files: ['app/**/*.js'],
                tasks: ['eslint'],
                options: {
                    livereload: 35729
                }
            },

            less: {
                files: ['app/styles/less/**/*.less'],
                tasks: ['clean', 'recess'],
                options: {
                    livereload: 35729
                }
            },

            css: {
                files: ['app/**/*.css'],
                options: {
                    livereload: 35729
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
                    livereload: 35729
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
