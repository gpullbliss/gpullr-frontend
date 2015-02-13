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
                port: 8889,
                rewrite: {
                    '^/api': ''
                }
            }]
        },

        karma: {
            options: {
                configFile: 'test/karma.conf.js'
            },
            app: {
                browsers: ['PhantomJS']
            }
        },

        devbliss: {
            port: 8888,
            testport: 9091,
            livereload: 9999
        }
    });
};
