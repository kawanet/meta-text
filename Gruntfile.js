/*! Gruntfile.js */

module.exports = function(grunt) {

  var pkg = require('./package.json');

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-mocha-test');

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
    },

    // https://github.com/jmreidy/grunt-browserify
    browserify: {
      all: {
        files: {
          './build/meta-text.browserify.js': ['./index.js']
        },
        options: {
          standalone: 'metatext'
        }
      }
    },

    // https://github.com/gruntjs/grunt-contrib-uglify
    uglify: {
      all: {
        files: {
          './build/meta-text.min.js': ['./build/meta-text.browserify.js']
        },
        options: {
          banner: '/*! ' + pkg.name + ' ' + pkg.version + ' */\n'
        }
      }
    },

    // tasks/quote-json.js
    quoteJson: {
      bower: {
        src: 'package.json',
        dest: 'bower.json',
        options: {
          fields: {
            name: 1,
            version: 1,
            homepage: 1,
            description: 1,
            repository: 1
          }
        }
      }
    }
  });

  grunt.registerTask('build', ['quoteJson', 'browserify', 'uglify']);
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
