/*
 * Create a list that holds all of your cards
 */

 /*global variables*/

const cards = document.querySelectorAll('.card');
const deck = document.querySelector('.deck');
let toggledCards = [];
let sec = document.querySelector('.seconds');
let min = document.querySelector('.minutes');
let moves = document.querySelector('.moves');
var iteration = 0;
let star1 = document.querySelector('.star1');
let star2 = document.querySelector('.star2');
let star3 = document.querySelector('.star3');
let restart = document.querySelector('.restart');
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

/*game functions*/
/*main click function*/
deck.addEventListener('click', reset);

function reset(event){
  const clickTarget = event.target;
  if (isClickValid(clickTarget)){
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2){
      checkForMatching()
      /*/moves counter/*/
      iteration++;
      moves.textContent = iteration;
      if (iteration == 15){
        star1.classList.toggle('disappear');
      }else if(iteration == 25){
        star2.classList.toggle('disappear');
      }
    }
  }
}
/*check if the card clicked is valid*/
function isClickValid(clickTarget){
  return(
    clickTarget.classList.contains('card')
    && toggledCards.length < 2
    && !toggledCards.includes(clickTarget)
    && !clickTarget.classList.contains('match')
  );
}
shuffleCards();
/*toggle classes {open & show}*/
function toggleCard(clickTarget){
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

/*add the clicked card to the temporary array*/
function addToggleCard(clickTarget){
  toggledCards.push(clickTarget);
}

/*the match checking function*/
function checkForMatching(){
  if(toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className){
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
  } else {
    setTimeout(() => {
      toggleCard(toggledCards[0]);
      toggleCard(toggledCards[1]);
      toggledCards = [];
    }, 750);
    toggledCards[0].classList.toggle('mismatch');
    toggledCards[1].classList.toggle('mismatch');
  }
}

/*apply the shuffle function*/
function shuffleCards() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards){
    deck.appendChild(card);
  }
}
// shuffleCards();//calling the function


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

/*/Timer/*/

var second = 0;
var minute = 0;
timerSet();//invoke timer
function timerSet(){setInterval(function(){
  second++;
  if(second<59){
    if(second < 10){
      sec.textContent='0' + second;
    } else {
      sec.textContent = second;
    }
  } else if (second == 59) {
    if(minute < 10){
      minute++;
      second = 0;
      min.textContent = '0' + minute;
    }else{
      minute++;
      second = 0;
      min.textContent = minute;
    }
  }
}, 1000)}
/*/clear timer /*/
function clearTimer(){
  clearInterval(timerSet);
  second = 0;
  minute = 0;
  min.textContent = 0;
}
 /*//reset moves to 0*/
function resetMoves(){
  moves.textContent = 0;
  iteration = 0;
}
/*/reset button/*/
restart.addEventListener('click', function(){
  clearTimer();
  resetMoves();
  const listOfCards = Array.from(cards);
  for(let i = 0;i<listOfCards.length;i++){
    listOfCards[i].classList.remove('show', 'open', 'match')
  }
  toggledCards=[];
});





/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
