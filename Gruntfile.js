module.exports = function (grunt) {
  var app = {},
      config = {},
      tasks  = [
        'grunt-contrib-jasmine',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-coveralls'
      ];

  // config pack name
  app.pack = grunt.config('pkg', grunt.file.readJSON('package.json'));

  // config banner
  app.banner =  '/** ' + app.pack.name + ' -v' + app.pack.version + 
                '\n* Copyright (c) '+ grunt.template.today('yyyy') + ' ' + app.pack.author +
                '\n* Licensed ' + grunt.config('pkg').license + '\n*/\n\n';

  // # jshint
  config.jshint = {
    estrada: {
      src: [
        'Gruntfile.js',
        'src/*.js'
      ]
    }
  };

  // # uglify
  config.uglify = {
    options: {
      banner: app.banner
    },
    scripts: {
      files: {
        'dist/estrada.min.js': 'src/estrada.js'
      }
    }
  };

  // # jasmine
  config.jasmine = {};
  config.jasmine.coverage = {
    src: [
      'dist/estrada.min.js'
    ],
    options: {
      specs: 'specs/*.js',
      template: require('grunt-template-jasmine-istanbul'),
      templateOptions: {
        coverage: 'bin/coverage/coverage.json',
        report: {
          type: 'lcov',
          options: {
            dir: 'bin/coverage'
          }
        },
        thresholds: {
          lines: 75,
          statements: 75,
          branches: 75,
          functions: 90
        }
      }
    }
  };

  // # coveralls
  config.coveralls = {
    src: 'bin/coverage/lcov.info'
  };

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

  // init grunt config
  grunt.initConfig(config);

  // main tasks
  grunt.registerTask('test', [
    'jshint',
    'jasmine'
  ]);

  grunt.registerTask('build', [
    'test',
    'uglify'
  ]);

  grunt.registerTask('ci', [
    'jshint',
    'jasmine',
    'coveralls'
  ]);

};
