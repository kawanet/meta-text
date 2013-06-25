/*! roundtrip.test.js */

var fs = require('fs');
var assert = require('assert');
var yamltext = require('../');

describe(__filename.replace(/.*\//, ''), function() {
  tests();
  tests({
    out_json: true
  });
  tests({
    out_html: true,
  });
  tests({
    out_json: true,
    out_html: true
  });
});

function tests(options) {
  var title = JSON.stringify(options) || 'default';
  describe(title, function() {

    it('header and body', function(done) {
      var data = {
        head: 'foo',
        body: 'bar'
      };
      var dump = yamltext.dump(data, options);
      assert(dump, 'dump should not return empty');
      var part = dump.split(/\s*(?:<!)?--+>?\s*/);
      var head = part[1] || '';
      var body = part[2] || '';
      assert(head.search(/foo/) > -1, '"foo" should be found at header: ' + head);
      assert(body.search(/bar/) > -1, '"bar" should be found at body: ' + body);
      var load = yamltext.load(dump, options);
      assert(load, 'load should not return empty');
      assert(load.head == data.head, 'header roundtrip should success');
      assert(load.body == data.body, 'body roundtrip should success');
      done();
    });

    it('header only', function(done) {
      var data = {
        head: 'foo'
      };
      var dump = yamltext.dump(data, options);
      assert(dump, 'dump should not return empty');
      var part = dump.split(/\s*(?:<!)?--+>?\s*/);
      var head = part[1] || '';
      assert(head.search(/foo/) > -1, '"foo" should be found at header: ' + head);
      var load = yamltext.load(dump, options);
      assert(load, 'load should not return empty');
      assert(load.head == data.head, 'header roundtrip should success');
      done();
    });

    it('body only', function(done) {
      var data = {
        body: 'bar'
      };
      var dump = yamltext.dump(data, options);
      assert(dump, 'dump should not return empty');
      var part = dump.split(/\s*(?:<!)?--+>?\s*/);
      var body = part[part.length - 1] || '';
      assert(body.search(/bar/) > -1, '"bar" should be found at body: ' + body);
      var load = yamltext.load(dump, options);
      assert(load, 'load should not return empty');
      assert(load.body == data.body, 'body roundtrip should success');
      done();
    });
  });
}
