const buttons = document.querySelectorAll(".options button");
const roundInput = document.querySelector(".rounds input");

const youScoreEl = document.getElementById("you-score");
const computerScoreEl = document.getElementById("computer-score");
const matchesEl = document.getElementById("matches");
const resultEl = document.getElementById("result");

// Game state
let youScore = 0;
let computerScore = 0;
let matchesPlayed = 0;

// Config
const MAX_ROUNDS = 20;
const choices = ["rock", "paper", "scissors"];

// Auto-fix input 
roundInput.addEventListener("input", () => {
  let value = Math.floor(Number(roundInput.value));

  if (value < 1) value = 1;
  if (value > MAX_ROUNDS) value = MAX_ROUNDS;

  roundInput.value = value || "";
});

// Computer choice
function getComputerChoice() {
  return choices[Math.floor(Math.random() * 3)];
}

// Decide winner
function getResult(player, computer) {
  if (player === computer) return "draw";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "win";
  }

  return "lose";
}

// Handle button clicks (ONLY ONE HANDLER)
buttons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const totalRounds = Number(roundInput.value);

    if (!Number.isInteger(totalRounds) || totalRounds < 1) {
      resultEl.textContent = "Enter a valid number of rounds!";
      return;
    }

    if (matchesPlayed >= totalRounds) {
      resultEl.textContent = "Game Over!";
      return;
    }

    const player = choices[index];
    const computer = getComputerChoice();
    const result = getResult(player, computer);

    matchesPlayed++;
    matchesEl.textContent = matchesPlayed;

    if (result === "win") {
      youScore++;
      youScoreEl.textContent = youScore;
      resultEl.textContent = `You win! ${player} beats ${computer}`;
    } else if (result === "lose") {
      computerScore++;
      computerScoreEl.textContent = computerScore;
      resultEl.textContent = `You lose! ${computer} beats ${player}`;
    } else {
      resultEl.textContent = `Draw! You both chose ${player}`;
    }

    // Final result
    if (matchesPlayed === totalRounds) {
      setTimeout(() => {
        if (youScore > computerScore) {
          resultEl.textContent = "You won the game!";
        } else if (computerScore > youScore) {
          resultEl.textContent = "You lost the game!";
        } else {
          resultEl.textContent = "It's a draw!";
        }
      }, 500);
    }
  });
});
