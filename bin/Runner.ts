#!/usr/bin/env node

// tslint:disable:no-console
// tslint:disable:no-var-requires

import {BadgeGenerator} from "../lib/BadgeGenerator";

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error(`earl-badge creates an SVG badge for a given EARL file

Usage:
  earl-badge earl-report.ttl
`);
  process.exit(1);
}

const badgeGenerator = new BadgeGenerator();
const svg = badgeGenerator.createSvgBadge({
  label: 'JSON-LD',
  value: '100%',
});
console.log(svg);
