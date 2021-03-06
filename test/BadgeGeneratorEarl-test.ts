import {join} from "path";
import {BadgeGeneratorEarl} from "../lib/BadgeGeneratorEarl";

describe('BadgeGeneratorEarl', () => {

  const generator: BadgeGeneratorEarl = new BadgeGeneratorEarl();

  describe('#createSvgBadge', () => {

    it('should generate SVG contents for a full file', async () => {
      expect(await generator.createSvgBadge({
        filePath: join(__dirname, 'assets', 'earl-ex.ttl'),
        specName: 'JSON-LD 1.1',
        testSubject: 'https://www.npmjs.com/package/jsonld-streaming-parser/',
      })).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="152" height="20">
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <rect rx="3" width="152" height="20" fill="#555"/>
    <rect rx="3" x="96" width="56" height="20" fill="#97ca00"/>
    <path fill="#97ca00" d="M96 0h4v20h-4z"/>
    <rect rx="3" width="152" height="20" fill="url(#a)"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="48" y="15" fill="#010101" fill-opacity=".3">JSON-LD 1.1</text>
        <text x="48" y="14">JSON-LD 1.1</text>
        <text x="124" y="15" fill="#010101" fill-opacity=".3">98.92%</text>
        <text x="124" y="14">98.92%</text>
    </g>
</svg>`);
    });

  });

});
