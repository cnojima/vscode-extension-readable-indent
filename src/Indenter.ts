import { TextEditorOptions, WorkspaceConfiguration } from "vscode";
import customAlphaSort from './util/alpha-sort';
import hash from './util/hash';

type ConfigOptions = { minimumWhitespaceBeforePivot: number } | WorkspaceConfiguration;

/**
 * Indenter
 */
class Indenter {
  // @description Flag to alphabetize lines of code when making readable
  private _alphabetize: boolean = false;
  // @description Flag to center-justify on pivot char.
  private _centerJustify: boolean = false;
  // @description VSCode Workspace configuration for RI
  private _configOptions: ConfigOptions = {
    minimumWhitespaceBeforePivot: 10
  };
  // @description Lines of code split on newlines
  private locRaw: string[] = [];
  // @description Lines of code tokenized on pivot char
  private loc: string[][] = [[]];
  // @description Capture of detected indent - preserves tab chars vs space chars
  private initialIndent: string = '';
  // @description
  private _origin: string = '';
  // @description md5 hash of input
  private _originHash: string = '';
  // @description Character to use when left-padding for indentation
  private padChar: string = ' ';
  // @description Detected character index of pivot character for center-justified indentation
  private pivotIndex: number = 0;
  // @description Detected character index of pivot character for left-justified indentation
  private pivotIndexAlt: number = 0;
  // @description Detected character for pivot
  private pivotSeparator: string = '=';
  // @description Expanding tabs to space for indentation, detected from workspace.editor settings
  private _textEditorOptions: TextEditorOptions = {
    tabSize: 2
  };
  // @description supported pivot character sequences
  private pivots: any;


  constructor() {
    this.reset();
  }

  /**
   * reset flags and detected values
   */
  private reset(): void {
    this.initialIndent = '';
    this.pivotIndex = 0;
    this.pivotIndexAlt = 0;
    this.pivotSeparator = '=';
    this.pivots = {
      '::': { count: 0, index: 0 },
      '=>': { count: 0, index: 0 },
      ':': { count: 0, index: 0 },
      '=': { count: 0, index: 0 },
    };
  }

  /**
   * Generate a md5 hash to determine if this is a permutation
   * @param
   */
  private reuseOriginal(s: string): boolean {
    if (this._originHash) {
      return hash(s) === this._originHash;
    }

    return false;
  }

  private sortLines(): void {
    // alpha sort if configuration is set
    if (this._alphabetize === true) {
      this.locRaw = customAlphaSort(this.locRaw);
    }
  }

  /**
   * Determines indent type
   * Detects pivot char sequence, and sets private var `pivotSeparator`
   */
  private determineIndentType(): void {
    let tabSize: number = 4;
    let focusPivot: string;
    let focusPivotIndex: number = 99999;

    // convert tabs to spaces
    if (typeof this._textEditorOptions.tabSize === 'number') {
      tabSize = this._textEditorOptions.tabSize;
    }

    this.locRaw.forEach(line => {
      line = this.cleanRightWhitespace(line);
      line = line.replace(/\t/g, ''.padEnd(tabSize, ' '));

      focusPivot = '';
      focusPivotIndex = 99999;


      for (let pivot in this.pivots) {
        let idx = line.indexOf(pivot);
        this.pivots[pivot].index = (idx > -1) ? idx : 100000;

        // logic to increment found pivot count
        // massage counts when detecting pivots with common chars
        if (idx > -1 && pivot === '=>') {
          this.pivots['='].count--;
        }
      }

      // if pivot(s) are found, determine which should be considered for focusing
      for (let pivot in this.pivots) {
        if (this.pivots[pivot].index < focusPivotIndex) {
          focusPivot = pivot;
          focusPivotIndex = this.pivots[pivot].index;
        }
      }

      if (this.pivots[focusPivot] !== undefined) {
        this.pivots[focusPivot].count++;
      }

      // determine min of indent/whitespace
      const indent = line.substr(0, line.search(/\S/));

      // TODO: when going from pivot to non-pivot,
      // the matched text is indented (undesirably?).  prevent whitespace creep
      if (indent.length > 0) {
        if (
          !this.initialIndent // first entry
          // for left-justified, max is desired :: github#8 - keep?
          // || (!this._centerJustify && (indent.length < this.initialIndent.length))
          // for center-justified, min is desired
          || (this._centerJustify && (indent.length < this.initialIndent.length))
        ) {
          this.initialIndent = indent;
          this.padChar = this.initialIndent.charAt(0);
        }
      }
    });

    // use counts to identify pivot char sequence
    let pivotCount = 0;
    for (let pivot in this.pivots) {
      if (this.pivots[pivot].count > pivotCount) {
        this.pivotSeparator = pivot;
        pivotCount = this.pivots[pivot].count;
      }
    }
  }

  /**
   * Cleans right whitespace
   * @param line
   * @returns string Line cleansed of right whitespace
   */
  private cleanRightWhitespace(line: string): string {
    // line = line.replace(/\s+$/g, '');
    return line.trimRight();
  }

  /**
   * Finds pivot index and seeds property `loc`
   */
  private findPivotIndex() {
    this.loc = this.locRaw.map(line_s => {
      let startFrom = 0;
      let focusPivotIndex = line_s.indexOf(this.pivotSeparator, startFrom);

      if (focusPivotIndex > -1) {
        const pivots = line_s.match(new RegExp(this.pivotSeparator, 'g'));

        if (pivots && pivots.length > 1) {
          let lenPivots = pivots.length || 0;

          while (!this.isUseablePivot(line_s, focusPivotIndex) && lenPivots > 1) {
            lenPivots--;
            startFrom = focusPivotIndex;

            const _pivotIndex = line_s.indexOf(this.pivotSeparator, startFrom + this.pivotSeparator.length);

            if (_pivotIndex > startFrom) {
              focusPivotIndex = _pivotIndex;
            }
          }
        }

        const line = [
          this.cleanRightWhitespace(line_s.substr(0, focusPivotIndex)),
          line_s.substr(focusPivotIndex + this.pivotSeparator.length),
        ];

        // get pivot index for center-justified indentation
        this.pivotIndex = line[0].length > this.pivotIndex ? line[0].length : this.pivotIndex;

        // get pivot index for left-justified indentation
        const altIndex = line[0].trim().length + this.initialIndent.length;
        this.pivotIndexAlt = (altIndex > this.pivotIndexAlt) ? altIndex : this.pivotIndexAlt;

        // if pivotIndexAlt is less than than the configured minimum, use the config value
        this.pivotIndexAlt = (this.pivotIndexAlt > this._configOptions.minimumWhitespaceBeforePivot)
          ? this.pivotIndexAlt
          : this._configOptions.minimumWhitespaceBeforePivot;

        return line;
      }

      return [line_s];
    });
  }

  private isUseablePivot(line: string, index: number): boolean {
    let usable = true;
    const contextChars = ['"', "'", '`', '(', ')'];

    for (let i = 0, n = line.length; i < n && i < index; i++) {
      if (contextChars.indexOf(line.charAt(i)) > -1) {
        usable = !usable;
      }
    }

    return usable;
  }

  /*****************************************************************************
   **** start: PUBLIC METHODS and PROPERTIES
   *****************************************************************************/
  public get origin(): string {
    return this._origin;
  }

  public get originHash(): string {
    return this._originHash;
  }

  /**
   * sets VSCode configuration options
   */
  public set configOptions(options: ConfigOptions) {
    this._configOptions = options;
  }

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
   * Sets alphabetize flag
   */
  public set alphabetize(alphabetize: boolean) {
    this._alphabetize = alphabetize;
  }

  /**
   * Indents indenter
   * @returns string Indented as requested
   */
  public indent(code: string): string {
    this.reset();

    if (this.reuseOriginal(code)) {
      this.locRaw = this._origin.split(/\n/);
    } else {
      this._origin = code;
      this._originHash = hash(this._origin);
      this.locRaw = code.split(/\n/);
    }

    this.sortLines();

    this.determineIndentType();

    this.findPivotIndex();

    return this.loc.map(line => {
      if (line[0] && line[1]) {
        const line0 = line[0].trim();

        if (this._centerJustify) {
          return [
            line0.padStart(this.pivotIndex, this.padChar),
            this.pivotSeparator,
            line[1].trim()
          ].join(' ');
        } else {
          return [
            this.initialIndent,
            line0.padEnd(this.pivotIndexAlt - this.initialIndent.length, this.padChar),
            ' ',
            this.pivotSeparator,
            ' ',
            line[1].trim()
          ].join('');
        }

      } else {
        return line.join('').replace(/[\n|\r]/gm, '');
      }
    }).join('\n');
  }
}

export default Indenter;
