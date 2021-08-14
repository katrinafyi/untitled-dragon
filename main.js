import { renderDragonBoard } from "./canvas.js";
import { parseTestCase } from "./dragon.js";

const toArray = (x) => Array.prototype.slice.call(x, 0);
/** @type {(q: string) => Element} */
const $ = q => document.querySelector(q);
/** @type {(q: string) => NodeListOf<Element>} */
const $$ = q => document.querySelectorAll(q);

/** @type {HTMLInputElement} */
const fileInput = $('#testcase-file');
/** @type {HTMLTextAreaElement} */
const testInput = $('#testcase-text');

/** @type {HTMLTextAreaElement} */
const stepsInput = $('#steps-text');

/** @type {HTMLButtonElement} */
const submitButton = $('#submit-button');

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
  const canvas = $('#canvas');
  renderDragonBoard(canvas, dragon);
}

