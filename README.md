# EARL-Badge.js

[![Build Status](https://travis-ci.org/rubensworks/earl-badge.js.svg?branch=master)](https://travis-ci.org/rubensworks/earl-badge.js)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/earl-badge.js/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/earl-badge.js?branch=master)
[![npm version](https://badge.fury.io/js/earl-badge.svg)](https://www.npmjs.com/package/earl-badge)

This tool creates SVG badges for [EARL](https://www.w3.org/TR/EARL10-Schema/) test reports,
for representing the specification compliance of a certain tool.
These badges represent the percentage of passed tests for a specification's test suite for a given tool.

For example, a badge representing the JSON-LD 1.1 spec compliance could look as follows:

![EARL badge example](https://raw.githubusercontent.com/rubensworks/earl-badge.js/master/badge-example.svg?sanitize=true)

These EARL reports can be generated using a variety of tools in different programming languages,
such as [rdf-test-suite.js](https://github.com/rubensworks/rdf-test-suite.js).

## Installation

### Global

This allows the tool to be used from the CLI.

```bash
$ yarn global add earl-badge
```

or

```bash
$ npm install -g earl-badge
```

### Local

This allows the tool to be used as a library.

```bash
$ yarn add earl-badge
```

or

```bash
$ npm install earl-badge
```

## Usage

This tool can either be used to generate SVG files from command line,
or from code.

### CLI

This tool assumes that you have an [EARL](https://www.w3.org/TR/EARL10-Schema/) test report file for a tool.

Assuming that you have an EARL file at `mytool-earl.ttl`,
where your tool is identified in the EARL file by `http://example.org/mytool`,
and your tool implements the `JSON-LD 1.1` specification,
you can execute this tool as follows:

```
$ earl-badge "JSON-LD 1.1" http://example.org/mytool mytool-earl.ttl
``` 

This tool supports EARL files in most RDF serializations,
as long as they are supported by [`rdf-parse`](https://github.com/rubensworks/rdf-parse.js).

### Code

The SVG generation can also be called from code as follows:
```javascript
import { BadgeGeneratorEarl } from "earl-badge";

const svgString = await new BadgeGeneratorEarl().createSvgBadge({
  filePath: 'mytool-earl.ttl',
  specName: 'JSON-LD 1.1',
  testSubject: 'http://example.org/mytool',
});
```


## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
