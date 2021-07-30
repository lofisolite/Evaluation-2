// jQuery slideToggle function
jQuery(document).ready(() => {
  $('#title-rules').click(function (){$('#rules').slideToggle('400', 'linear')})

  $('#credits').click(function (){$('#footer-child').slideToggle('400', 'linear') })
})

// DOM constantes
const buttonDiceThrow = document.getElementById('throw');
const hold = document.getElementById('hold');
const newGame = document.getElementById('new-game');
const text1 = document.getElementById('p-text1');
const stateText = document.getElementById('p-state');
const winText = document.getElementById('p-win');
const diceImage = document.getElementById('dice-image');
const muted = document.getElementById('mute');
const mutedText = document.getElementById('p-mute');

// cst images
var diceImageToNumber = {
  1: "images/face-1.png",
  2: "images/face-2.png" ,
  3: "images/face-3.png" ,
  4: "images/face-4.png" ,
  5: "images/face-5.png" ,
  6: "images/face-6.png"
};

// Audio variables
const audioDice = new Audio('audio/dice.wav');
const audioHold = new Audio('audio/hold.wav');
const audioLost = new Audio('audio/lost.wav');
const audioWin = new Audio('audio/win.flac');
const audioNew = new Audio('audio/new.flac');
const audio = [audioDice, audioHold, audioLost, audioWin, audioNew];


let result;
let currentPlayer = 1;

// Object
let Player = function(id, name) {
  this.name = name;
  this.id = id;
  this.resultCurrentScore = 0;
  this.resultGlobalScore = 0;
  this.domIdPlayer = document.getElementById('player-name' + this.id);
  this.domIdPlayer.innerText = this.name;
  this.currentScore = document.getElementById('score-current-' + this.id);
  this.globalScore = document.getElementById('score-global-' + this.id);
  if (this.id === 1) {
    this.main = document.getElementById('main-left');
  } else {
    this.main = document.getElementById('main-right');
  }
};

// Object methods
// Dice Throw function
Player.prototype.play = function() {
  let random = randomNumber();
  diceImage.setAttribute("src", diceImageToNumber[random]);
  setButtonStyle(active === true);
  if(random !== 1) {
    result = this.resultCurrentScore += random;
    this.currentScore.innerText = result;
    text1.innerText = "C\'est au tour de " + this.name;
    stateText.style.display= 'inline-block';
    if(result === undefined){
      stateText.innerText = this.name + " gagne 0 points";
    } else {
    stateText.innerText = this.name + " gagne " + this.currentScore.innerText + " points";
    }

    if(result >= 100) {
      win();
    }

  } else if(random === 1) {
    audioLost.play();
    if(result === undefined) {
      stateText.innerText = this.name + " perd 0 points";
    } else {
      stateText.innerText = this.name + " perd " + this.currentScore.innerText + " points";
    }
    stateText.style.display= 'inline-block';
    this.currentScore.innerText = 0;
    result = 0;
    this.resultCurrentScore = 0;

    // Switch to the other player
    if (this.id === 1) {
      currentPlayer = 2
    } else {
      currentPlayer = 1
    }
    setMainStyle(players[currentPlayer].id);
    text1.innerText = "C\'est au tour de " + players[currentPlayer].name;
  }
}

// hold function
Player.prototype.saveScore = function(){
  this.resultGlobalScore += this.resultCurrentScore;
  this.globalScore.innerText = this.resultGlobalScore;
  this.currentScore.innerText = 0;
  setButtonStyle(active === true);

    if(this.resultGlobalScore < 100){
      audioHold.play();
      stateText.style.display= 'inline-block';
      stateText.innerText = this.name + " sécurise " + this.resultCurrentScore + " points";
      this.resultCurrentScore = 0;

      // Switch to the other player
      if (this.id === 1) {
        currentPlayer = 2;
      } else {
        currentPlayer = 1;
      }
      setMainStyle(players[currentPlayer].id);
      text1.innerText = "C\'est au tour de " + players[currentPlayer].name;
    }

    if(this.resultGlobalScore >= 100){
      win();
    }
}

// Reset function
Player.prototype.reset = function() {
  this.currentScore.innerText = 0;
  this.resultCurrentScore = 0;
  this.globalScore.innerText = 0;
  this.resultGlobalScore = 0;
}

// Object assignation
let players = {
  1: new Player(1, 'Sacha'),
  2: new Player(2, 'Ondine')
};

// Functions
// function random number
function randomNumber () {
  return Math.floor(Math.random() * 5) +1;
}

// function player style
function setMainStyle(id) {
    players[id].main.style.boxShadow = '0px 0px 15px #e15f41';
    if (id === 1) {
      players[2].main.style.boxShadow = '0px 0px 0px transparent';
    } else {
      players[1].main.style.boxShadow = '0px 0px 0px transparent';
    }
}

// function button style
let active = true;
function setButtonStyle(active){
  if(active === true){
    buttonDiceThrow.setAttribute('class', 'on');
    hold.setAttribute('class', 'on');
  } else if (active ===false){
    buttonDiceThrow.setAttribute('class', 'disabled');
    hold.setAttribute('class', 'disabled');
  }
}

// function win
function win() {
  audioWin.play();
  stateText.style.display= 'none';
  winText.innerText = 'Victoire de ' + players[currentPlayer].name + ' !';
  winText.style.display= 'inline-block';
  buttonDiceThrow.disabled = true;
  hold.disabled = true;
  setButtonStyle(active === false);
  setMainStyle(players[currentPlayer].id);
}

// function start new game
function startGame() {
  setButtonStyle(active === true);
  currentPlayer = 1
  text1.innerText = 'C\'est au tour de ' + players[currentPlayer].name;
  setMainStyle(players[currentPlayer].id);
  stateText.style.display= 'none';
  winText.style.display = 'none';
  buttonDiceThrow.disabled = false;
  hold.disabled = false;
  players[1].reset();
  players[2].reset();
}

// Events
// Event - dice throw
buttonDiceThrow.addEventListener ('click', () => {
  audioDice.play();
  players[currentPlayer].play();
});

// Event - click the hold bouton
hold.addEventListener('click', () => {
  audioHold.play();
  players[currentPlayer].saveScore()
});

// Event - start a game
newGame.addEventListener('click', () =>{
  audioNew.play();
  startGame();
});

// Event mute button
muted.addEventListener('click', () => {
  if(mutedText.innerText === 'Désactiver le son :'){
      mutedText.innerText = 'Activer le son :';
      muted.innerHTML = '&#128266;';
      for(let track of audio){
        track.muted = true;
      }

  } else if(mutedText.innerText === 'Activer le son :') {
      mutedText.innerText = 'Désactiver le son :';
      muted.innerHTML = '&#128263;';
      for(let track of audio){
        track.muted = false;
      }
  }
});
