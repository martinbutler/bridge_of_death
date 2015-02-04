var guessesRemaining = 5;
var theNumber = Math.floor(Math.random() * 100) + 1;
var difference;  // determine how close the guess is
var previousDifference = 0; // 0 will indicate no previous guess
var guessesMade = {};  
var currentGuess;
var historyMessage = "";
document.getElementById('playAgain').style.visibility='hidden';
document.getElementById("playerGuess").focus();

function checkTheGuess() {
  currentGuess = (document.getElementById("playerGuess").value);
  document.getElementById("playerGuess").value = '';
  // check to see if input is a number from 1-100
  if (isNaN(currentGuess) || currentGuess < 1 || currentGuess > 100) {
    document.getElementById("result").innerHTML = "You must enter a number between 1 - 100";
    return;
  } 
  // check to see if player has previously used the current guess
  // if unique, store the guess
  if (guessesMade.hasOwnProperty(currentGuess)) {
    document.getElementById("result").innerHTML = "You have already guessed " + currentGuess + ". Try Again!";
    return;
  } else {
    guessesMade[currentGuess] = guessesRemaining;
  }

  difference = theNumber - (currentGuess);
  guessesRemaining--;

  if (difference == 0) {
    document.getElementById("result").innerHTML = "Congratulations: You may pass!";
    gameOverHideAndShow();
    document.getElementById("titleImage").src = "./img/chicken.jpg";
    document.getElementById("theLead").innerHTML = "Winner Winner! Chicken Dinner!";
    return;
  } else if (difference <= 5 && difference > 0) {
    document.getElementById("result").innerHTML = "You are very hot. Guess a little higher";
    historyMessage += currentGuess + " = Very Hot. ";
  } else if (difference >= -5 && difference < 0) {
    document.getElementById("result").innerHTML = "You are very hot. Guess a little lower";
    historyMessage += currentGuess + " = Very Hot. ";
  } else if (difference <= 10 && difference > 5) {
    document.getElementById("result").innerHTML = "You are hot. Guess higher";
    historyMessage += currentGuess + " = Hot. ";
  } else if (difference >= -10 && difference < -5) {
    document.getElementById("result").innerHTML = "You are hot. Guess lower";
    historyMessage += currentGuess + " = Hot. ";
  } else if (difference <= 20 && difference > 10) {
    document.getElementById("result").innerHTML = "You are warm at best. Guess higher";
    historyMessage += currentGuess + " = Warm. ";
  } else if (difference >= -20 && difference < -10) {
    document.getElementById("result").innerHTML = "You are warm at best. Guess lower";
    historyMessage += currentGuess + " = Warm. ";
  } else if (difference > 20) {
    document.getElementById("result").innerHTML = "You are cold. Guess much higher";
    historyMessage += currentGuess + " = Cold. ";
  } else if (difference < 20) {
    document.getElementById("result").innerHTML = "You are cold. Guess much lower";
    historyMessage += currentGuess + " = Cold. ";
  }
  if (guessesRemaining == 0) {
    document.getElementById("result").innerHTML = "You have been cast into the gorge of eternal peril!";
    document.getElementById("titleImage").src = "./img/falling.jpg";
    document.getElementById('theLead').style.visibility='hidden';
    gameOverHideAndShow();
  }else{
    document.getElementById("guessCount").innerHTML = guessesRemaining + " Guesses Remaining";
    document.getElementById("theHistory").innerHTML = historyMessage; 
    // check to see if player is closer to correct number as compared
    // to the previous guess.
    if (previousDifference != 0 && Math.abs(difference) <= Math.abs(previousDifference)){
      document.getElementById("theLead").innerHTML = "Getting Hotter!";
    } else if (previousDifference !=0) {
      document.getElementById("theLead").innerHTML = "Getting Colder!";
    }
    previousDifference = difference;
  }
};

function giveHint() {
  document.getElementById("result").innerHTML = "um.... you can try " + theNumber + ", but you didn't hear it from me!";
}

function gameOverHideAndShow () {
  document.getElementById('checkGuess').style.visibility='hidden';
  document.getElementById('giveHint').style.visibility='hidden';
  document.getElementById('guessCount').style.visibility='hidden';
  document.getElementById('playerGuess').style.visibility='hidden';
  document.getElementById('theHistory').style.visibility='hidden';
  document.getElementById('playAgain').style.visibility='visible';
};
