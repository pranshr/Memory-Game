// Testing card flipping and unflipping
/*
const card = document.getElementById('card');

card.addEventListener('click', function() {
    console.log("Card Clicked!");
    if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
    } else {
        card.classList.remove('flipped');
    }
});
*/

function buildCard() {
    const cardWrapper = document.createElement('div');
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    cardWrapper.classList.add('card-wrapper')
    card.classList.add('card');
    front.classList.add('front');
    back.classList.add('back');

    cardWrapper.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
    console.log("Card Made!");

    return cardWrapper;
}

// Adding more cards to the board
const gameArea = document.getElementById('game-area');
for (let i=0; i < 8; i++) {
    gameArea.appendChild(buildCard());

}