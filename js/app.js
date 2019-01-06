/*
 * Create a list that holds all of your cards
 */

const icons = ['diamond', 'paper-plane-o', 'anchor', 'bolt', 'cube', 'leaf', 'bicycle', 'bomb'];
let cards = icons.concat(icons);
let movesCount = 0;
let mistakes = 0;
let playable = false;
let movesCountElement = document.getElementById('movesCount');

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function toggleCard(element) {
    element.classList.toggle('open');
    element.classList.toggle('show');
}

function determineAndUpdateStars() {
    switch (mistakes) {
        case 0:
            document.getElementById('star1').className = 'fa fa-star';
            document.getElementById('star2').className = 'fa fa-star';
            document.getElementById('star3').className = 'fa fa-star';
            break;
        case 1:
            document.getElementById('star3').className = 'fa fa-star-half-o';
            break;
        case 3:
            document.getElementById('star3').className = 'fa fa-star-o';
            break;
        case 6:
            document.getElementById('star2').className = 'fa fa-star-half-o';
            break;
        case 10:
            document.getElementById('star2').className = 'fa fa-star-o';
            break;
        case 15:
            document.getElementById('star1').className = 'fa fa-star-half-o';
            break;
        case 20:
            document.getElementById('star1').className = 'fa fa-star-o';
            break;
    }
}

function updateMovesCounter() {
    movesCountElement.textContent = movesCount;
    determineAndUpdateStars();
}

// resets all
function reset() {
    playable = false;
    movesCount = 0;
    mistakes = 0;
    cards = shuffle(cards);

    cards.forEach(function (cardIcon, index) {
        let card = document.getElementById(`card${index}`);
        card.className = 'card';
        card.firstElementChild.className = `fa fa-${cardIcon}`;
    });

    updateMovesCounter();


    let toggle = function () {
        document.querySelectorAll('.card').forEach(toggleCard);
    };

    toggle();
    setTimeout(toggle, 1500);
    setTimeout(function () {playable = true;}, 1500);
}

function toggleMatch(card) {
    toggleCard(card);
    card.classList.toggle('match');
}

function setMatch(card, matchingCard) {
    toggleMatch(card);
    toggleMatch(matchingCard);
}

function setMismatch(card, mismatchedCard) {
    // TODO: Animate error
    card.classList.toggle('error');
    mismatchedCard.classList.toggle('error');
    mistakes++;
    setTimeout(function () {
        toggleCard(card);
        card.classList.toggle('error');
    }, 1500);
    setTimeout(function () {
        toggleCard(mismatchedCard);
        mismatchedCard.classList.toggle('error');
    }, 1500);
    setTimeout(function () {playable = true;}, 1500);
}

function checkForVictory() {
    if (cards.length === document.querySelectorAll('.match').length) {
        //TODO: create victory screen
        console.log('victory');
    }
}

function cardClick(event) {
    // If there is something going on that can't be interrupted, we do nothing
    if (!playable) return 0;

    // If the clicked card is already open or already matches, we do nothing
    let card = event.target;
    if (card.classList.contains('open') || card.classList.contains('match')) return 0;

    // The first thing we do is make sure nothing else can be clicked, and we show the card
    playable = false;
    let otherCard = document.querySelector('.show');

    toggleCard(card);

    console.log(otherCard);
    console.log(otherCard !== null);
    if (otherCard !== null) {
        console.log(otherCard.firstElementChild.classList[1] === card.firstElementChild.classList[1]);
        if (otherCard.firstElementChild.classList[1] === card.firstElementChild.classList[1]) {
            setMatch(card, otherCard);
            playable = true;
        }
        else {
            setMismatch(card, otherCard);
        }
    }
    else {
        playable = true;
    }

    movesCount++;
    updateMovesCounter();
    checkForVictory();
}

function setup() {
    document.querySelectorAll('.card').forEach(function (element) {
        element.addEventListener('click', cardClick);
    });

    reset();
}
