/*jshint node:true*/
'use strict';
module.exports = function (grunt) {
  var sourceFiles = ['Gruntfile.js', 'app/**/*.js', 'test/spec/{,*/}*.js', '!app/bower_components/**/*.js'];

  require('jit-grunt')(grunt, {});

  grunt.initConfig({
    watch: {
      options: { spawn: false },
      js: {
        files: sourceFiles,
        tasks: ['newer:jshint', 'newer:jscs', 'karma']
      },
      livereload: {
        options: {
          livereload: {}
        },
        files: [
          'app/{,*/}{,*/}*.html',
          'app/{,*/}{,*/}*.js',
          '!app/bower_components/**'
        ]
      }
    },
    connect: {
      options: {
        port: 9000,
        protocol: 'http',
        hostname: '0.0.0.0',
        middleware: function (connect, options) {
          var middlewares = [], serveStatic = require('serve-static');
          if (!Array.isArray(options.base)) {
            options.base = [options.base];
          }
          options.base.forEach(function (base) {
            middlewares.push(serveStatic(base));
          });
          return middlewares;
        }
      },
      livereload: {
        options: {
          livereload: 35729,
          base: [
            'app',
            'test'
          ]
        }
      }
    },
    jscs: {
      options: { config: '.jscsrc' },
      files: {
        src: sourceFiles
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      files: {
        src: sourceFiles
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      watch: [
        'watch:livereload'
        // 'watch:js'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('default', function () {
    var request = require('request'),
      open = require('open'),
      url = 'http://localhost:9000',
      interval;

    interval = setInterval(function () {
      request('http://localhost:35729', function (err) {
        if (!err && interval) {
          open(url);
          clearInterval(interval);
          interval = undefined;
        }
      });
    }, 100);

    grunt.task.run([
      'connect:livereload',
      'concurrent:watch'
    ]);
  });

  grunt.registerTask('test', [
    'jshint',
    'jscs',
    'karma'
  ]);
};
