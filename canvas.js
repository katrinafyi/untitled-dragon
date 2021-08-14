const LINE_WIDTH = 4;
const UNIT_HEIGHT = 32;
const UNIT_WIDTH = 32;

/** @type {Partial<Record<import("./dragon").DragonBoardChars, string>>} */
const BG_COLORS = {
  'X': 'black',
  '=': 'brown',
  '*': 'red',
  'E': 'green',
};

/** @type {Partial<Record<import("./dragon").DragonBoardChars, string>>} */
const FG_COLORS = {
  'G': 'gold',
  'P': 'blue'
};

/** @type {(canvas: HTMLCanvasElement, board: import("./dragon").DragonTestCase) => void} */
export const renderDragonBoard = (canvas, {rows, cols, board}) => {
  const context = canvas.getContext('2d');

  context.canvas.width = cols * UNIT_WIDTH;
  context.canvas.height = rows * UNIT_HEIGHT;

  context.lineWidth = LINE_WIDTH;

  for (let r = 0, y = 0; r < board.length; r++, y += UNIT_HEIGHT) {
    const row = board[r];

    for (let c = 0, x = 0; c < row.length; c++, x += UNIT_WIDTH) {
      const char = row[c];
      if (BG_COLORS[char]) {
        context.fillStyle = BG_COLORS[char];
        context.fillRect(x, y, UNIT_WIDTH, UNIT_HEIGHT);
      }

      if (FG_COLORS[char]) {
        context.strokeStyle = FG_COLORS[char];
        context.strokeRect(x + LINE_WIDTH/2, y + LINE_WIDTH/2, UNIT_WIDTH-LINE_WIDTH, UNIT_HEIGHT-LINE_WIDTH);
      }
    }
  }
};