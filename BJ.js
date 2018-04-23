let cardType = ["diamonds", "harts", "clubs", "spades"],
  cardValue = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "ten", "jack", "queen", "king"];
//dom variables
let buttonNew = document.getElementById('new-game'),
  buttonHit = document.getElementById('hit'),
  buttonStay = document.getElementById('stay'),
  textArea = document.getElementById('paragraph');
winlose = document.getElementById('winlose');
//game variables
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerWon = false,
  dealerScore = 0,
  playerScore = 0,
  deck = [];
buttonHit.style.display = 'none';
buttonStay.style.display = 'none';
buttonNew.addEventListener('click', function() {
  gameStarted = true;
  deck = createDeck();
  shuffle(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  showStatus();
  buttonNew.style.display = 'none';
  buttonHit.style.display = 'inline';
  buttonStay.style.display = 'inline';
  winlose.innerText = ' do you want to hit? or stay?';
});
buttonHit.addEventListener('click', function() {
  gameOver = false
  playerCards.push(getNextCard());
  checkGameEnd();
  showStatus();
});
buttonStay.addEventListener('click', function() {
  gameOver = true;
  debugger;
  checkGameEnd();
  showStatus();
});
function createDeck() {
  let deck = [];
  for (let indexType = 0; indexType < cardType.length; indexType++) {
    for (let indexValue = 0; indexValue < cardValue.length; indexValue++) {
      card = {
        type: cardType[indexType],
        value: cardValue[indexValue]
      };
      deck.push(card);
    }
  }
  return deck;
}
function getCardString(card) {
  return card.type + " of " + card.value;
}
function shuffle(deck) {
  for (let deckIndex = 0; deckIndex < deck.length; deckIndex++) {
    swapIdx = Math.floor(Math.random() * deck.length);
    tmp = deck[swapIdx]
    deck[swapIdx] = deck[deckIndex];
    deck[deckIndex] = tmp
  }
}
function getNextCard() {
  return deck.shift();
}
function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
     return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
   case 'Eight':
      return 8;
    case 'Nine':
     return 9;
    default:
      return 10;
  }
}
function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score = score + getCardNumericValue(card);
    if (card.value === 'ACE') {
      hasAce = true
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}
function updateScore() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}
function checkGameEnd() {
  updateScore();
  if (gameOver) {
    while (dealerScore < playerScore && playerScore < 22 && dealerScore < 22) {
      dealerCards.push(getNextCard());
      updateScore();
    }
  }
  debugger;
  if (playerScore > 21) {
    dealerWon = true;
    playerWon = false;
    gameOver = true;
  } else if (dealerScore > 21) {
    playerWon = true;
    dealerWon = false;
    gameOver = true;
    debugger;
  } else if (playerScore === 21) {
    playerWon = true;
    dealerWon = false;
    gameOver = true;
  } else if (gameOver) {
    if (playerScore > dealerScore) {
      debugger;
      playerWon = true;
      dealerWon = false;
    } else {
      dealerWon = true;
      playerWon = false;
      debugger;
    }
  }
}
function showStatus() {
  if (!gameStarted) {
    textArea.innerText = "welcome to my BlackJack dude";
    return;
  }
  let dealerCardString = '';
  for (let i = 0; i < dealerCards.length; i++) {
    dealerCardString = dealerCardString + getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString = '';
  for (let i = 0; i < playerCards.length; i++) {
    playerCardString = playerCardString + getCardString(playerCards[i]) + '\n';
  }
  updateScore();
  textArea.innerText =
    'Dealer Has: \n' + dealerCardString + '(score ' + dealerScore + ') \n \n' +
    'player Has: \n' + playerCardString + '(score ' + playerScore + ') \n \n';
  if (gameOver) {
    debugger;
    if (playerWon) {
      winlose.innerText = 'YOU Win!!!'
    }
    if (dealerWon) {
      winlose.innerText = 'Dealer WON'
    }
    buttonHit.style.display = 'none';
    buttonStay.style.display = 'none';
    buttonNew.style.display = 'inline';
  }
}
