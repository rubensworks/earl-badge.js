import {createReadStream} from "fs";
import {BadgeGenerator} from "./BadgeGenerator";
import {EarlParser} from "./EarlParser";
import {Util} from "./Util";

/**
 * Generates a badge for an EARL report.
 */
export class BadgeGeneratorEarl {

  private readonly earlParser = new EarlParser();
  private readonly badgeGenerator = new BadgeGenerator();

  /**
   * Generates the text contents for an SVG badge showing the spec compliance of test subject within a given EARL file.
   * @param {{specName: string; testSubject: string; filePath: string}} options Options.
   * @returns {Promise<string>} A promise resolving to an SVG file's text contents.
   */
  public async createSvgBadge(options: { specName: string, testSubject: string, filePath: string }): Promise<string> {
    const { compliance } = await this.earlParser.parse(options.testSubject,
      createReadStream(options.filePath), options.filePath);
    return this.badgeGenerator.createSvgBadge({
      label: options.specName,
      value: (compliance * 100).toFixed(2) + '%',
      valueColor: Util.pickColor(compliance),
    });
  }

}
