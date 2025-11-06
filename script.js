function buildCard(cardColor, id) {
    const cardWrapper = document.createElement('div');
    const card = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    //const gameAreaDimensions = gameArea.getBoundingClientRect();
    //const cardWidth = Math.floor((gameAreaDimensions.width - 3*gameArea.style.gap) / 4);
    //const cardHeight = Math.floor(cardWidth * 15/11);

    //cardWrapper.style.width = cardWidth + 'px';
    //cardWrapper.style.height = cardHeight + 'px';

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
       }
      checkCard(cardWrapper.id);
    });
    

    return cardWrapper;
}

function randomiseCards() {

    let finalColorsArray = colorOptions.concat(colorOptions);
    
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
                extendTime();

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
    score = countdownTimer * 100;
    console.log("score");
    clearInterval(interval);
    interval = null;
    gameBlocker.style.display = 'block';

    // const name = prompt("Enter your name:");
    // if (!name) return;
    mainModal.style.display = 'flex';
    infoModal.style.display = 'none';
    winModal.style.display = 'block';
    
}

function resetGame() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        countdownTimer = countdownTime;
        updateDisplay();
        gameArea.replaceChildren();
        randomiseCards();
        startGame();
    }
}

function stopGame() {
    if (interval) {
        clearInterval(interval);
        interval = null;
        countdownTimer = countdownTime;
        updateDisplay();
        gameArea.replaceChildren();
        randomiseCards();
        gameBlocker.style.display = 'block';
    }
}

function startGame() {
    gameBlocker.style.display = 'none';
    if (!interval) {
        const timerElement = document.getElementById('timer');
        timerElement.innerText = countdownTimer;
        startTimer(timerElement);
    }
}

function gameOver() {
    mainModal.style.display = 'flex';
    infoModal.style.display = 'none';
    loseModal.style.display = 'block';
    countdownTimer = countdownTime;
}

function startTimer() {
    if (interval) return; // Already running
    interval = setInterval(() => {
        if (countdownTimer > 0) {
            countdownTimer--;
            updateDisplay();
        } else {
            gameOver();
            clearInterval(interval);
            interval = null;
        }
      }, 1500);
}

function updateDisplay() {
    const timerElement = document.getElementById('timer');
    timerElement.innerText = countdownTimer;
}

function extendTime() {
    countdownTimer += incrementTime;
    incrementTimeElement.innerText = '+' + incrementTime;
    incrementTimeElement.style.display = 'block';
    setInterval(() => {
        incrementTimeElement.style.display = 'none';
    }, 1500);

    
    updateDisplay();
}

function loadLeaderboard() {
    const tableBody = document.querySelector('#leaderboardTable tbody');
    tableBody.innerHTML = '';

    let data = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    data.sort((a, b) => b.score - a.score);

    data.forEach((entry, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
    `;
    tableBody.appendChild(row);
    });
}

function closeModal() {
    mainModal.style.display = "none";
}




// Our options
const colorOptions = ['coral', 'aqua', 'crimson', 'cadetblue', 'darkolivegreen', 'khaki', 'red', 'black'];
const cardCount = colorOptions.length * 2;
const incrementTime = 3;
const countdownTime = 20;

const leaderboardKey = 'leaderboardData';

const gameArea = document.getElementById('game-area');
const resetButton = document.getElementById('reset');
const stopButton = document.getElementById('stop');
const startButton = document.getElementById('start');
const incrementTimeElement = document.getElementById('extend');
const leftPanel = document.getElementById('left-card');
const gameBlocker = document.getElementById('game-blocker');
const mainModal = document.getElementById("main-modal");
const okModal = document.querySelectorAll("#okBtn");
const infoModal = document.querySelector('#info-modal');
const winModal = document.querySelector('#win-modal');
const loseModal = document.querySelector('#lose-modal');
const nameInput = document.getElementById('name-input');
const form = document.getElementById('win-form');

let cardObjectsArray = [];
let pickedCardObjectsArray = [];
let pickedCardIndex = null;
let unflippedCards = 0;

let countdownTimer = countdownTime;
let interval = null;
let score = 0;
let playerName;


randomiseCards();

resetButton.onclick = resetGame;
stopButton.onclick = stopGame;
startButton.onclick = startGame;
incrementTimeElement.style.display = 'none';

console.log(gameArea.getBoundingClientRect());
console.log(leftPanel.getBoundingClientRect());

//gameBlocker.style.width = gameArea.getBoundingClientRect().width + 'px';
//gameBlocker.style.left = gameArea.getBoundingClientRect().left + 'px'; 
gameBlocker.style.display = 'block';

mainModal.style.display = "flex";
loseModal.style.display = "none";
winModal.style.display = "none";

for (var i=0; i < okModal.length; i++) {
    if (i === 1) {
        continue;
    }
    okModal[i].onclick = closeModal;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    if (name === '') {
      alert('Please enter your name before continuing.');
      return;
    }

    let data = JSON.parse(localStorage.getItem(leaderboardKey)) || [];
    data.push({ name, score });
    localStorage.setItem(leaderboardKey, JSON.stringify(data));

    loadLeaderboard();

    // Name entered, allow modal to "close"
    mainModal.style.display = 'none';
});

loadLeaderboard();