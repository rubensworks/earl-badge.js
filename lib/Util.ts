/**
 * Utility functions
 */
export class Util {

  /**
   * Colors for factors, with the upper limit of the factors as keys.
   */
  private static LEVELS: {[limit: number]: string} = {
    1: '4c1',
    0.99: '97ca00',
    0.7: 'dfb317',
    0.5: 'e05d44',
  };

  /**
   * Determine a color for the given factor.
   * @param {number} factor A value from 0 to 1 (inclusive)
   * @returns {string} A HEX color string.
   */
  public static pickColor(factor: number): string {
    let color: string;
    for (const limit in Util.LEVELS) {
      if (factor <= parseFloat(limit)) {
        color = Util.LEVELS[limit];
      }
    }
    return color;
  }

}
