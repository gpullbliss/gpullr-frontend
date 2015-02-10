'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-devbliss');

    grunt.initConfig({
        connect: {
            rules: [{
                from: '^.*$',
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

        devbliss: {
            port: 8888,
            testport: 9091,
            livereload: 9999
        }
    });
};
