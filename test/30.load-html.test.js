/*! load-html.test.js */

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

    var hello_html = 'hello.html';
    it(hello_html, function(done) {
      var src = fs.readFileSync(path + hello_html, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.type, 'should have type property');
      assert(dst.type == 'hello_html', 'should have correct property');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/Hello,/) > -1, 'should contain correct body');
      done();
    });

    var empty = 'empty-header.html';
    it(empty, function(done) {
      var src = fs.readFileSync(path + empty, 'utf-8');
      assert(src, 'source should not be empty');
      var dst = yamltext.load(src, options);
      assert(dst, 'load() should return result');
      assert(dst.body, 'should have body');
      assert(dst.body.search(/empty_header/) > -1, 'should contain correct body');
      done();
    });

    var hello_json = 'hello-json.html';
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
