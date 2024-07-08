// It is a game based on sequencing, so we used array to store the sequence of game and user.

let gameSeq = [];
let userSeq = [];

let h2 = document.querySelector("h2");

let btns = ["red", "green", "blue", "yellow"];

// First Step - We have to start the game, so we used event listener to get it started. But event listeners will always start the game when the event is occurred so we made a variable and set it's initial value to false.

let started = false;
let level = 0;

let h3 = document.querySelector("h3");
let highScore = 0;

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("Game Started");
    started = true;
    levelUp();
  }
});

//Second Step - Make any random button flashing and update the h2

function gameFlash(btn) {
  btn.classList.add("gameFlash");
  setTimeout(function () {
    btn.classList.remove("gameFlash");
  }, 250);
}

function userFlash(btn) {
  btn.classList.add("userFlash");
  setTimeout(function () {
    btn.classList.remove("userFlash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level - ${level}`;

  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];

  let randBtn = document.querySelector(`.${randColor}`);

  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);
  gameSeq.push(randColor);
  gameFlash(randBtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score was <b>${level}<b><br>Press any key to start`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    if (level > highScore) {
      highScore = level;
      h3.innerText = `High Score is ${highScore}`;
    }

    reset();
  }
}

function buttonPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", buttonPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
