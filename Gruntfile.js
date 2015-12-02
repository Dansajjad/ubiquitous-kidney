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
          'app/assets/styles/*.css',
          'app/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'app/assets/icons/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
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
            'app'
          ]
        }
      },
      test: {
        options: {
          port: 9001,
          base: [
            'test',
            'app'
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
        'watch:livereload',
        'watch:js'
      ]
    },
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('serve', function () {
    var request = require('request'),
      open = require('open'),
      url = 'http://localhost:9000',
      interval;

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
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
