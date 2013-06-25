/*! dump.test.js */

var fs = require('fs');
var assert = require('assert');
var yamltext = require('../');

describe(__filename.replace(/.*\//, ''), function() {
  tests();
  tests({
    out_json: true
  });
  tests({
    out_json: true,
    json_spacer: ' '
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

    var opts = options || {};

    if (opts.out_json) {
      it('JSON format', function(done) {
        var head = dump_head(opts);
        assert(head.search(/\{/) > -1, 'header should be JSON encoded: ' + head);
        var data = JSON.parse(head) || {};
        assert(data.head == 'foo', 'JSON should contain valid data: ' + head);
        if (opts.json_spacer) {
          assert(head.search(/":\s+"/) > -1, 'JSON should have spacers: ' + head);
        } else {
          assert(head.search(/":"/) > -1, 'JSON should not have a spacer: ' + head);
        }
        done();
      });
    }

    if (!opts.out_json) {
      it('YAML format', function(done) {
        var head = dump_head(opts);
        assert(head.search(/\{/) < 0, 'header should be YAML encoded: ' + head);
        done();
      });
    }
  });
}

function dump_head(opts) {
  var data = {
    head: 'foo'
  };
  var dump = yamltext.dump(data, opts);
  assert(dump, 'dump should not return empty');
  var part = dump.split(/\s*(?:<!)?--+>?\s*/);
  var head = part[1] || '';
  return head;
}
