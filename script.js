var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var game = document.getElementById("game");
var jumping = 0;
var counter = 0;
var gameHeight = game.offsetHeight;
var characterHeight = character.offsetHeight;
var gameover = false;

hole.addEventListener("animationiteration", () => {
  let random = -((Math.random() * 300) + 150);
  hole.style.top = random + "px";
  counter++;
});

setInterval(() => {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if (jumping == 0) {
    character.style.top = (characterTop + 3) + "px";
  }
  if (characterTop > gameHeight - characterHeight) {
    character.style.top = (gameHeight - characterHeight) + "px";
  } else {
    character.style.top = (characterTop + 3) + "px";
  }
  var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
  var gameLeft = parseInt(window.getComputedStyle(game).getPropertyValue("left"));
  var gameRight = gameLeft + parseInt(window.getComputedStyle(game).getPropertyValue("width"));
  var characterRight = characterLeft + parseInt(window.getComputedStyle(character).getPropertyValue("width"));

  if ((characterLeft < gameLeft || characterRight > gameRight) && !gameover) {
    endGame();
  }

  if (characterLeft < block.offsetWidth && characterRight > block.offsetLeft) {
    endGame();
  }

}, 10);

function handleKeyPress(event) {
  if (event.code === "Space") {
    jump();
  }
}

function jump() {
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(() => {
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if (characterTop > game.offsetTop && jumpCount < 15) {
      character.style.top = (characterTop - 5) + "px";
    }
    if (jumpCount >= 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
}

function endGame() {
  clearInterval(interval);
  alert("Game Over! You scored " + counter + " points.");
  character.style.top = 100 + "px";
  counter = 0;
  gameover = true;
}