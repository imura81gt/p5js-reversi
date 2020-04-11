class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const pixel = new Vec(8, 8);
const pixelSize = new Vec(100, 100);
const canvasSize = new Vec(pixel.x * pixelSize.x, pixel.y * pixelSize.y);
const diskSize = new Vec(pixelSize.x * 0.8, pixelSize.y * 0.8);

const boardColor = [10, 150, 100];

const disk = {
  none: 0,
  dark: 1,
  light: 2,
};

const diskColor = [[], [0, 0, 0], [255, 255, 255]];

let board = [];

function setup() {
  for (let x = 0; x < pixel.x; x++) {
    board[x] = [];
    for (let y = 0; y < pixel.y; y++) {
      board[x][y] = 0;
    }
  }

  board[3][4] = disk.dark;
  board[4][3] = disk.dark;
  board[3][3] = disk.light;
  board[4][4] = disk.light;
  createCanvas(canvasSize.x, canvasSize.y);
}

function draw() {
  createBoard();
  putDisk();
}

function createBoard() {
  for (let x = 0; x < pixel.x; x++) {
    for (let y = 0; y < pixel.y; y++) {
      fill(boardColor);
      rect(x * pixelSize.x, y * pixelSize.x, pixelSize.x, pixelSize.y);
    }
  }
}

function putDisk() {
  for (let x = 0; x < pixel.x; x++) {
    for (let y = 0; y < pixel.y; y++) {
      if (board[x][y] === disk.none) {
        continue;
      } else {
        fill(diskColor[board[x][y]]);
        ellipse(
          x * pixelSize.x + pixelSize.x / 2,
          y * pixelSize.y + pixelSize.x / 2,
          diskSize.x,
          diskSize.y
        );
      }
    }
  }
}
