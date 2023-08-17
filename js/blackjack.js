
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0; 

var hidden;
var deck;

var newUsername;

var canHit = true; //sum <= 21

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (const type of types){
        for (const value of values) {
            deck.push(`${value}-${type}`);
        }
    }
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]]; 
    }
    console.log(deck);
}


function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../img/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "../img/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "../img/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { 
        canHit = false;
        checkGameResult(false);
    }

    checkUserTickets();
}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit = false;
    document.getElementById("hidden").src = "../img/" + hidden + ".png";

    let message = "";
    if (yourSum > 21) {
        message = "You Lose!";
        checkGameResult(false);
    }
    else if (dealerSum > 21) {
        message = "You win!";
        checkGameResult(true);
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
    }
    else if (yourSum > dealerSum) {
        message = "You Win!";
        checkGameResult(true);
    }
    else if (yourSum < dealerSum) {
        message = "You Lose!";
        checkGameResult(false);
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;

    checkUserTickets();
}

//POST METHOD TO WRITE USER TICKETS TO JSON FILE
function checkGameResult(playerWin) {
    const resultMessage = playerWin ? "win" : "lose";

    writeGameResultToCSV(resultMessage);

    $.ajax({
        url: 'http://localhost:3000/updateTickets',
        type: 'POST',
        data: JSON.stringify({ result: resultMessage, username: newUsername }),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
            getUsersData();
        },
        error: function(error) {
            console.error("Error requesting AJAX: ", error);
        }
    });
}

//GET METHOD TO READ USER TICKETS FROM JSON FILE
function checkUserTickets() {
    $.ajax({
        url: 'http://localhost:3000/getUsersData', 
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            const user = data[newUsername]; 

            if (user && user.tickets === 0) {
              $('#hit').prop('disabled', true);
              $('#stay').prop('disabled', true);
              $('#restart').prop('disabled', true);
              $('#hit').on('mouseenter', function() {
                  $('#currency').addClass('shake-animation');
                  setTimeout(function() {
                      $('#currency').removeClass('shake-animation');
                  }, 300);
              });
              $('#stay').on('mouseenter', function() {
                  $('#currency').addClass('shake-animation');
                  setTimeout(function() {
                      $('#currency').removeClass('shake-animation');
                  }, 500);
              });
              $('#restart').on('mouseenter', function() {
                  $('#currency').addClass('shake-animation');
                  setTimeout(function() {
                      $('#currency').removeClass('shake-animation');
                  }, 500);
              });

          } else {
              $('#hit').prop('disabled', false);
              $('#stay').prop('disabled', false);
              $('#restart').prop('disabled', false);
              $('#currency').removeClass('shake-animation');

              $('#hit').off('mouseenter');
              $('#stay').off('mouseenter');
              $('#restart').off('mouseenter');
          }
        },
        error: function(error) {
            console.error("Error requesting AJAX: ", error);
        }
    });
}

$('#hit').on('mouseenter', function() {
    checkUserTickets();
});
$('#stay').on('mouseenter', function() {
    checkUserTickets();
});
$('#restart').on('mouseenter', function() {
    checkUserTickets();
});

//POST METHOD TO WRITE GAMES TO CSV FILE
function writeGameResultToCSV(result) {
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();

    $.ajax({
        url: 'http://localhost:3000/writeGameResult',
        type: 'POST',
        data: JSON.stringify({ date: formattedDate, time: formattedTime, result: result }),
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        },
        error: function(error) {
            console.error("Error requesting AJAX: ", error);
        }
    });
}

//GET METHOD TO READ GAMES FROM CSV FILE
function showGameResults() {
    $.ajax({
        url: 'http://localhost:3000/getGameResults',
        method: 'GET',
        dataType: 'json',
        success: function(gameResults) {
            const resultsContainer = document.getElementById('game-results-container');
            resultsContainer.innerHTML = '';

            for (let i = 1; i < gameResults.length - 1; i++) {
                const result = gameResults[i];
                const resultDiv = document.createElement('div');
                resultDiv.textContent = `${result.date} ${result.time}: ${result.result}`;
                resultsContainer.appendChild(resultDiv);
            }
            resultsContainer.style.display = 'block';
        },
        error: function(error) {
            console.error("Error en la solicitud AJAX: ", error);
        }
    });
}

function hideGameResults() {
    const resultsContainer = document.getElementById('game-results-container');
    resultsContainer.style.display = 'none'; // Ocultar los resultados
}

const showResults = document.getElementById("game-results");

showResults.addEventListener("mouseenter", showGameResults);
showResults.addEventListener("mouseleave", hideGameResults);;


function getValue(card) {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) { 
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function restartGame() {
    dealerSum = 0;
    yourSum = 0;
    dealerAceCount = 0;
    yourAceCount = 0;
    hidden = "";
    canHit = true;

    var blackjackGameContainer = document.getElementById("blackjack-game");
    blackjackGameContainer.innerHTML = "";

    var initialContent = `
        <h2>Dealer: <span id="dealer-sum"></span></h2>
        <div id="dealer-cards">
            <img id="hidden" src="../img/BACK.png">
        </div>
        <h2>Player: <span id="your-sum"></span></h2>
        <div id="your-cards"></div>
        <h2 id="results"></h2>
        <div class="blackjack-buttons">
            <button id="hit">Hit</button>
            <button id="restart">&#8634;</button>
            <button id="stay">Stand</button>
        </div>
    `;
    blackjackGameContainer.innerHTML = initialContent;

    startGame();
    
    document.getElementById("restart").addEventListener("click", restartGame);
}

document.getElementById("restart").addEventListener("click", restartGame);



window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();
    checkUserTickets();

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
}