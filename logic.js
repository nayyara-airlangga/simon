let btnColors = ["red", "blue", "green", "yellow"];
let pattern = [];
let userPattern = [];

let curLevel = 0;
let isStarted = false;
let isGameOver = false;

function restartGame() {
  curLevel = 0;
  isStarted = false;
  pattern = [];
  isGameOver = false;
}

$(document).keydown(function () {
  if (!isStarted) {
    $("#level-title").text("Level " + curLevel);
    nextPart();
    isStarted = true;
  } else if (isGameOver) {
    restartGame();
    $("#level-title").text("Level " + curLevel);
    nextPart();
    isStarted = true;
  }
});

$(".restart-button").click(function () {
  restartGame();
  $("#level-title").text("Level " + curLevel);
  nextPart();
  isStarted = true;
});

$(".btn").click(function () {
  if (isStarted) {
    let userColor = $(this).attr("id");
    userPattern.push(userColor);
    playAudio(userColor);
    clickAnimation(userColor);
    checkAnswer(userPattern.length - 1);
  }
});

function playAudio(color) {
  let audio = new Audio("sounds/" + color + ".mp3");
  audio.play();
}

function clickAnimation(curColor) {
  let curButton = $("#" + curColor);
  curButton.addClass("pressed");
  setTimeout(function () {
    curButton.removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userPattern[currentLevel] === pattern[currentLevel]) {
    if (userPattern.length === pattern.length) {
      setTimeout(nextPart, 1000);
    }
  } else {
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");
    isGameOver = true;
  }
}

function nextPart() {
  userPattern = [];

  curLevel++;
  $("#level-title").text("Level " + curLevel);

  let randomNum = Math.floor(Math.random() * 4);
  let chosenColor = btnColors[randomNum];
  pattern.push(chosenColor);
  $("#" + chosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playAudio(chosenColor);
}
