import {BadgeGenerator} from "../lib/BadgeGenerator";

describe('BadgeGenerator', () => {

  describe('with default options', () => {
    const generator: BadgeGenerator = new BadgeGenerator();

    describe('#createSvgBadge', () => {

      it('should generate SVG contents', async () => {
        expect(generator.createSvgBadge({
          label: 'MyLabel',
          value: 'MyValue',
          valueColor: 'FFFFFF',
        })).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="20">
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <rect rx="3" width="128" height="20" fill="#555"/>
    <rect rx="3" x="64" width="64" height="20" fill="#FFFFFF"/>
    <path fill="#FFFFFF" d="M64 0h4v20h-4z"/>
    <rect rx="3" width="128" height="20" fill="url(#a)"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="32" y="15" fill="#010101" fill-opacity=".3">MyLabel</text>
        <text x="32" y="14">MyLabel</text>
        <text x="96" y="15" fill="#010101" fill-opacity=".3">MyValue</text>
        <text x="96" y="14">MyValue</text>
    </g>
</svg>`);
      });

    });
  });

  describe('with increased height', () => {
    const generator: BadgeGenerator = new BadgeGenerator({ height: 40 });

    describe('#createSvgBadge', () => {

      it('should generate SVG contents', async () => {
        expect(generator.createSvgBadge({
          label: 'MyLabel',
          value: 'MyValue',
          valueColor: 'FFFFFF',
        })).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="128" height="40">
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <rect rx="3" width="128" height="40" fill="#555"/>
    <rect rx="3" x="64" width="64" height="40" fill="#FFFFFF"/>
    <path fill="#FFFFFF" d="M64 0h4v20h-4z"/>
    <rect rx="3" width="128" height="40" fill="url(#a)"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="32" y="15" fill="#010101" fill-opacity=".3">MyLabel</text>
        <text x="32" y="14">MyLabel</text>
        <text x="96" y="15" fill="#010101" fill-opacity=".3">MyValue</text>
        <text x="96" y="14">MyValue</text>
    </g>
</svg>`);
      });

    });
  });

  describe('with increased height and width', () => {
    const generator: BadgeGenerator = new BadgeGenerator({ height: 40, widthFactor: 10 });

    describe('#createSvgBadge', () => {

      it('should generate SVG contents', async () => {
        expect(generator.createSvgBadge({
          label: 'MyLabel',
          value: 'MyValue',
          valueColor: 'FFFFFF',
        })).toEqual(`<svg xmlns="http://www.w3.org/2000/svg" width="160" height="40">
    <linearGradient id="a" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>
    <rect rx="3" width="160" height="40" fill="#555"/>
    <rect rx="3" x="80" width="80" height="40" fill="#FFFFFF"/>
    <path fill="#FFFFFF" d="M80 0h4v20h-4z"/>
    <rect rx="3" width="160" height="40" fill="url(#a)"/>
    <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="11">
        <text x="40" y="15" fill="#010101" fill-opacity=".3">MyLabel</text>
        <text x="40" y="14">MyLabel</text>
        <text x="120" y="15" fill="#010101" fill-opacity=".3">MyValue</text>
        <text x="120" y="14">MyValue</text>
    </g>
</svg>`);
      });

    });
  });

});
