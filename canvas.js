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

/** @type {Promise<Record<IMAGE_FILES, HTMLImageElement>>} */
const imagesPromise = (async () => {
  const files = Object.values(IMAGE_FILES);
  const data = await Promise.all(files.map(s => loadImage('assets/' + s)));

  /** @type {Record<IMAGE_FILES, HTMLImageElement>} */
  const images = {};
  for (let i = 0; i < files.length; i++) {
    images[files[i]] = data[i];
  }

  return images;
})();

const AIR_IMAGE = IMAGE_FILES.DIRT;

/** @type {Partial<Record<import("./dragon").DragonBoardChar, IMAGE_FILES>>} */
const BG_IMAGES = {
  'X': IMAGE_FILES.STONE,
  '=': AIR_IMAGE,
  '*': AIR_IMAGE,
  'E': AIR_IMAGE,
  ' ': AIR_IMAGE,
  'G': AIR_IMAGE,
  'P': AIR_IMAGE,
};

/** @type {Partial<Record<import("./dragon").DragonBoardChar, IMAGE_FILES>>} */
const FG_IMAGES = {
  '=': IMAGE_FILES.LADDER,
  '*': IMAGE_FILES.LAVA,
  'E': IMAGE_FILES.PORTAL,
  'G': IMAGE_FILES.EMERALD,
  'P': IMAGE_FILES.ENDERMAN,
};

/** @type {(canvas: HTMLCanvasElement, board: import("./dragon").DragonTestCase) => Promise<void>} */
export const renderDragonBoard = async (canvas, {rows, cols, board}) => {
  const context = canvas.getContext('2d');
  const images = await imagesPromise;

  context.canvas.width = cols * UNIT_WIDTH;
  context.canvas.height = rows * UNIT_HEIGHT;

  context.lineWidth = LINE_WIDTH;

  for (let r = 0, y = 0; r < board.length; r++, y += UNIT_HEIGHT) {
    const row = board[r];

    for (let c = 0, x = 0; c < row.length; c++, x += UNIT_WIDTH) {
      const char = row[c];

      if (BG_IMAGES[char]) {
        context.translate(x, y);
        context.drawImage(images[BG_IMAGES[char]], 0, 0);
        context.translate(-x, -y);
      }

      if (FG_IMAGES[char]) {
        context.translate(x, y);
        context.drawImage(images[FG_IMAGES[char]], 0, 0);
        context.translate(-x, -y);
      }
    }
  }
};
