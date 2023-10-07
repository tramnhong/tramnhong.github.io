'use strict';

class Game {
  constructor(p1, p2, height = 5, width = 7) {
    this.players = [p1, p2];
    this.gameStarted = false;
    this.height = height;
    this.width = width;
    this.currPlayer = p1;
  }

  makeBoard() {
    this.board = [];
    for (let y = 0; y < this.height; y++) {
      this.board.push(Array.from({ length: this.width }));
    }
  }

  makeHtmlBoard() {
    let board = document.getElementById('board');
    let top = document.createElement('tr');
    top.setAttribute('id', 'column-top');
    let handleClickFunc = (evt) => {
      this.handleClick(evt);
    }
    top.addEventListener('click', handleClickFunc);

    for (let x = 0; x < this.width; x++) {
      let headCell = document.createElement('td');
      headCell.setAttribute('id', x);
      top.append(headCell);
    }
    board.append(top);
    for (let y = 0; y < this.height; y++) {
      let row = document.createElement('tr');
      for (let x = 0; x < this.width; x++) {
        let cell = document.createElement('td');
        cell.setAttribute('id', `${y}-${x}`);
        row.append(cell);
      }
      board.append(row);
    }
  }

  findSpotForCol(x) {
    for (let y = this.height - 1; y >= 0; y--) {
      if (!this.board[y][x]) {
        return y;
      }
    }
    return null;
  }

  placeInTable(y, x) {
    let piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${this.currPlayer}`);
    piece.style.backgroundColor = this.currPlayer.color;
    piece.style.top = -50 * (y + 2);

    let spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }

  endGame(msg) {
    setTimeout(function () {
      alert(msg);
    }, 10);
  }

  handleClick(evt) {
    let x = +evt.target.id;
    let y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    this.board[y][x] = this.currPlayer;
    this.placeInTable(y, x);
    if (this.checkForWin()) {
      return this.endGame(`Player ${this.currPlayer.color} won!`);
    }
    
    if (this.board.every(row => row.every(cell => cell))) {
        return this.endGame('Tie!');
      }

      this.currPlayer = this.currPlayer === 1 ? 2 : 1;
    }

    checkForWin() {
      let that = this;
      let _win = (cells) => {

        return cells.every(
          ([y, x]) =>
            y >= 0 &&
            y < that.height &&
            x >= 0 &&
            x < that.width &&
            that.board[y][x] === this.currPlayer
        );
      }

      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {

          let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
          let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
          let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
          let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

          if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
            return true;
          }
        }
      }
    }

    startGame() {
      if (this.gameStarted == false) {
        this.makeBoard();
        this.makeHtmlBoard();
      }
      this.gameStarted = true;
    }
  }

class Color {
  constructor(color) {
    this.color = color;
  }
}

document.getElementById('start-game').addEventListener('click', () => {
  let p1 = new Player(document.getElementById('p1').value);
  let p2 = new Player(document.getElementById('p2').value);
  new Game(p1, p2);
});

colorPlayers = new Color();
game = new Game();
game.startGame();
console.log(colorPlayers);
console.log(game);


