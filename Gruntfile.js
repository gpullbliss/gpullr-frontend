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
    
    grunt.registerTask('build', [
        //'test',
        'jshint',
        'clean',
        'copy',
        'less',
        'bowerInstall',
        'useminPrepare',
        'concat',
        'uglify',
        'cssmin',
        'rev',
        'usemin',
        'htmlmin'
    ]);    
};