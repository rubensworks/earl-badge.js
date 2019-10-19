#!/usr/bin/env node

// tslint:disable:no-console
// tslint:disable:no-var-requires

import {createReadStream} from "fs";
import {BadgeGenerator} from "../lib/BadgeGenerator";
import {EarlParser} from "../lib/EarlParser";

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error(`earl-badge creates an SVG badge for a given EARL file

Usage:
  earl-badge http://example.org/mysoftwaresubject earl-report.ttl Spec-Name
`);
  process.exit(1);
}

(async function run() {
  const earlParser = new EarlParser();
  const { compliance } = await earlParser.parse(args[0], createReadStream(args[1]), args[1]);

  const badgeGenerator = new BadgeGenerator();
  const svg = badgeGenerator.createSvgBadge({
    label: args[2],
    value: compliance.toFixed(2) + '%',
  });
  console.log(svg);
})();
