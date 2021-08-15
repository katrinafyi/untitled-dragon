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

if (dragon && moves.length) {
  playButton.disabled = false;
}

if (dragon) {

  const renderer = new DragonCanvas(canvas);
  renderer.initialise(dragon.rows, dragon.cols).then(async () => {
    renderer.drawBoard(dragon.board);
    renderer.drawPlayer(...dragon.player);
    console.log(processTestCaseAndMoves(dragon, moves));
  });
}
