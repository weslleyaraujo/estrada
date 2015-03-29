module.exports = function (grunt) {
  var app = {},
      config = {},
      tasks  = [
        'grunt-contrib-jasmine',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify'
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

  // load tasks
  tasks.forEach(grunt.loadNpmTasks);

  // init grunt config
  grunt.initConfig(config);

  // main tasks
  grunt.registerTask('test', [
    'jshint'
  ]);

  grunt.registerTask('build', [
    'uglify'
  ]);

};
