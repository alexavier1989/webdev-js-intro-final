"use strict";

const guessInput = document.getElementById("guess-input");
const resultMessage = document.getElementById("guess-message");
const currentGuess = document.getElementById("current-guess");
const computerGuess = document.getElementById("computer-guess");
const guessHistory = document.getElementById("guess-history");
const gameContainer = document.getElementsByClassName("game-container");

const submitButton = document.getElementById("submit-btn");
const restartButton = document.getElementById("restart-btn");

let numberToGuess = Math.floor(Math.random() * 10) + 1;
let attemptsHistory = [];
let attemps = 3;

const endGame = (codeValue) => {
  // show animation by codeValue
  if (codeValue === 0) {
    gameContainer[0].classList.add("game-won");  
  } else {
    gameContainer[0].classList.add("game-over"); 
  }

  computerGuess.textContent = numberToGuess;
  submitButton.disabled = true;
  restartButton.disabled = false;
}

const renderMessages = (result, userGuess) => {
    resultMessage.textContent = result;
    currentGuess.textContent = userGuess;
    attemptsHistory.push(userGuess);
    guessHistory.textContent = attemptsHistory.join(", ");

}

const checkGuess = () => {
    const guessNumber = parseInt(guessInput.value);
    if( isNaN(guessNumber) || guessNumber < 1 || guessNumber > 10 ) {
        resultMessage.textContent = "Please enter a number between 1 and 10";
        return;
    }
    if(guessNumber === numberToGuess) {
        renderMessages("Congratulations! You guessed the number!", guessNumber);
        endGame(0);
    } else {
        attemps--;
        if(attemps === 0) {
            renderMessages("Sorry, you lost! Try again.", guessNumber);
            endGame(1);
        } else {
            const message = guessNumber < numberToGuess ? "Nope! Try a higher number" : "Nope! Try a lower number";
            renderMessages(message, guessNumber); 
        }
    }

}

const restartGame = () => {
    // reset values
    numberToGuess = Math.floor(Math.random() * 10) + 1;
    attemptsHistory = [];
    attemps = 3;
    // reset UI
    guessInput.value = "";
    resultMessage.textContent = "";
    currentGuess.textContent = "";
    computerGuess.textContent = "";
    guessHistory.textContent = "";
    submitButton.disabled = false;
    restartButton.disabled = true;
    gameContainer[0].classList.remove("game-won");
    gameContainer[0].classList.remove("game-over");
}


submitButton.addEventListener("click", checkGuess);

restartButton.addEventListener("click", restartGame);