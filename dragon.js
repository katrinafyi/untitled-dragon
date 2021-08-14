/**
 * @typedef {'X' | ' ' | '=' | 'E' | 'G' | 'P' | '*'} DragonBoardChars
 */

/**
 * @typedef {DragonBoardChars[][]} DragonBoard
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
  const [sizes, time, cost, ...board] = nonComments;
  const [rows, cols] = sizes.split(',');

  return {
    rows: parseInt(rows.trim()),
    cols: parseInt(cols.trim()),
    board
  };
};
