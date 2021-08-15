/**
 * @typedef {'X' | ' ' | '=' | 'E' | 'G' | 'P' | '*'} DragonBoardChar
 */

/** @type {DragonBoardChar[]} */
export const DRAGON_BOARD_CHARS = ['X', ' ', '=', 'E', 'G', '*'];

/**
 * @typedef {DragonBoardChar[][]} DragonBoard
 */

/**
 * @typedef {{rows: number, cols: number, board: DragonBoard, player: [number, number]}} DragonTestCase
 */


/** @type {(data: string) => DragonTestCase} */
export const parseTestCase = (data) => {
  const lines = data
    .replace(/\r/g, '')
    .split('\n');
  const nonComments = lines.filter(x => x[0] !== '#');

  const [sizes, time, cost, ...boardLines] = nonComments;
  const [rows, cols] = sizes.split(',');

  /** @type {[number, number]} */
  const player = [0, 0];

  const board = boardLines.map(([...chars], r) => {
    const c = chars.indexOf('P');
    if (c >= 0) {
      player[0] = r;
      player[1] = c;
      chars[c] = ' ';
    }

    // @ts-ignore casting x to DragonBoardChar
    const invalid = chars.filter(x => !DRAGON_BOARD_CHARS.includes(x));
    if (invalid.length)
      throw new Error('invalid board characters: ' + JSON.stringify(invalid));

    return /** @type {DragonBoardChar[]} */ (chars);
  });

  return {
    rows: parseInt(rows.trim()),
    cols: parseInt(cols.trim()),
    board,
    player
  };
};

/**
 * @typedef {'wl' | 'wr' | 'j' | 'gl1' | 'gl2' | 'gl3' | 'gr1' | 'gr2' | 'gr3' | 'd1' | 'd2' | 'd3'} DragonMove
 */

/** @type {Record<DragonMove, [number, number]>} */
export const DRAGON_MOVES = {
  wl: [0, -1],
  wr: [0, 1],
  j: [-1, 0],
  gl1: [1, -1],
  gl2: [1, -2],
  gl3: [1, -3],
  gr1: [1, 1],
  gr2: [1, 2],
  gr3: [1, 3],
  d1: [1, 0],
  d2: [2, 0],
  d3: [3, 0],
};

/** @type {(data: string) => DragonMove[]} */
export const parseMoves = (data) => {
  // @ts-ignore possibly invalid moves.
  return data.split(',').map(x => x.trim());
};

/** @type {(test: DragonTestCase, moves: DragonMove[]) => [number, number][]} */
export const processTestCaseAndMoves = (test, moves) => {
  // player is [r, c].
  let [r, c] = test.player;

  /** @type {[number, number][]} */
  const positions = [[r, c]];

  for (const move of moves) {
    const [dr, dc] = DRAGON_MOVES[move] ?? [0, 0];
    r += dr;
    c += dc;
    positions.push([r, c]);
  }

  return positions;
};
