const remainingGuessesElement = document.getElementById("remaining-guesses");
const scoreElement = document.getElementById("score");
const previousRollElement = document.getElementById("previous-roll");
const guessInput = document.getElementById("guess");
const rollButton = document.getElementById("roll-button");
const resetButton = document.getElementById("reset-button");

let remainingGuesses = 10;
let score = 0;
let accumulatedTickets = 5;

// AJAX REQUEST
$.ajax({
    url: 'http://localhost:3000/getDiceRewards',
    method: 'GET',
    dataType: 'json',
    success: function(rewardsData) {

        // rewardsData object { number, reward }
        const rewardsContainer = document.getElementById('rewards-container');
        const rewardTitle = document.createElement('h2');
        rewardTitle.innerText = `Rewards`;
        rewardsContainer.appendChild(rewardTitle);
        
        rewardsData.forEach(reward => {
          const rewardElement = document.createElement('p');
          rewardElement.textContent = `Number ${reward.number} Reward = $${reward.reward}`;
          rewardsContainer.appendChild(rewardElement);
        });
    },
    error: function(error) {
        console.error("Error AJAX request: ", error);
    }
});

function checkDiceTickets() {
  $.ajax({
      url: 'http://localhost:3000/getUsersData', 
      method: 'GET',
      dataType: 'json',
      success: function(data) {
          const user = data[newUsername]; 

          if (user && user.tickets === 0) {
            $('#roll-button').prop('disabled', true);
            $('#reset-button').prop('disabled', true);
            $('#guess').prop('disabled', true);
            $('#rol-button').on('mouseenter', function() {
                $('#currency').addClass('shake-animation');
                setTimeout(function() {
                    $('#currency').removeClass('shake-animation');
                }, 300);
            });
            $('#reset-button').on('mouseenter', function() {
                $('#currency').addClass('shake-animation');
                setTimeout(function() {
                    $('#currency').removeClass('shake-animation');
                }, 500);
            });
            $('#guess').on('mouseenter', function() {
                $('#currency').addClass('shake-animation');
                setTimeout(function() {
                    $('#currency').removeClass('shake-animation');
                }, 500);
            });

        } else {
            $('#roll-button').prop('disabled', false);
            $('#reset-button').prop('disabled', false);
            $('#guess').prop('disabled', false);
            $('#currency').removeClass('shake-animation');

            $('#roll-button').off('mouseenter');
            $('#reset-button').off('mouseenter');
            $('#guess').off('mouseenter');
        }
      },
      error: function(error) {
          console.error("Error requesting AJAX: ", error);
      }
  });
}

$('#roll-button').on('mouseenter', function() {
  checkDiceTickets();
});
$('#reset-button').on('mouseenter', function() {
  checkDiceTickets();
});
$('#guess').on('mouseenter', function() {
  checkDiceTickets();
});

function updateScore() {
  scoreElement.textContent = score;

  accumulatedTickets += score;

  $.ajax({
      url: 'http://localhost:3000/updateUserTickets',
      type: 'POST',
      data: JSON.stringify({ tickets: accumulatedTickets }),
      contentType: 'application/json',
      success: function(response) {
          console.log(response);
          $('#currency').html('$' + accumulatedTickets);
      },
      error: function(error) {
          console.error("Error AJAX request: ", error);
      }
  });
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateRemainingGuesses() {
  remainingGuessesElement.textContent = remainingGuesses;
}

function resetGame() {
  remainingGuesses = 10;
  score = 0;
  guessInput.value = "";
  updateScore();
  updateRemainingGuesses();
  previousRollElement.textContent = "-";
}

rollButton.addEventListener("click", () => {
  if (remainingGuesses > 0) {
      const guess = parseInt(guessInput.value);
      const roll = rollDice();
      previousRollElement.textContent = roll;

      if (guess === roll) {
          $.ajax({
              url: 'http://localhost:3000/getDiceRewards',
              method: 'GET',
              dataType: 'json',
              success: function(rewardsData) {
                  const reward = rewardsData.find(reward => reward.number === guess);

                  if (reward) {
                      score += reward.reward;
                      updateScore();
                      alert(`Congratulations! You won a reward of ${reward.reward} points.`);
                  } else {
                      console.log("Try again!");
                  }

                  remainingGuesses--;
                  updateRemainingGuesses();

                  if (remainingGuesses === 0) {
                      alert(`Game Over. Your final score is ${score}`);
                  }

                  checkDiceTickets();
              },
              error: function(error) {
                  console.error("Error AJAX request: ", error);
              }
          });
      } else {
          console.log("Try again!");
          remainingGuesses--;
          updateRemainingGuesses();

          if (remainingGuesses === 0) {
              alert(`Game Over. Your final score is ${score}`);
              if (score === 0) {
                  $.ajax({
                      url: 'http://localhost:3000/updateTickets',
                      type: 'POST',
                      data: JSON.stringify({ result: "lose", username: newUsername }),
                      contentType: 'application/json',
                      success: function(response) {
                          console.log(response);
                          updateCurrency();
                          checkDiceTickets();
                      },
                      error: function(error) {
                          console.error("Error requesting AJAX: ", error);
                      }
                  });
              }
          }
      }
  }
});

function updateCurrency() {
  $.ajax({
    url: 'http://localhost:3000/getUsersData',
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      const user = data[newUsername];
      if (user && user.tickets !== undefined) {
        const ticketsValue = user.tickets;
        $('#currency').html('$' + ticketsValue);
      }
    },
    error: function(error) {
      console.error("Error requesting AJAX: ", error);
    }
  });
}
  
resetButton.addEventListener("click", resetGame);
  
resetGame();

/*rollButton.addEventListener("click", () => {
  if (remainingGuesses > 0) {
    const guess = parseInt(guessInput.value);
    const roll = rollDice();
    previousRollElement.textContent = roll;

    if (guess === roll) {
      score++;
      updateScore();
    }

    remainingGuesses--;
    updateRemainingGuesses();

    if (remainingGuesses === 0) {
      alert(`Game Over. Your final score is ${score}`);
    }
  }
});*/
