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

        copy:{
            iconfont:{
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
        }
    });

    grunt.registerTask('test', ['devbliss-karma:jenkins']);
    grunt.registerTask('buildpullr', ['build', 'copy:iconfont']);
};
