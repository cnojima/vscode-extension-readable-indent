import { TextEditorOptions, WorkspaceConfiguration } from "vscode";
import customAlphaSort from './util/alpha-sort';

/**
 * Indenter
 */
class Indenter {
  /**
   * Loc raw of indenter
   */
  private _centerJustify     : boolean = false;
  private alphabetize        : boolean;
  private locRaw             : string[];
  private loc                : string[][] = [[]];
  private initialIndent      : string = '';
  private padChar            : string = ' ';
  private pivotIndex         : number = 0;
  private pivotIndexAlt      : number = 0;
  private pivotSeparator     : string = '=';
  private _textEditorOptions : TextEditorOptions = {
    tabSize : 2
  };

  constructor(code: string, config: WorkspaceConfiguration | { alphabetize: boolean }) {
    this.locRaw = code.split(/[\n]/);
    this.alphabetize = config.alphabetize;
  }

  private sortLines(): void {
    // alpha sort if configuration is set
    if (this.alphabetize === true) {
      this.locRaw = customAlphaSort(this.locRaw);
    }
  }

  /**
   * Determines indent type: `=` or `:` (currently supported)
   */
  private determineIndentType(): void {
    let colonFound = 0;
    let equalFound = 0;
    let tabSize: number = 4;

    // convert tabs to spaces
    if (typeof this._textEditorOptions.tabSize === 'number') {
      tabSize = this._textEditorOptions.tabSize;
    }

    this.locRaw.forEach(line => {
      line = this.cleanRightWhitespace(line);
      line = line.replace(/\t/g, ''.padEnd(tabSize, ' '));
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
      if (eqIdx > -1 || coIdx > -1) {
        const indent = line.substr(0, line.search(/\S/));

        // TODO: when going from pivot to non-pivot, the matched text is indented (undesirably?).  prevent whitespace creep
        if (indent.length > 0) {
          if (
            !this.initialIndent // first entry
              || (!this._centerJustify && (indent.length > this.initialIndent.length)) // for left-justified, max is desired
              || ( this._centerJustify && (indent.length < this.initialIndent.length)) // for center-justified, min is desired
          ) {
            this.initialIndent = indent;
            this.padChar = this.initialIndent.charAt(0);
          }
        }
      }
    });

    this.pivotSeparator = (colonFound > equalFound)
      ? ":" : "=";
  }

  /**
   * Cleans right whitespace
   * @param line
   * @returns string Line cleansed of right whitespace
   */
  private cleanRightWhitespace(line: string): string {
    line = line.replace(/\s+$/g, '');
    return line;
  }

  /**
   * Finds pivot index
   */
  private findPivotIndex() {
    this.loc = this.locRaw.map(line_s => {
      const line = [
        this.cleanRightWhitespace(line_s.substr(0, line_s.indexOf(this.pivotSeparator))),
        line_s.substr(line_s.indexOf(this.pivotSeparator) + 1),
      ];

      // get pivot index for center-justified indentation
      this.pivotIndex = line[0].length > this.pivotIndex ? line[0].length : this.pivotIndex;

      // get pivot index for left-justified indentation
      const altIndex = line[0].trim().length + this.initialIndent.length;
      this.pivotIndexAlt = (altIndex > this.pivotIndexAlt) ? altIndex : this.pivotIndexAlt;

      return line;
    });
  }

  /*****************************************************************************
   **** start: PUBLIC METHODS and PROPERTIES 
   *****************************************************************************/

  /**
   * Sets text editor options
   */
  public set textEditorOptions(options: TextEditorOptions) {
    this._textEditorOptions = options;
  }

  /**
   * Sets pivot
   */
  public set centerJustify(centerJustified: boolean) {
    this._centerJustify = centerJustified;
  }

  /**
   * Indents indenter
   * @returns string Indented as requested
   */
  public indent(): string {
    this.sortLines();

    this.determineIndentType();

    this.findPivotIndex();

    const joined: String[] = this.loc.map(line => {
      if(line[0] && line[1]) {
        const line0 = line[0].trim();

        if (this._centerJustify) {
          return [line0.padStart(this.pivotIndex, this.padChar), this.pivotSeparator, line[1].trim()].join(' ');
        } else {
          return [this.initialIndent, line0.padEnd(this.pivotIndexAlt - this.initialIndent.length, ' '), ' ', this.pivotSeparator, ' ', line[1].trim()].join('');
        }
      } else {
        return line.join('').replace(/[\n|\r]/gm, '');
      }
    });

    return joined.join('\n');
  }
}

export default Indenter;