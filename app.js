const board = document.querySelector(".board");
let scoreBoard = document.querySelector("#score");
let highScoreBoard = document.querySelector("#high-score");
let timeBoard = document.querySelector("#time");
const startBtn = document.querySelector("#start-btn");
const restartBtn = document.querySelector("#restart-btn");
const gameoverModal = document.querySelector(".modal-gameover");
const modalstart = document.querySelector(".modal-startgame");
const modal = document.querySelector(".modal");

const blockHeight = 30;
const blockWidth = 30;
const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
let score = 0;
let highScore = 0;
highScore = localStorage.getItem("highScore") || 0;
highScoreBoard.innerText = highScore;
let time = "00-00";
let autodirection = ["up", "down", "left", "right"];
let direction = "left";
let intervalId = null;
let timeIntervalId = null;
let speedIncreaseIntervalId = null;
let speed = 300;
const opposite = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

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
// console.log(food);

for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    const block = document.createElement("div");
    block.classList.add("block");
    board.appendChild(block);
    // block.innerText = `${col},${row}`;
    blocks[`${col}-${row}`] = block;
  }
}

function renderSnake() {
  // console.log(snake);
  let head = null;

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
    gameOver();
    return;
  }

  if (snake.some((segment) => segment.x === head.x && segment.y === head.y)) {
    gameOver();
    return;
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
    if (score > highScore) {
      highScore = score;
      highScoreBoard.innerText = highScore;
      localStorage.setItem("highScore", highScore);
    }
    scoreBoard.innerText = score;
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    food = randomFood();
    blocks[`${food.x}-${food.y}`].classList.add("food");

    snake.push({ ...snake[snake.length - 1] });
  }
}
function randomFood() {
  let pos;
  do {
    pos = {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    };
  } while (snake.some((seg) => seg.x === pos.x && seg.y === pos.y));
  return pos;
}
// Game over logic here
addEventListener("keydown", (e) => {
  // console.log(e.key);

  const keyMap = {
    ArrowUp: "up",
    ArrowDown: "down",
    ArrowLeft: "left",
    ArrowRight: "right",
  };
  const newDirection = keyMap[e.key];
  if (!newDirection) return;

  if (opposite[direction] === newDirection) return;
  direction = newDirection;

  // if (e.key === "ArrowLeft") {
  //   direction = "left";
  // } else if (e.key === "ArrowRight") {
  //   direction = "right";
  // } else if (e.key === "ArrowUp") {
  //   direction = "up";
  // } else if (e.key === "ArrowDown") {
  //   direction = "down";
  // }
});

///timer///
const updateTime = () => {
  let [min, sec] = time.split("-").map(Number);
  if (sec === 59) {
    min += 1;
    sec = 0;
  } else {
    sec += 1;
  }
  time = `${min.toString().padStart(2, "0")}-${sec
    .toString()
    .padStart(2, "0")}`;
  timeBoard.innerText = time;
};
const startgame = () => {
  startBtn.disabled = true;
  modalstart.style.display = "none";
  modal.style.display = "none";
  clearInterval(timeIntervalId);
  timeIntervalId = setInterval(() => updateTime(), 1000);
  speed = 300;
  blocks[`${food.x}-${food.y}`].classList.add("food");
  startSnakeLoop();
  startSpeedIncrease();
  // intervalId = setInterval(() => {
  //   renderSnake();
  // }, speed);
};

function startSnakeLoop() {
  clearInterval(intervalId);
  intervalId = setInterval(renderSnake, speed);
}

const restartgame = () => {
  startBtn.disabled = false;
  clearInterval(intervalId);
  clearInterval(timeIntervalId);
  clearInterval(speedIncreaseIntervalId);
  score = 0;
  speed = 300;
  time = "00-00";
  timeBoard.innerText = time;
  scoreBoard.innerText = score;
  highScore = localStorage.getItem("highScore") || 0;
  highScoreBoard.innerText = highScore;
  blocks[`${food.x}-${food.y}`].classList.remove("food");
  snake.forEach((segment) => {
    blocks[`${segment.x}-${segment.y}`].classList.remove("snake");
  });
  timeIntervalId = setInterval(() => updateTime(), 1000);
  modal.style.display = "none";
  gameoverModal.style.display = "none";
  direction = autodirection[Math.floor(Math.random() * 4)];
  snake = [
    {
      x: Math.floor(Math.random() * cols),
      y: Math.floor(Math.random() * rows),
    },
  ];
  food = randomFood();
  blocks[`${food.x}-${food.y}`].classList.add("food");
  // intervalId = setInterval(() => {
  //   renderSnake();
  // }, 300);
  startSnakeLoop();
  startSpeedIncrease();
};
function gameOver() {
  clearInterval(intervalId);
  clearInterval(timeIntervalId);
  clearInterval(speedIncreaseIntervalId);

  time = "00-00";
  timeBoard.innerText = time;

  modal.style.display = "flex";
  gameoverModal.style.display = "flex";
}
function startSpeedIncrease() {
  clearInterval(speedIncreaseIntervalId);

  speedIncreaseIntervalId = setInterval(() => {
    if (speed > 80) {
      speed -= 20;
      startSnakeLoop();
      console.log("Speed increased:", speed);
    }
  }, 10000);
}

startBtn.addEventListener("click", startgame);
restartBtn.addEventListener("click", restartgame);
