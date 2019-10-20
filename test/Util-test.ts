import {Util} from "../lib/Util";

describe('Util', () => {

  describe('#pickColor', () => {

    it('should pick the correct color for different factors', () => {
      expect(Util.pickColor(0)).toBe('e05d44');
      expect(Util.pickColor(0.1)).toBe('e05d44');
      expect(Util.pickColor(0.4)).toBe('e05d44');
      expect(Util.pickColor(0.5)).toBe('e05d44');
      expect(Util.pickColor(0.6)).toBe('dfb317');
      expect(Util.pickColor(0.7)).toBe('dfb317');
      expect(Util.pickColor(0.8)).toBe('97ca00');
      expect(Util.pickColor(0.9)).toBe('97ca00');
      expect(Util.pickColor(0.99)).toBe('97ca00');
      expect(Util.pickColor(1)).toBe('4c1');
    });

  });

});
