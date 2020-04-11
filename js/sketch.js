class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const pixelNum = new Vec(8, 8);
const pixelSize = new Vec(100, 100);
const boardSize = new Vec(pixelNum.x * pixelSize.x, pixelNum.y * pixelSize.y);
const ratioOfDisk = new Vec(0.8, 0.8);
const diskSize = new Vec(
  pixelSize.x * ratioOfDisk.x,
  pixelSize.y * ratioOfDisk.y
);
const boardColor = [10, 150, 100];

const disk = {
  none: 0,
  dark: 1,
  light: 2,
};

const diskColor = [[], [0, 0, 0], [255, 255, 255]];

let board = [];
let turn;

function setup() {
  for (let x = 0; x < pixelNum.x; x++) {
    board[x] = [];
    for (let y = 0; y < pixelNum.y; y++) {
      board[x][y] = 0;
    }
  }

  board[3][4] = disk.dark;
  board[4][3] = disk.dark;
  board[3][3] = disk.light;
  board[4][4] = disk.light;

  turn = disk.dark;

  createCanvas(boardSize.x, boardSize.y);
}

function draw() {
  createBoard();
  putDisk();
}

function createBoard() {
  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
      fill(boardColor);
      rect(x * pixelSize.x, y * pixelSize.x, pixelSize.x, pixelSize.y);
    }
  }
}

function putDisk() {
  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
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

function mouseReleased() {
  let checkingPos = new Vec(
    int(mouseX / pixelSize.x),
    int(mouseY / pixelSize.y)
  );

  if (!isInBoard(checkingPos)) {
    return false;
  }

  if (!isNoneDisk(checkingPos)) {
    return false;
  }

  board[checkingPos.x][checkingPos.y] = turn;
  putDisk();
  takeTurn();
}

function takeTurn() {
  if (turn === disk.dark) {
    turn = disk.light;
  } else {
    turn = disk.dark;
  }
}

function isInBoard(v) {
  if (0 <= v.x && 0 <= v.y && v.x < pixelNum.x && v.y < pixelNum.y) {
    return true;
  }
  return false;
}

function isNoneDisk(v) {
  if (board[v.x][v.y] === disk.none) {
    return true;
  }
  return false;
}
