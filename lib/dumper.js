/*! dumper.js */

var dumper = require('js-yaml/lib/js-yaml/dumper');

exports.dump = function(input, options) {
  options = options || {};
  var headkey = options.meta_key || '';
  var bodykey = options.body_key || 'body';

  var body = input[bodykey];
  var data = (headkey !== '') ? input[headkey] : input;
  var hasText = ('undefined' !== typeof body);
  if (hasText) delete input[bodykey];
  var encoded;
  if (options.out_json) {
    encoded = JSON.stringify(data, null, options.json_spacer) + '\n';
  } else {
    encoded = dumper.dump(data);
  }
  if (hasText) input[bodykey] = body;

  var prefix = '---\n';
  var suffix = '\n---\n\n';
  if (options.out_html) {
    prefix = '<!---\n';
    suffix = '-->\n\n';
  }
  var result = prefix + encoded + suffix + body;
  return result;
};
