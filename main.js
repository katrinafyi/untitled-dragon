import { DragonCanvas } from "./canvas.js";
import { parseMoves, parseTestCase, processTestCaseAndMoves } from "./dragon.js";

const toArray = (x) => Array.prototype.slice.call(x, 0);
/** @type {(q: string) => Element} */
const $ = q => document.querySelector(q);
/** @type {(q: string) => NodeListOf<Element>} */
const $$ = q => document.querySelectorAll(q);

const fileInput = /** @type {HTMLInputElement} */ ($('#testcase-file'));
const testInput = /** @type {HTMLTextAreaElement} */ ($('#testcase-text'));
const stepsInput = /** @type {HTMLTextAreaElement} */ ($('#steps-text'));
const speedInput = /** @type {HTMLInputElement} */ ($('#speed'));

const submitButton = /** @type {HTMLButtonElement} */ ($('#submit-button'));
const playButton = /** @type {HTMLButtonElement} */ ($('#play-button'));
const canvas = /** @type {HTMLCanvasElement} */ ($('#canvas'));

const params = new URLSearchParams(window.location.search);
const TESTCASE_TEXT = testInput.value = params.get(testInput.name);
const STEPS_TEXT = stepsInput.value = params.get(stepsInput.name);


fileInput.onchange = async () => {
  if (!fileInput.files.length)
    return;
  testInput.value = await fileInput.files[0].text();
  submitButton.disabled = false;
};

testInput.oninput = stepsInput.oninput = () => {
  submitButton.disabled = false;
};


const dragon = TESTCASE_TEXT ? parseTestCase(TESTCASE_TEXT) : null;
const moves = STEPS_TEXT ? parseMoves(STEPS_TEXT) : [];

let animating = false;
let interval = 500; // ms delay between animations
let movesDone = 0;

const setAnimating = (/** @type {boolean} */ x) => {
  animating = x;
  playButton.textContent = animating ? 'Pause' : 'Play';
  if (animating) {
    step();
  }
}

playButton.onclick = () => {
  setAnimating(!animating);
};

speedInput.onchange = () => {
  interval = parseInt(speedInput.max) - parseInt(speedInput.value);
};

if (dragon) {
  playButton.disabled = false;
}

const renderer = new DragonCanvas(canvas);
const positions = processTestCaseAndMoves(dragon, moves);

const step = () => {
  renderer.drawBoard(dragon.board);
  renderer.drawPlayer(...positions[movesDone++]);

  if (movesDone >= positions.length) {
    setAnimating(false);
    movesDone = 0;
  }

  if (animating) {
    setTimeout(() => requestAnimationFrame(step), interval);
  }
}

if (dragon) {
  renderer.initialise(dragon.rows, dragon.cols).then(step);
}
