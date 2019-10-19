# EARL-Badge.js

[![Build Status](https://travis-ci.org/rubensworks/earl-badge.js.svg?branch=master)](https://travis-ci.org/rubensworks/earl-badge.js)
[![Coverage Status](https://coveralls.io/repos/github/rubensworks/earl-badge.js/badge.svg?branch=master)](https://coveralls.io/github/rubensworks/earl-badge.js?branch=master)
[![npm version](https://badge.fury.io/js/earl-badge.svg)](https://www.npmjs.com/package/earl-badge) [![Greenkeeper badge](https://badges.greenkeeper.io/rubensworks/earl-badge.js.svg)](https://greenkeeper.io/)

This tool creates SVG badges for [EARL](https://www.w3.org/TR/EARL10-Schema/) test reports
for representing the specification compliance of a certain tool.

For example, a badge representing the JSON-LD 1.1 spec compliance could look as follows:

![npm version](badge-example.svg)

## Installation

```bash
$ yarn global add earl-badge
```

or

```bash
$ npm install -g earl-badge
```

## Usage

This tool assumes that you have an  [EARL](https://www.w3.org/TR/EARL10-Schema/) test report file for a tool.

Assuming that you have an EARL file at `mytool-earl.ttl`,
where your tool is identified in the EARL file by `http://example.org/mytool`,
and your tool implements the `JSON-LD 1.1` specification,
you can execute this tool as follows:

```
$ earl-badge "JSON-LD 1.1" http://example.org/mytool mytool-earl.ttl
``` 

This tool supports EARL files in most RDF serializations,
as long as they are supported by [`rdf-parse`](https://github.com/rubensworks/rdf-parse.js).

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).
