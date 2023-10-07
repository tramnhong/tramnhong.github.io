const gameContainer = document.getElementById("game");
//create array to store card
const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

//suffle array
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);
console.log(shuffledColors)

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
let flippedCard = null;
let pauseFlipping = false;
let correctCount = 0;
let scoreValue = 0;
let maxScore = window.localStorage.getItem('bestScore');
if(maxScore===null) {
  maxScore = 0;
}

function markFlipped(target) {
  target.classList.add("flipped");
}

function isFlipped(target) {
  return target.classList.contains("flipped");
}


function handleCardClick(event) {
  
  console.log("you just clicked", event.target);
  if(pauseFlipping) {
    return;
  }
  if(isFlipped(event.target)) {
    return;
  }
  // 1. Set color for this card
  setColor(event.target);
  // 2. Check if other cards flipped
  if (flippedCard != null) {
    // 2a. Yes, other card is flipped, check if they are matched
    if (event.target.className == flippedCard.className) {
      // 2aa. Yes: are they matched, clear last flipped card, add 50 points
      if(event.target===flippedCard) {
        return;
      }
      markFlipped(event.target);
      markFlipped(flippedCard);
      flippedCard = null;
      correctCount += 2;
      scoreValue += 50;
      displayScore(scoreValue);
      bestScore(maxScore);
    } else {
      // 2ab. No:  clear last flipped card, reset color for both cards
      // stop clicking until reset color, -5 points
      pauseFlipping = true;
      waitAndReset = function () {
        resetColor(event.target);
        resetColor(flippedCard);
        flippedCard = null;
        scoreValue -= 5;
        displayScore(scoreValue);
        bestScore(maxScore);
        pauseFlipping = false;
      }
      setTimeout(waitAndReset, 400);
    }

  } else {
    // 2b. No: save this card to the flipped card
    flippedCard = event.target;
    displayScore(scoreValue);
    bestScore(maxScore);

  }

  if (correctCount == 10) {
    if (scoreValue >= maxScore) {
      maxScore = scoreValue;
    }
    bestScore(maxScore);
    setTimeout(function () {
      alert('Congratulation!');
    }, 1);
  }
}

//score

function displayScore(score) {
  let scoreBox = document.getElementById('scorebox');
  scoreBox.innerHTML = "YOUR SCORE: " + score;
}
//best score
function bestScore(maxS){
  let bestScore = document.getElementById('bestscore');
  bestScore.innerHTML = "BEST SCORE: " + maxS;
  saveBestScore(maxS);
}

//save bestScore
function saveBestScore(bestScore) {
  let oldBestScore = window.localStorage.getItem('bestScore');
  if(oldBestScore===null) {
    oldBestScore = 0;
  }
  if (bestScore > oldBestScore){
    window.localStorage.setItem('bestScore', bestScore);
  }
} 



//reset

function resetGame() {
  while (gameContainer.firstChild) {
    gameContainer.removeChild(gameContainer.firstChild);
  }
  flippedCard = null;
  correctCount = 0;
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  scoreValue = 0;
  displayScore(scoreValue);
  if (scoreValue >= maxScore){
    maxScore == scoreValue;
  } else {}
}

function resetColor(target) {
  target.style.backgroundColor = 'white';
}

function setColor(target) {
  target.style.backgroundColor = target.className;
}


//start button
let gameStarted = false;
function startGame() {
    if (gameStarted == false) {
      createDivsForColors(shuffledColors);
    }
    gameStarted = true;
}


