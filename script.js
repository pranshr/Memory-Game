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

function buildCard(cardColor) {
    const cardWrapper = document.createElement('div');
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    // Adding Classes
    cardWrapper.classList.add('card-wrapper')
    card.classList.add('card');
    front.classList.add('front');
    back.classList.add('back');

    cardWrapper.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    back.style.backgroundColor = cardColor;

    card.addEventListener('click', function() {
       console.log("Card Clicked!");
       if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
       } else {
        card.classList.remove('flipped');
       }
    });

    return cardWrapper;
}


// Our options
const colorOptions = ['coral', 'aqua', 'crimson', 'cadetblue'];
const cardCount = colorOptions.length * 2;

// Doubling the array to get the actual color list for the cards
let finalColorsArray = colorOptions.concat(colorOptions);

// Adding more cards to the board
const gameArea = document.getElementById('game-area');
for (let i=0; i < cardCount; i++) {
    // Pick a random Color
    const index = Math.floor(Math.random() * finalColorsArray.length);
    const color = finalColorsArray.splice(index, 1)[0];

    gameArea.appendChild(buildCard(color));
}