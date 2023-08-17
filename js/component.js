class HowToPlayContent extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: 'open' });

        const content = document.createElement('div');
        content.setAttribute('class', 'content');

        content.innerHTML = `
        <h2>Blackjack:</h2>
        <p><strong>Objective:</strong> The goal of Blackjack is to beat the dealer by having a hand value closer to 21 without going over.</p>
        <ul>
        <li>Each player and the dealer are dealt two cards. The dealer's second card is usually dealt face down (hole card). Number cards (2-10) are worth their face value, face cards (Jack, Queen, King) are worth 10, and an Ace can be worth 1 or 11, depending on what benefits the hand.</li>
    
        <li>Players can choose to "hit" to receive additional cards or "stand" to keep their current hand. The goal is to get as close to 21 as possible without exceeding it. Players can continue to hit until they are satisfied with their hand or they exceed 21 (bust).</li>
    
        <li>Once all players have finished their turns, the dealer reveals their hole card. The dealer must hit until their hand value is 17 or higher. If the dealer busts, players who haven't bust win.</li>
    
        <li>The player with a hand value closer to 21 than the dealer wins. If the player's hand value equals the dealer's, it's a "push," and the player's bet is returned. Blackjack is achieved with an Ace and a 10-point card and typically pays out more.</li>
        </ul>
        <h2>Dice Game:</h2>
        <p><strong>Objective:</strong> In the Dice Game, you'll roll dice and try to match your guess to the outcome of the dice roll.</p>
        <ul>
        <li>You start with a certain number of guesses (e.g., 10) and a score of 0. You also have a stash of tickets that you can win or lose.</li>
    
        <li>You'll guess a number between 1 and 6 and click the "Roll" button. The dice will be rolled, and the outcome will be displayed. If your guess matches the roll, you win a reward.</li>
    
        <li>If your guess matches the roll, you'll earn a reward based on the rewards table. The reward amount will be added to your score.</li>
    
        <li>Each roll consumes one guess. As you play, your score increases, and you earn or lose tickets based on your success. If you run out of guesses or tickets, the game ends.</li>
    
        <li>If you lose and your score is 0, you'll lose a ticket. You can reset the game to start fresh with your remaining tickets and guesses.</li>
    
        <li>The "currency" displayed represents your accumulated tickets. You can use these tickets to play the game.</li>
    
        <li>Keep playing, making guesses and rolling dice, to try to increase your score and accumulate more tickets.</li>
        </ul>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .content {
                position: absolute;
                right: 10px;
                background: black;
                border: 1px solid black;
                padding: 10px;
                border-radius: 5px;
                width: 90vw;
                z-index: 1000;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
                overflow: auto;
                max-height: 80vh;
            }
        `;

        shadow.appendChild(style);
        shadow.appendChild(content);
    }
}

customElements.define('how-to-play-content', HowToPlayContent);

document.addEventListener('DOMContentLoaded', () => {
    const howToPlayLink = document.querySelector('.navcomponent');

    howToPlayLink.addEventListener('mouseenter', () => {
        const contentElement = document.createElement('how-to-play-content');
        howToPlayLink.appendChild(contentElement);
    });

    howToPlayLink.addEventListener('mouseleave', () => {
        const contentElement = howToPlayLink.querySelector('how-to-play-content');
        if (contentElement) {
            contentElement.remove();
        }
    });
});

