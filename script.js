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

function buildCard(cardColor, id) {
    const cardWrapper = document.createElement('div');
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    // Adding Classes
    cardWrapper.classList.add('card-wrapper');
    card.classList.add('card');
    front.classList.add('front');
    back.classList.add('back');

    cardWrapper.id = id;
    
    cardWrapper.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);

    back.style.backgroundColor = cardColor;

    card.addEventListener('click', function() {
       if (!card.classList.contains('flipped')) {
        card.classList.add('flipped');
       } /*else {
        card.classList.remove('flipped');
       }*/
      checkCard(cardWrapper.id);
    });
    

    return cardWrapper;
}

function checkCard(id) {
    if (pickedCardObjectsArray.includes(cardObjectsArray[id])) {
        return;
    }

    if (!pickedCardIndex) {
        // No card has been previously selected
        pickedCardIndex = id;

    } else {
        // Player has picked a card before
        if (id === pickedCardIndex) {
            // New card is same as picked card
            return;
        } else {
            // New card is different from picked card
            if (cardObjectsArray[id].cardColor === cardObjectsArray[pickedCardIndex].cardColor) {
                // New card has same color as old card
                unflippedCards += 2;
                pickedCardObjectsArray.unshift(cardObjectsArray[id]);
                pickedCardObjectsArray.unshift(cardObjectsArray[pickedCardIndex]);
                pickedCardIndex = null;

                if (unflippedCards === cardCount) {
                    setTimeout(() => {
                        winGame();
                    }, 800);
                }

            } else {
                // New card is not the same color as old card
                setTimeout(() => {
                    cardObjectsArray[id].cardObject.classList.remove('flipped');
                    cardObjectsArray[pickedCardIndex].cardObject.classList.remove('flipped');
                    pickedCardIndex = null;
                }, 1500);
            }
        }
    }
}

function winGame() {
    alert("You Won!");
}



// Our options
const colorOptions = ['coral', 'aqua', 'crimson', 'cadetblue'];
const cardCount = colorOptions.length * 2;

// Doubling the array to get the actual color list for the cards
let finalColorsArray = colorOptions.concat(colorOptions);
let cardObjectsArray = [];
let pickedCardObjectsArray = [];
let pickedCardIndex = null;
let unflippedCards = 0;

// Adding more cards to the board
const gameArea = document.getElementById('game-area');
for (let i=0; i < cardCount; i++) {
    // Pick a random Color
    const index = Math.floor(Math.random() * finalColorsArray.length);
    const color = finalColorsArray.splice(index, 1)[0];

    const tempCard = buildCard(color, i)
    gameArea.appendChild(tempCard);
    cardObjectsArray[i] = {
        cardIndex: i,
        cardObject: tempCard.children[0],
        cardColor: color
    };
}