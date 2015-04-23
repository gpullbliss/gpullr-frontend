'use strict';
module.exports = function (config) {
    config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '../',

        frameworks: ['jasmine'],

        files: [
            'app/bower_components/jquery/dist/jquery.js',
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-moment/angular-moment.min.js',
            'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
            'app/bower_components/angular-translate/angular-translate.js',
            'app/scripts/app.js',
            'app/scripts/**/*.js',
            'app/app_components/**/*module.js',
            'app/app_components/**/**/*.js',
            'test/spec/**/*Spec.js',
            'app/views/*.html',
            'app/app_components/**/views/*.html'
        ],

        // list of files to exclude
        exclude: [],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/views/*.html': ['ng-html2js'],
            'app/app_components/**/views/*.html': ['ng-html2js']
        },

        // use dots reporter, as travis terminal does not support escaping sequences
        // possible values: 'dots', 'progress'
        // CLI --reporters progress
        // reporters: ['progress', 'junit'], // with jUnit output
        reporters: ['mocha'],

        junitReporter: {
            // will be resolved to basePath (in the same way as files/exclude patterns)
            outputFile: 'test-results.xml'
        },

        // web server port
        // CLI --port 9876
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        // CLI --colors --no-colors
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        // CLI --log-level debug
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        // CLI --auto-watch --no-auto-watch
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        // CLI --browsers Chrome,Firefox,Safari
//        browsers: [process.env.TRAVIS ? 'Firefox' : 'Chrome', 'PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        // CLI --capture-timeout 5000
        captureTimeout: 20000,

        // report which specs are slower than 500ms
        // CLI --report-slower-than 500
        reportSlowerThan: 500,

        plugins: [
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-junit-reporter',
            'karma-mocha-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('appTemplates')
            moduleName: 'appTemplates'
        }
    });
};
