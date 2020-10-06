let columnSize = 9;
let rowSize = 9;

let grid = [];
let bombIndex = [];

let gameOver = false;

const addCells = () => {
  for (let i = 0; i < rowSize; i++) {
    let arr = [];
    for (let j = 0; j < columnSize; j++) {
      let obj = {};
      obj.isBomb = false;
      obj.selected = false;
      obj.value = Math.floor(Math.random() * 81) + 1;
      arr.push(obj);
    }

    grid.push(arr);
  }
};

addCells();

const getId = (i, j) => {
  return i.toString() + j.toString();
};

const plantBombs = () => {
  for (let i = 0; i < 10; i++) {
    let row = Math.floor(Math.random() * 9);
    let column = Math.floor(Math.random() * 9);

    console.log(row + " " + column);

    grid[row][column].isBomb = true;

    let obj = {};
    obj.row = row;
    obj.column = column;
    bombIndex.push(obj);

    //console.log(bombIndex);

    let el = document.getElementById(getId(row, column));
    el.classList.add("bomb");
  }
};

const initBoard = () => {
  let board = document.getElementById("board");
  let cellContainer = document.createElement("div");
  cellContainer.setAttribute("id", "cell-container");

  for (let i = 0; i < rowSize; i++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row";

    for (let j = 0; j < columnSize; j++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("id", getId(i, j));
      cellEl.className = "cell";
      cellEl.addEventListener("click", () => handleClick(cellEl, i, j));

      rowEl.appendChild(cellEl);
    }
    cellContainer.appendChild(rowEl);
  }

  board.appendChild(cellContainer);

  plantBombs();
};

const handleClick = (cellEl, i, j) => {
  if (gameOver) {
    return;
  }

  let el = cellEl;

  if (grid[i][j].isBomb) {
    let bombs = document.getElementsByClassName("bomb");

    for (let l = 0; l < bombs.length; l++) {
      bombs[l].innerHTML = "B";
      bombs[l].classList.add("red");
    }

    gameOver = true;
  } else {
    grid[i][j].selected = true;
    el.innerHTML = grid[i][j].value.toString();
    el.classList.add("green");
  }

  // if (grid[i][j].selected && grid[i][j].isBomb === true) {
  //   currentSum += grid[i][j].value;
  // } else {
  //   currentSum -= grid[i][j].value;
  // }

  updateBoard();
};

let updateBoard = () => {
  if (gameOver) {
    return;
  }
};

initBoard();
