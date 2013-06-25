/*! loader.js */

var loader = require('js-yaml'); // require('js-yaml/lib/js-yaml/loader');

exports.load = function(input, options) {
  options = options || {};
  if (input == null) return;
  input = input + ''; // stringify
  var prefix = /(^|[\r\n]+)(<!)?---\s*([\r\n]+|$)/;
  var suffix;
  var head;
  var body;
  var data;
  var headkey = options.meta_key || '';
  var bodykey = options.body_key || 'body';
  var result = {};
  var pos = input.search(prefix);
  if (pos > -1) {
    if (input.search(/^\s*</) > -1) {
      // HTML container
      suffix = /(^|[\r\n]+)-->\s*([\r\n]+|$)/;
    } else {
      // YAML container
      suffix = /(^|[\r\n]+)---\s*(\|\s*)?([\r\n]+|$)/;
    }
    input = input.replace(prefix, '');
    pos = input.search(suffix);
    if (pos > -1) {
      // prefix-yaml-suffix-body
      head = input.substr(0, pos);
      body = input.substr(pos).replace(suffix, '');
    } else {
      // prefix-yaml (no body)
      head = input;
    }
  } else {
    // body (no yaml)
    body = input;
  }
  if (head != null) {
    data = loader.load(head);
    if (data != null) {
      if (headkey === '') {
        result = data;
      } else {
        result[headkey] = data;
      }
    }
  }
  if (body != null) {
    result[bodykey] = body;
  }
  return result;
};
