#!/usr/bin/env node

// tslint:disable:no-console
// tslint:disable:no-var-requires

import {BadgeGeneratorEarl} from "../lib/BadgeGeneratorEarl";

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error(`earl-badge creates an SVG badge for a given EARL file

Usage:
  earl-badge Spec-Name http://example.org/mysoftwaresubject earl-report.ttl
`);
  process.exit(1);
}

(async function run() {
  const svg = await new BadgeGeneratorEarl().createSvgBadge({
    filePath: args[2],
    specName: args[0],
    testSubject: args[1],
  });
  console.log(svg);
})();
