/*! Gruntfile.js */

module.exports = function(grunt) {

  var pkg = require('./package.json');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-jsdoc');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.loadTasks('./tasks');

  var jshint_src = [
      './*.js',
      'lib/**/*.js',
      'test/**/*.js',
      'test/**/*.json'
  ];

  grunt.initConfig({

    // https://github.com/gruntjs/grunt-contrib-jshint
    jshint: {
      all: {
        src: jshint_src
      },
      options: {
        "node": true,
        "browser": true,
        "bitwise": true,
        "noarg": true,
        "regexp": true,
        "undef": true,
        "eqnull": true,
        "globals": {
          describe: true, // mocha
          it: true
        }
      }
    },

    // https://github.com/pghalliday/grunt-mocha-test
    mochaTest: {
      all: {
        src: ['test/**/*.test.js']
      },
      options: {
        reporter: 'spec'
      }
    }
  });

  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
