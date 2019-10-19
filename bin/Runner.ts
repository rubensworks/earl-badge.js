#!/usr/bin/env node

// tslint:disable:no-console
// tslint:disable:no-var-requires

import {createReadStream} from "fs";
import {BadgeGenerator} from "../lib/BadgeGenerator";
import {EarlParser} from "../lib/EarlParser";
import {Util} from "../lib/Util";

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error(`earl-badge creates an SVG badge for a given EARL file

Usage:
  earl-badge Spec-Name http://example.org/mysoftwaresubject earl-report.ttl
`);
  process.exit(1);
}

(async function run() {
  const earlParser = new EarlParser();
  const { compliance } = await earlParser.parse(args[1], createReadStream(args[2]), args[2]);

  const badgeGenerator = new BadgeGenerator();
  const svg = badgeGenerator.createSvgBadge({
    label: args[0],
    value: (compliance * 100).toFixed(2) + '%',
    valueColor: Util.pickColor(compliance),
  });
  console.log(svg);
})();
