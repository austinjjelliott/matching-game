let clickedCard = null;
let preventClick = false;
let combosFound = 0;
let currentScore = 0;


const colors = [
    'red',
    'green',
    'yellow',
    'blue',
    'orange',
    'purple',
    'teal',
    'black'

]
//Assign cards a color randomly:
const cards = [...document.querySelectorAll(".card")];
for (let color of colors) {
    const cardAIndex = parseInt(Math.random()* cards.length);
    const cardA = cards[cardAIndex];
    cards.splice(cardAIndex,1);
    cardA.className += ` ${color}`;
    cardA.setAttribute('data-color', color);
   
    const cardBIndex = parseInt(Math.random()* cards.length);
    const cardB = cards[cardBIndex];
    cards.splice(cardBIndex,1);
    cardB.className += ` ${color}`;
    cardB.setAttribute('data-color', color);
}

function onCardClicked (e) {
  const target = e.currentTarget;
  currentScore++;
  displayScore();
if (preventClick || target === clickedCard || target.className.includes('done')){
  return;
}
  target.className = target.className.replace('color-hidden', '').trim();
  target.className += ' done';

  //if we havent clicked a card, keep track of the card, display its color
if (!clickedCard) {
    clickedCard = target;
} 
else if (clickedCard) {
    //if we have clicked a card, check if the new card matches the old card color
    if (clickedCard.getAttribute('data-color') !== target.getAttribute('data-color')) {
    preventClick = true;
    setTimeout(() => {
      clickedCard.className = clickedCard.className.replace('done','').trim() + ' color-hidden';
      target.className = target.className.replace('done','').trim() + ' color-hidden';
      clickedCard = null;
      preventClick = false;
    },1000)
} else {
    combosFound++;
    clickedCard = null;
    if (combosFound === 8) {
        alert('Congratulations!! You WIN!')
    }
}
} 
}

/////// end of assignment stuff. Now adding...
//Refresh button: 
const refreshBtn = document.getElementById('refresh');
function clickRefresh() {
    location.reload();
}
refreshBtn.addEventListener('click', clickRefresh);

//counter
function displayScore() {
    let scoreElement = document.querySelector('#current-score');
    scoreElement.innerHTML = `Number of attempts: ${currentScore}`;
}
window.onload = function() {
    displayScore();
};