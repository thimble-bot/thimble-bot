class Minesweeper {
  /**
   * @constructor
   * @param {number} width
   * @param {number} height
   * @param {number} mines
   */
  constructor(width = 9, height = 9, mines = 10) {
    this.width = width;
    this.height = height;
    this.mines = mines;

    this.matrix = [];

    this.types = {
      mine: '|| :boom: ||',
      numbers: [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight' ].map(n => `|| :${n}: ||`)
    };
  }

  /**
   * Generates a matrix filled with zeroes
   */
  generateEmptyMatrix() {
    for (let i = 0; i < this.height; i++) {
      const arr = new Array(this.width).fill(this.types.numbers[0]);
      this.matrix.push(arr);
    }
  }

  /**
   * Plants mines in the matrix randomly
   */
  plantMines() {
    for (let i = 0; i < this.mines; i++) {
      const x = Math.floor(Math.random() * this.height);
      const y = Math.floor(Math.random() * this.width);

      if (this.matrix[x][y] === this.types.mine) {
        i--;
      } else {
        this.matrix[x][y] = this.types.mine;
      }
    }
  }

  /**
   * Gets the number of mines in a particular (x, y) coordinate
   * of the matrix
   * @param {number} x
   * @param {number} y
   */
  getNumberOfMines(x, y) {
    if (this.matrix[x][y] === this.types.mine) {
      return this.types.mine;
    }

    let counter = 0;
    const hasLeft = y > 0;
    const hasRight = y < (this.width - 1);
    const hasTop = x > 0;
    const hasBottom = x < (this.height - 1);

    // top left
    counter += (hasTop && hasLeft && this.matrix[x - 1][y - 1] === this.types.mine);

    // top
    counter += (hasTop && this.matrix[x - 1][y] === this.types.mine);

    // top right
    counter += (hasTop && hasRight && this.matrix[x - 1][y + 1] === this.types.mine);

    // left
    counter += (hasLeft && this.matrix[x][y - 1] === this.types.mine);

    // right
    counter += (hasRight && this.matrix[x][y + 1] === this.types.mine);

    // bottom left
    counter += (hasBottom && hasLeft && this.matrix[x + 1][y - 1] === this.types.mine);

    // bottom
    counter += (hasBottom && this.matrix[x + 1][y] === this.types.mine);

    // bottom right
    counter += (hasBottom && hasRight && this.matrix[x + 1][y + 1] === this.types.mine);

    return this.types.numbers[counter];
  }

  /**
   * Returns the Discord message equivalent of the mine field
   * @returns {string}
   */
  getTextRepresentation() {
    return this.matrix.map(r => r.join(' ')).join('\n');
  }

  /**
   * Generates a minesweeper mine field
   */
  start() {
    this.generateEmptyMatrix();

    this.plantMines();

    this.matrix = this.matrix.map((row, x) => {
      return row.map((col, y) => this.getNumberOfMines(x, y));
    });

    return this.getTextRepresentation();
  }
};

module.exports = Minesweeper;
