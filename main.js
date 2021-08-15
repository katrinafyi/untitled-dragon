import { renderDragonBoard } from "./canvas.js";
import { parseTestCase } from "./dragon.js";

const toArray = (x) => Array.prototype.slice.call(x, 0);
/** @type {(q: string) => Element} */
const $ = q => document.querySelector(q);
/** @type {(q: string) => NodeListOf<Element>} */
const $$ = q => document.querySelectorAll(q);

const fileInput = /** @type {HTMLInputElement} */ ($('#testcase-file'));
const testInput = /** @type {HTMLTextAreaElement} */ ($('#testcase-text'));

const stepsInput = /** @type {HTMLTextAreaElement} */ ($('#steps-text'));

const submitButton = /** @type {HTMLButtonElement} */ ($('#submit-button'));
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

if (TESTCASE_TEXT) {
  const dragon = parseTestCase(TESTCASE_TEXT);
  renderDragonBoard(canvas, dragon);
}
