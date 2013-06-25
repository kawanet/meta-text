/*! load-yaml.test.js */

var fs = require('fs');
var assert = require('assert');
var yamltext = require('../');
var path = __dirname + '/data/';

describe(__filename.replace(/.*\//, ''), function() {
  tests();
});

function tests(options) {
  var title = JSON.stringify(options) || 'default';
  describe(title, function() {

    var hello_yaml = 'hello.yaml';
    it(hello_yaml, function(done) {
      var src = fs.readFileSync(path + hello_yaml, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.type, 'should have type property');
      assert(dst.type == 'hello_yaml', 'should have correct property');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/Hello,/) > -1, 'should contain correct body');
      done();
    });

    var empty_header = 'empty-header.yaml';
    it(empty_header, function(done) {
      var src = fs.readFileSync(path + empty_header, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/empty_header/) > -1, 'should contain correct body');
      done();
    });

    var no_body = 'no-body.yaml';
    it(no_body, function(done) {
      var src = fs.readFileSync(path + no_body, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.type, 'should have type property');
      assert(dst.type == 'no_body', 'should have correct property');
      assert(!dst.body, 'should not have body');
      done();
    });

    var no_header = 'no-header.yaml';
    it(no_header, function(done) {
      var src = fs.readFileSync(path + no_header, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/no_header/) > -1, 'should contain correct body');
      done();
    });

    var no_suffix = 'no-suffix.yaml';
    it(no_suffix, function(done) {
      var src = fs.readFileSync(path + no_suffix, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.type, 'should have type property');
      assert(dst.type == 'no_suffix', 'should have correct property');
      assert(!dst.body, 'should not have body');
      done();
    });

    var hello_json = 'hello-json.txt';
    it(hello_json, function(done) {
      var src = fs.readFileSync(path + hello_json, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.type, 'should have type property');
      assert(dst.type == 'hello_json', 'should have correct property');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/Hello,/) > -1, 'should contain correct body');
      done();
    });
  });
}
