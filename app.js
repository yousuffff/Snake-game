const board = document.querySelector(".board");
let scoreBoard = document.querySelector("#score");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const gameoverModal = document.querySelector(".modal-gameover");
const modalstart = document.querySelector(".modal-startgame");
const modal = document.querySelector(".modal");

const blockHeight = 50;
const blockWidth = 50;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
let score = 0;

let direction = "left";
let intervalId = null;

let snake = [
  {
    x: Math.floor(Math.random() * cols),
    y: Math.floor(Math.random() * rows),
  },
];

let food = {
  x: Math.floor(Math.random() * cols),
  y: Math.floor(Math.random() * rows),
};
console.log(food);

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
  console.log(snake);
  let head = null;
  blocks[`${food.x}-${food.y}`].classList.add("food");

  if (direction === "up") {
    head = { x: snake[0].x, y: snake[0].y - 1 };
  } else if (direction === "down") {
    head = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "left") {
    head = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "right") {
    head = { x: snake[0].x + 1, y: snake[0].y };
  }

  if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
    modal.style.display = "flex";
    gameoverModal.style.display = "flex";
    clearInterval(intervalId);
  }
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("snake");
  });
  snake.unshift(head);
  snake.pop();

  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.add("snake");
    return null;
  });
  if (food.x === head.x && food.y === head.y) {
    score++;
    scoreBoard.innerText = score;
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);

    snake.push({ ...snake[snake.length - 1] });
  }
}

// Game over logic here
addEventListener("keydown", (e) => {
  console.log(e.key);
  if (e.key === "ArrowLeft") {
    direction = "left";
  } else if (e.key === "ArrowRight") {
    direction = "right";
  } else if (e.key === "ArrowUp") {
    direction = "up";
  } else if (e.key === "ArrowDown") {
    direction = "down";
  }
});

const startgame = () => {
  modalstart.style.display = "none";
  modal.style.display = "none";
  intervalId = setInterval(() => {
    renderSnake();
  }, 300);
};
const restartgame = () => {
  modal.style.display = "none";
  gameoverModal.style.display = "none";
  intervalId = setInterval(() => {
    renderSnake();
  }, 300);
};
startBtn.addEventListener("click", startgame);
restartBtn.addEventListener("click", restartgame);
