'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-devbliss');

    grunt.initConfig({
        connect: {
            rules: [{
                from: '^(.(?!\\.(css|html|jpg|js|png)))*$',
                to: '/index.html'
            }],
            proxies: [{
                context: '/api',
                host: 'localhost',
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

        devbliss: {
            port: 8889,
            testport: 9091,
            livereload: 9999
        }
    });

    grunt.registerTask('test', ['devbliss-karma:jenkins']);
};
