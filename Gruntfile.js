'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-devbliss');
    
    grunt.initConfig({
      devbliss: {
          port: 8081,
          testport: 9091,
          livereload: 9999
      },
    });       
};