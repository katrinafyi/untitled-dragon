export class FakeRandom {
  /** @type {number[]} */
  randomness;
  /** @type {number} */
  used;

  constructor(n = 512) {
    this.used = 0;
    this.randomness = [];
    for (let i = 0; i < n; i++) {
      this.randomness.push(Math.random());
    }
  }

  random() {
    if (this.used === this.randomness.length)
      this.used = 0;
    return this.randomness[this.used++];
  }

  reset() {
    this.used = 0;
  }
}
