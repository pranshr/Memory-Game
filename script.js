const card1 = document.getElementById('card1');
card1.addEventListener('click', function() {
    console.log("Card Clicked!");
    if (card1.classList.contains('flipped')) {
        card1.classList.remove('flipped');
    } else {
        card1.classList.add('flipped');
    }
});