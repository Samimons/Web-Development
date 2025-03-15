//Adding variables to store our data

//Variable — randomNumber — is assigned a random number between 1 and 100, calculated using a mathematical algorithm.
let randomNumber = Math.floor(Math.random() * 100) + 1;

//Constants are each made to store a reference to the results paragraphs in our HTML, and are used to insert values into the paragraphs later on in the code (note how they are inside a <div> element, which is itself used to select all three later on for resetting, when we restart the game):
const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");

//The next two constants store references to the form text input and submit button and are used to control submitting the guess later on.
const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

//Store a guess count of 1 (used to keep track of how many guesses the player has had), and a reference to a reset button.
let guessCount = 1;
let resetButton;

//This line uses the focus() method to automatically put the text cursor into the <input> text field as soon as the page loads, meaning that the user can start typing their first guess right away, without having to click the form field first. It's only a small addition, but it improves usability — giving the user a good visual clue as to what they've got to do to play the game.
guessField.focus();

//The first line declares a variable called userGuess and sets its value to the current value entered inside the text field. We also run this value through the built-in Number() constructor, just to make sure the value is definitely a number. Since we're not changing this variable, we'll declare it using const.
function checkGuess() {
  const userGuess = Number(guessField.value);
  // Next, we encounter our first conditional code block. A conditional code block allows you to run code selectively, depending on whether a certain condition is true or not. It looks a bit like a function, but it isn't. The simplest form of conditional block starts with the keyword if, then some parentheses, then some curly braces. Inside the parentheses, we include a test. If the test returns true, we run the code inside the curly braces. If not, we don't, and move on to the next bit of code. In this case, the test is testing whether the guessCount variable is equal to 1 (i.e. whether this is the player's first go or not):

  //  guessCount === 1;

  // If it is, we make the guesses paragraph's text content equal to Previous guesses:. If not, we don't.

  if (guessCount === 1) {
    guesses.textContent = "Previous guesses:";

    //Next, we use a template literal to append the current userGuess value onto the end of the guesses paragraph, with a blank space in between.
  }
  guesses.textContent = `${guesses.textContent} ${userGuess}`;

  //The next block does a few checks:

  //The first if (){ } checks whether the user's guess is equal to the randomNumber set at the top of our JavaScript. If it is, the player has guessed correctly and the game is won, so we show the player a congratulations message with a nice green color, clear the contents of the Low/High guess information box, and run a function called setGameOver()
  if (userGuess === randomNumber) {
    lastResult.textContent = "Congratulations! You got it right!";
    lastResult.style.backgroundColor = "green";
    lowOrHi.textContent = "";
    setGameOver();

    //Now we've chained another test onto the end of the last one using an else if (){ } structure. This one checks whether this turn is the user's last turn. If it is, the program does the same thing as in the previous block, except with a game over message instead of a congratulations message.
  } else if (guessCount === 10) {
    lastResult.textContent = "!!!GAME OVER!!!";
    lowOrHi.textContent = "";
    setGameOver();

    //The final block chained onto the end of this code (the else { }) contains code that is only run if neither of the other two tests returns true (i.e. the player didn't guess right, but they have more guesses left). In this case we tell them they are wrong, then we perform another conditional test to check whether the guess was higher or lower than the answer, displaying a further message as appropriate to tell them higher or lower.
  } else {
    lastResult.textContent = "Wrong!";
    lastResult.style.backgroundColor = "red";
    if (userGuess < randomNumber) {
      lowOrHi.textContent = "Last guess was too low!";
    } else if (userGuess > randomNumber) {
      lowOrHi.textContent = "Last guess was too high!";
    }
  }
  //The last three lines in the function get us ready for the next guess to be submitted. We add 1 to the guessCount variable so the player uses up their turn (++ is an increment operation — increase by 1), and empty the value out of the form text field and focus it again, ready for the next guess to be entered.
  guessCount++;
  guessField.value = "";
  guessField.focus();
}

//At this point, we have a nicely implemented checkGuess() function, but it won't do anything because we haven't called it yet. Ideally, we want to call it when the "Submit guess" button is pressed, and to do this we need to use an event. Events are things that happen in the browser — a button being clicked, a page loading, a video playing, etc. — in response to which we can run blocks of code. Event listeners observe specific events and call event handlers, which are blocks of code that run in response to an event firing.

//Here we are adding an event listener to the guessSubmit button. This is a method that takes two input values (called arguments) — the type of event we are listening out for (in this case click) as a string, and the code we want to run when the event occurs (in this case the checkGuess() function). Note that we don't need to specify the parentheses when writing it inside addEventListener().
guessSubmit.addEventListener("click", checkGuess);

//
function setGameOver() {
  // The first two lines disable the form text input and button by setting their disabled properties to true. This is necessary, because if we didn't, the user could submit more guesses after the game is over, which would mess things up.

  guessField.disabled = true;
  guessSubmit.disabled = true;

  // The next three lines generate a new <button> element, set its text label to "Start new game", and add it to the bottom of our existing HTML.

  resetButton = document.createElement("button");
  resetButton.textContent = "Start new game";
  document.body.append(resetButton);

  // The final line sets an event listener on our new button so that when it is clicked, a function called resetGame() is run.

  resetButton.addEventListener("click", resetGame);
}

//This rather long block of code completely resets everything to how it was at the start of the game, so the player can have another go.
function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = "";
  guessField.focus();

  lastResult.style.backgroundColor = "white";

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
// The above code:
// Puts the guessCount back down to 1.
// Empties all the text out of the information paragraphs. We select all paragraphs inside <div class="resultParas"></div>, then loop through each one, setting their textContent to '' (an empty string).
// Removes the reset button from our code.
// Enables the form elements, and empties and focuses the text field, ready for a new guess to be entered.
// Removes the background color from the lastResult paragraph.
// Generates a new random number so that you are not just guessing the same number again!
