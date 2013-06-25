# meta-text

parse() and dump() YAML/JSON metadata combined with text content

## SYNOPSIS

```js
var metatext = require('meta-text');

var data = {
  title: "hello",
  author: "kawanet",
  body: "Hello, meta-text!"
};
var yaml = metatext.dump(data);
console.log(yaml);          // => YAML

var decoded = metatext.load(yaml);
console.log(decoded.body); // "Hello, meta-text!"
```

Available options as below:

```js
var metatext = require('meta-text');

var data = {
  meta: {
    title: "hello",
    author: "kawanet",
  },
  content: "Hello, meta-text!"
};
var options = {
  meta_key: "meta",        // default: "" (root)
  body_key: "content",     // default: "body"
  out_json: true,          // default: false (YAML metadata vs JSON metadata)
  out_html: true,          // default: false (YAML container vs HTML container)
  json_spacer: 1           // default: null (no indent)
};
var html = metatext.dump(data, options);
console.log(html);         // => HTML

var decoded = metatext.load(html);
console.log(decoded.body); // "Hello, meta-text!"
```

## FORMATS

### YAML + Text (default)

The default format of `meta-text` module is YAML metadata in YAML container.
The [three dashes](http://www.yaml.org/spec/1.2/spec.html#id2760395) `---` mean a document separator.
The first document represents metadata for the item.
The second payload represents the content body of the item.
If an item does not start with three dashes, it means it has no metadata but has only content body.
Note that [Jelyll](http://jekyllrb.com/docs/frontmatter/) uses the same format.

```yaml
---
title: hello
author: kawanet
---

# Hello, YAML!

This documents contains a YAML metadata on top of text content.
```

### JSON + Text

JSON metadata is also available, hence
[all JSON is valid YAML](http://viewsourcecode.org/why/redhanded/inspect/yamlIsJson.html).

```yaml
---
{"title":"hello","author":"kawanet"}
---

# Hello, JSON!

This documents contains a JSON metadata on top of text content.
```

Enable `use_json` option to dump as this format.

### YAML on HTML

If you prefer HTML rather than plain text or markdown?
`meta-text` also accepts a HTML-container format which metadata are wrapped with
`<!---` prefix and `-->` suffix on top of HTML.
Prefix still needs three dashes. Suffix must have two dashes.

```html
<!---
title: hello
author: kawanet
-->

<h1>Hello, HTML!</h1>

<p>This documents contains a YAML metadata on top of HTML content.</p>
```

Enable `use_html` option to dump as this format.

### JSON on HTML

As mentioned, JSON is available as a variation of an inline YAML.

```html
<!---
{"title":"hello","author":"kawanet"}
-->

<h1>Hello, HTML!</h1>

<p>This documents contains a JSON metadata on top of HTML content.</p>
```

Enable both `use_json` and `use_html` options to dump as this format.

## LINKS

### Sources

https://github.com/kawanet/meta-text

### Author

https://github.com/kawanet

## LICENCE

Copyright 2013 @kawanet

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
