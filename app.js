const board = document.querySelector(".board");
const blockHeight = 30;
const blockWidth = 30;
const col = Math.floor(board.clientWidth / blockWidth);
const row = Math.floor(board.clientHeight / blockHeight);

for (let i = 0; i < row * col; i++) {
  const block = document.createElement("div");
  block.classList.add("block");
  board.appendChild(block);
}
