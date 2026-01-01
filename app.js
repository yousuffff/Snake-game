const board = document.querySelector(".board");
const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
let snake = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 5, y: 7 },
];

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    block.innerText = `${col},${row}`;
    blocks[`${col}-${row}`] = block;
  }
}

function renderSnake() {
   snake.forEach((segment) => {
    console.log(blocks[`${segment.x}-${segment.y}`].classList.add("snake"));
    return 1
  });
}
renderSnake();
