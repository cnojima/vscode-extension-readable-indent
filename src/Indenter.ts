import { WorkspaceConfiguration } from "vscode";

class Indenter {
  private loc: string[][] = [[]];
  private locRaw: string[];
  // private originalCode: String;
  private initialIndent: string|null = null;
  private _pivot: Boolean = false;
  private pivotIndex: number = 0;
  private pivotIndexAlt: number = 0;
  private pivotSeparator: string = '=';

  constructor(code: string) {
    // this.originalCode = code;
    this.locRaw = code.split(/[\n]/);

    // console.log(code);
    // console.log(`${this.locRaw.length} lines after split op`);
    // console.log(this.locRaw);

    this.determineIndentType();
    this.findPivot();
    this.indent();
  }

  private determineIndentType(): void {
    let colonFound = 0;
    let equalFound = 0;

    this.locRaw.forEach(line => {
      line = this.cleanRightWhitespace(line);
      let eqIdx = line.indexOf('=');
      let coIdx = line.indexOf(':');

      eqIdx = eqIdx > -1 ? eqIdx : 100000;
      coIdx = coIdx > -1 ? coIdx : 100000;

      if (eqIdx < coIdx) {
        equalFound++;
      } else if (coIdx < eqIdx) {
        colonFound++;
      }

      // determine min of indent/whitespace
      const indent = line.substr(0, line.search(/\S/));
      if (indent.length > 0 && (!this.initialIndent || (indent.length < this.initialIndent.length))) {
        this.initialIndent = indent;

        console.log(`${indent.length}[${indent}]`)
      }
    });

    this.pivotSeparator = (colonFound > equalFound)
      ? ":" : "=";
  }

  private cleanRightWhitespace(line: string): string {
    line = line.replace(/\s+$/g, '');
    return line;
  }

  private findPivot() {
    this.loc = this.locRaw.map(line_s => {
      const line = [
        this.cleanRightWhitespace(line_s.substr(0, line_s.indexOf(this.pivotSeparator))),
        line_s.substr(line_s.indexOf(this.pivotSeparator) + 1),
      ];
      this.pivotIndex = line[0].length > this.pivotIndex ? line[0].length : this.pivotIndex;
      return line;
    });
  }

  public set pivot(onPivot: boolean) {
    this._pivot = onPivot;
  }

  public indent(): string {
    const joined: String[] = [];

    this.loc.map(line => {
      if(line[0] && line[1]) {
        if (this._pivot) {
          joined.push([line[0].trim().padStart(this.pivotIndex, ' '), this.pivotSeparator, line[1].trim()].join(' '));
        } else {
          joined.push([this.initialIndent, line[0].trim().padEnd(this.pivotIndex, ' '), this.pivotSeparator, line[1].trim()].join(' '));
        }
      } else {
        joined.push(line.join('').replace(/[\n|\r]/gm, ''));
      }
    });

    return joined.join('\n');
  }
}

export default Indenter;