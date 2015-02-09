'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-devbliss');

    grunt.initConfig({
        connect: {
            rules: [{
                from: '^.*$',
                to: '/index.html'
            }]
        },

        devbliss: {
            port: 8888,
            testport: 9091,
            livereload: 9999
        }
    });
};
