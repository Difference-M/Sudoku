import { util } from "./util.js";

let board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function isValidSpot(grid, row, col, number) {
  //checks if number exists in the column
  for (let i = 0; i < 9; i++) {
    if (grid[i][col] === number) {
      return false;
    }
  }

  //checks if number exists in the row
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === number) {
      return false;
    }
  }

  //checks if number exists in the sub grid
  let localGridRow = row - (row % 3);
  let localGridCol = col - (col % 3);

  for (let i = localGridRow; i < localGridRow + 3; i++) {
    for (let j = localGridCol; j < localGridCol + 3; j++) {
      if (grid[i][j] === number) {
        return false;
      }
    }
  }
  return true;
}

function solve(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        for (let guess = 1; guess < 10; guess++) {
          if (isValidSpot(grid, row, col, guess)) {
            grid[row][col] = guess;
            if (solve(grid)) {
              return true;
            }
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// function createPuzzle() {
//   let puzzle = [];
//   for (let i = 0; i < 9; i++) {
//     puzzle[i] = Array(9).fill(0);
//   }
//   solve(puzzle);
//   for (let i = 0; i < 9; i++) {
//     for (let j = 0; j < 9; j++) {
//       if (Math.random() > 0.3) puzzle[i][j] = 0;
//     }
//   }
//   return puzzle;
// }

function getRandomPuzzle() {
  let puzzle = [];
  for (let i = 0; i < 9; i++) {
    puzzle[i] = Array(9).fill(0);
  }

  for (let i = 0; i < 8; i++) {
    let number = Math.floor(Math.random() * 8) + 1;
    while (!isValidSpot(puzzle, 0, i, number)) {
      number = Math.floor(Math.random() * 8) + 1;
    }
    puzzle[0][i] = number;
  }
  return puzzle;
}

let puzzle = getRandomPuzzle();
util.print2DAarray(puzzle);
solve(puzzle);
util.print2DAarray(puzzle);
