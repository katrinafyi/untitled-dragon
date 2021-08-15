/**
 * @typedef {'X' | ' ' | '=' | 'E' | 'G' | 'P' | '*'} DragonBoardChar
 */

/** @type {DragonBoardChar[]} */
export const DRAGON_BOARD_CHARS = ['X', ' ', '=', 'E', 'G', 'P', '*'];

/**
 * @typedef {DragonBoardChar[][]} DragonBoard
 */

/**
 * @typedef {{rows: number, cols: number, board: DragonBoard}} DragonTestCase
 */


/** @type {(data: string) => DragonTestCase} */
export const parseTestCase = (data) => {
  const lines = data
    .replace(/\r/g, '')
    .split('\n');
  const nonComments = lines.filter(x => x[0] !== '#');

  const [sizes, time, cost, ...boardLines] = nonComments;
  const [rows, cols] = sizes.split(',');

  const board = boardLines.map(([...chars]) => {
    // @ts-ignore casting x to DragonBoardChar
    const invalid = chars.filter(x => !DRAGON_BOARD_CHARS.includes(x));
    if (invalid.length)
      throw new Error('invalid board characters: ' + JSON.stringify(invalid));

    return /** @type {DragonBoardChar[]} */ (chars);
  });

  return {
    rows: parseInt(rows.trim()),
    cols: parseInt(cols.trim()),
    board
  };
};
