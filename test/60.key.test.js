/*! key.test.js */

var fs = require('fs');
var assert = require('assert');
var yamltext = require('../');

describe(__filename.replace(/.*\//, ''), function() {
  tests({
    meta_key: 'header',
    body_key: 'content'
  });

  tests({
    meta_key: 'header',
    body_key: 'content',
    out_json: true,
    out_html: true
  });
});

function tests(options) {
  var title = JSON.stringify(options) || 'default';
  describe(title, function() {

    var data = {
      header: {
        name: 'foo'
      },
      content: 'bar'
    };

    var dump;

    it('dump', function(done) {
      dump = yamltext.dump(data, options);
      assert(dump, 'dump should not return empty');
      var part = dump.split(/\s*(?:<!)?--+>?\s*/);
      var head = part[1] || '';
      var body = part[2] || '';
      assert(head.search(/foo/) > -1, '"foo" should be found at header: ' + head);
      assert(body.search(/bar/) > -1, '"bar" should be found at body: ' + body);
      done();
    });

    it('load', function(done) {
      var load = yamltext.load(dump, options);
      assert(load, 'load should not return empty');
      assert('object' == typeof load.header, 'header should be an object');
      assert(load.header.name == data.header.name, 'header roundtrip should success');
      assert(load.content == data.content, 'content roundtrip should success');
      done();
    });
  });
}
