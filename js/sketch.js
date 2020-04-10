class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const pixel = new Vec(8, 8);
const pixelSize = new Vec(100, 100);
const canvasSize = new Vec(pixel.x * pixelSize.x, pixel.y * pixelSize.y);

const boardColor = [10, 150, 100];

function setup() {
  createCanvas(canvasSize.x, canvasSize.y);
}

function draw() {
  createBoard();
}

function createBoard() {
  for (let x = 0; x < pixel.x; x++) {
    for (let y = 0; y < pixel.y; y++) {
      fill(boardColor);
      rect(x * pixelSize.x, y * pixelSize.x, pixelSize.x, pixelSize.y);
    }
  }
}
