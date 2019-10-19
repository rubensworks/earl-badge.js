import {readFileSync} from "fs";
import {join} from "path";

export class BadgeGenerator {

  private readonly widthFactor: number;
  private readonly height: number;
  private readonly template: string;

  constructor(options: { height: number; widthFactor?: number } = { height: 20, widthFactor: 8 }) {
    this.height = options.height;
    this.widthFactor = options.widthFactor || 8;
    this.template = readFileSync(join(__dirname, 'template.svg'), 'utf8');
  }

  public createSvgBadge(badgeData: IBadgeData): string {
    let badge = this.template;

    const width = (badgeData.label.length + 2 + badgeData.value.length) * this.widthFactor;
    const widthLabel = (badgeData.label.length + 1) * this.widthFactor;
    const widthValue = width - widthLabel;

    badge = badge.replace(/__WIDTH__/g, width.toString());
    badge = badge.replace(/__WIDTH_LABEL__/g, widthLabel.toString());
    badge = badge.replace(/__WIDTH_VALUE__/g, widthValue.toString());
    badge = badge.replace(/__LABEL_X__/g, (widthLabel / 2).toString());
    badge = badge.replace(/__VALUE_X__/g, (widthLabel + widthValue / 2).toString());
    badge = badge.replace(/__HEIGHT__/g, this.height.toString());
    badge = badge.replace(/__LABEL__/g, badgeData.label);
    badge = badge.replace(/__VALUE__/g, badgeData.value);
    badge = badge.replace(/__VALUE_COLOR__/g, badgeData.valueColor);
    return badge;
  }

}

export interface IBadgeData {
  label: string;
  value: string;
  valueColor: string;
}
