import { FakeRandom } from "./random.js";

const LINE_WIDTH = 4;
const UNIT_HEIGHT = 32;
const UNIT_WIDTH = 32;

/** @type {(src: string) => Promise<HTMLImageElement>} */
const loadImage = src => new Promise((resolve, reject) => {
  const img = new Image();
  img.onload = () => resolve(img);
  img.onerror = reject;
  img.src = src;
});

/** @enum {string} */
const IMAGE_FILES = {
  BEDROCK: 'bedrock.png',
  DIRT: 'dirt_darker.png',
  EMERALD: 'emerald.png',
  ENDERMAN: 'enderman_head.png',
  LADDER: 'ladder.png',
  LAVA: 'lava_12.png',
  PORTAL: 'portal.png',
  STONE: 'stone.png',
  COBBLESTONE: 'cobblestone.png',
};

const AIR_IMAGE = IMAGE_FILES.DIRT;

/** @type {Partial<Record<import("./dragon").DragonBoardChar, IMAGE_FILES>>} */
const BG_IMAGES = {
  'X': IMAGE_FILES.STONE,
  '=': AIR_IMAGE,
  '*': AIR_IMAGE,
  'E': AIR_IMAGE,
  ' ': AIR_IMAGE,
  'G': AIR_IMAGE,
  // 'P': AIR_IMAGE,
};

/** @type {Partial<Record<import("./dragon").DragonBoardChar, IMAGE_FILES>>} */
const FG_IMAGES = {
  '=': IMAGE_FILES.LADDER,
  '*': IMAGE_FILES.LAVA,
  'E': IMAGE_FILES.PORTAL,
  'G': IMAGE_FILES.EMERALD,
  'P': IMAGE_FILES.ENDERMAN,
};

export class DragonCanvas {
  /** @type {HTMLCanvasElement} */
  canvas;
  /** @type {CanvasRenderingContext2D} */
  context;
  /** @type {Record<IMAGE_FILES, HTMLImageElement>} */
  images;
  /** @type {FakeRandom} */
  random;

  /**
   * @param {HTMLCanvasElement!} canvas
   */
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.random = new FakeRandom();
  }

  /**
   * @param {number} rows
   * @param {number} cols
   */
  async initialise(rows, cols) {
    this.canvas.width = cols * UNIT_WIDTH;
    this.canvas.height = rows * UNIT_HEIGHT;

    this.images = await this.initImages();
  }

  async initImages() {
    const files = Object.values(IMAGE_FILES);
    const data = await Promise.all(files.map(s => loadImage('assets/' + s)));

    /** @type {Record<IMAGE_FILES, HTMLImageElement>} */
    const images = {};
    for (let i = 0; i < files.length; i++) {
      images[files[i]] = data[i];
    }

    return images;
  }

  /**
   * @param {import("./dragon").DragonBoardChar} char
   * @param {number} x
   * @param {number} y
   */
  _drawChar(char, x, y) {
    if (BG_IMAGES[char]) {
      this.context.drawImage(this.images[BG_IMAGES[char]], x, y);
    }

    if (FG_IMAGES[char]) {
      this.context.drawImage(this.images[FG_IMAGES[char]], x, y);
    }
  }

  /**
   * @param {import("./dragon").DragonBoard} board
   */
  drawBoard(board) {
    for (let r = 0, y = 0; r < board.length; r++, y += UNIT_HEIGHT) {
      const row = board[r];
      for (let c = 0, x = 0; c < row.length; c++, x += UNIT_WIDTH) {
        const char = row[c];
        this._drawChar(char, x, y);
      }
    }
  }

  /**
   * @param {number} row
   * @param {number} col
   */
  drawPlayer(row, col) {
    this._drawChar('P', col * UNIT_WIDTH, row * UNIT_WIDTH);
  }

  /**
   *
   * @param {[number, number][]} positions
   * @param {number} elapsed
   */
  drawTrail(positions, elapsed = 0) {

  }
}
