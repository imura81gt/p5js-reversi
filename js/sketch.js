class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

const pixelNum = new Vec(8, 8);
const ratioOfDisk = new Vec(0.8, 0.8);

let size;
let boardSize;
let pixelSize;
let diskSize;

const boardColor = [10, 150, 100];

const disk = {
  none: 0,
  dark: 1,
  light: 2,
  hint: 3,
};

const diskColor = [[], [0, 0, 0], [255, 255, 255], [255, 255, 0]];

let board = [];
let hintBoard = [];
let turn;

function setup() {
  for (let x = 0; x < pixelNum.x; x++) {
    board[x] = [];
    for (let y = 0; y < pixelNum.y; y++) {
      board[x][y] = 0;
    }
  }

  for (let x = 0; x < pixelNum.x; x++) {
    hintBoard[x] = [];
    for (let y = 0; y < pixelNum.y; y++) {
      hintBoard[x][y] = 0;
    }
  }

  board[3][4] = disk.dark;
  board[4][3] = disk.dark;
  board[3][3] = disk.light;
  board[4][4] = disk.light;

  turn = disk.dark;

  windowResized();
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  createBoard();
  hintDisk(turn);
  putDisk();
}

function createBoard() {
  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
      fill(boardColor);
      rect(x * pixelSize.x, y * pixelSize.y, pixelSize.x, pixelSize.y);
    }
  }
}

function putDisk() {
  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
      if (hintBoard[x][y] === disk.hint) {
        erase(100, 255);
        ellipse(
          x * pixelSize.x + pixelSize.x / 2,
          y * pixelSize.y + pixelSize.y / 2,
          diskSize.x,
          diskSize.y
        );
        noErase();
      }

      if (board[x][y] === disk.none) {
        continue;
      } else {
        fill(diskColor[board[x][y]]);
        ellipse(
          x * pixelSize.x + pixelSize.x / 2,
          y * pixelSize.y + pixelSize.y / 2,
          diskSize.x,
          diskSize.y
        );
      }
    }
  }
}

function mouseReleased() {
  let clickPos = new Vec(int(mouseX / pixelSize.x), int(mouseY / pixelSize.y));

  if (!isInBoard(clickPos)) {
    return false;
  }

  if (!isNoneDisk(clickPos)) {
    return false;
  }

  if (isAbleToPlace(clickPos, turn, true)) {
    board[clickPos.x][clickPos.y] = turn;
    takeTurn();
    redraw();
    return true;
  }
  return false;
}

function windowResized() {
  size =
    window.innerWidth < window.innerHeight
      ? window.innerWidth
      : window.innerHeight;
  boardSize = new Vec(size, size);
  pixelSize = new Vec(parseInt(size / pixelNum.x), parseInt(size / pixelNum.y));
  diskSize = new Vec(pixelSize.x * ratioOfDisk.x, pixelSize.y * ratioOfDisk.y);
  resizeCanvas(windowWidth, windowHeight);
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

function isMyDisk(v, color) {
  if (board[v.x][v.y] === color) {
    return true;
  }
  return false;
}

function isAbleToPlace(v, color, reverse) {
  let result = false;
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      let dir = new Vec(x, y);
      let pos = new Vec(v.x + dir.x, v.y + dir.y);
      if (dir.x === 0 && dir.y === 0) {
        continue;
      }

      if (!isInBoard(pos)) {
        continue;
      }

      if (isNoneDisk(pos)) {
        continue;
      }

      if (isMyDisk(pos, color)) {
        continue;
      }

      while (true) {
        pos.x += dir.x;
        pos.y += dir.y;

        if (!isInBoard(pos)) {
          break;
        }

        if (isNoneDisk(pos)) {
          break;
        }

        if (isMyDisk(pos, color)) {
          result = true;
          if (reverse) {
            let reversePos = new Vec(v.x, v.y);
            // setTimeout(function () {
            while (true) {
              reversePos.x += dir.x;
              reversePos.y += dir.y;
              if (reversePos.x === pos.x && reversePos.y === pos.y) {
                break;
              }
              board[reversePos.x][reversePos.y] = color;
              fill(diskColor[board[reversePos.x][reversePos.y]]);
              ellipse(
                reversePos.x * pixelSize.x + pixelSize.x / 2,
                reversePos.y * pixelSize.y + pixelSize.y / 2,
                diskSize.x,
                diskSize.y
              );
            }
          }
        }
      }
    }
  }
  return result;
}

function hintDisk(color) {
  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
      let pos = new Vec(x, y);
      hintBoard[pos.x][pos.y] = 0;
    }
  }

  for (let x = 0; x < pixelNum.x; x++) {
    for (let y = 0; y < pixelNum.y; y++) {
      let pos = new Vec(x, y);
      if (isAbleToPlace(pos, color, false)) {
        hintBoard[pos.x][pos.y] = disk.hint;
      }
    }
  }
}
