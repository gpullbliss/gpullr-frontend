'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-devbliss');

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
            }]
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
                browsers: ['PhantomJS']
            },
            jenkins: {
                autoWatch: false,
                browsers: ['PhantomJS'],
                singleRun: true
            }
        },

        copy: {
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
                    src: ['./config/envConfig.js'],
                    dest: 'dist/scripts/config/'
                }]
            }
        }
    });

    grunt.registerTask('test', ['devbliss-karma:jenkins']);
    grunt.registerTask('buildpullr', ['build', 'copy:iconfont', 'replace:production']);

    grunt.task.renameTask('serve', 'devbliss-serve');
    grunt.registerTask('serve', ['replace:development', 'devbliss-serve']);
};
