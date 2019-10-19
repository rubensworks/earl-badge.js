export class Util {

  private static LEVELS: {[limit: number]: string} = {
    1: '4c1',
    0.9: '97ca00',
    0.7: 'dfb317',
    0.5: 'e05d44',
  };

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
