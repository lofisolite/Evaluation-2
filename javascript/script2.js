jQuery(document).ready(() => {
  $('#title-rules').click(function (){$('#rules').slideToggle('400', 'linear')})

  $('#credits').click(function (){$('#footer-child').slideToggle('400', 'linear') })
})

// DOM constantes
const buttonDiceThrow = document.getElementById('throw');
const hold = document.getElementById('hold');
const newGame = document.getElementById('new-game');
const currentScore1 = document.getElementById('score-current-1');
const currentScore2 = document.getElementById('score-current-2');
const globalScore1 = document.getElementById('score-global-1');
const globalScore2 = document.getElementById('score-global-2');
const text1 = document.getElementById('p-text1');
const winText = document.getElementById('p-win');
const diceImage = document.getElementById('dice-image');
const main1 = document.getElementById('main-left');
const main2 = document.getElementById('main-right');
const muted = document.getElementById('mute');
const mutedText = document.getElementById('p-mute');

// Audio
const audioDice = new Audio('Audio/dice.wav');
const audioHold = new Audio('Audio/hold.wav');
const audioLost = new Audio('Audio/lost.wav');
const audioWin = new Audio('Audio/win.flac');
const audioNew = new Audio('Audio/new.flac');
const audio = [audioDice, audioHold, audioLost, audioWin, audioNew];
let off;
let on;

// Variables
let player1 = true;
let player2;
let result;
let resultCurrentScore1 = 0;
let resultCurrentScore2 = 0;
let resultGlobalScore1 = 0;
let resultGlobalScore2 = 0;

// function random number
function randomNumber (){
  return (Math.floor(Math.random() * 5) +1);
}

// function player style
function styleMain (main){
    if(main === main1){
      main1.style.boxShadow = '0px 0px 15px #e15f41';
      main2.style.boxShadow = '0px 0px 0px transparent';
    } else if(main === main2){
      main1.style.boxShadow = '0px 0px 0px transparent';
      main2.style.boxShadow = '0px 0px 15px #e15f41';
    }
}

// EVENT
// Event - dice throw
buttonDiceThrow.addEventListener ('click', () =>{
  audioDice.play();
  diceThrow();

  if(player1 === true){
    styleMain(main1);
  }

  if(player2 === true){
    styleMain(main2);
  }
});

// Event - press the hold bouton
hold.addEventListener('click', () =>{
  globalPlayerScore();
  if(player1 === true){
    player1 = false;
    player2 = true;
  } else {
    player1 = true;
    player2 = false;
  }
});

// Event - start a game
newGame.addEventListener('click', () =>{
  startGame();
});

// Event mute button
muted.addEventListener('click', () => {
  if(mutedText.innerText === 'Désactiver le son :'){
      mutedText.innerText = 'Activer le son :';
      muted.innerHTML = '&#128264;';
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

// Function dice Throw
function diceThrow(){
  let random = randomNumber();
  switch(random){
    case 1 :
    diceImage.setAttribute("src", "images/face-1.png");
    break;
    case 2 :
    diceImage.setAttribute("src", "images/face-2.png");
    break;
    case 3 :
    diceImage.setAttribute("src", "images/face-3.png");
    break;
    case 4 :
    diceImage.setAttribute("src", "images/face-4.png");
    break;
    case 5 :
    diceImage.setAttribute("src", "images/face-5.png");
    break;
    case 6 :
    diceImage.setAttribute("src", "images/face-6.png");
    break;
    }

    if (player1 === true){
      if(random !== 1){
      result = resultCurrentScore1 += random;
      currentScore1.innerText = result;
        if(result >= 100){
          audioWin.play();
          winText.innerText = 'Victoire du joueur 1 !';
          winText.style.display= 'inline-block';
          buttonDiceThrow.disabled = true;
          hold.disabled = true;
          styleMain(main1)
        }
      } else if(random === 1 && resultCurrentScore1 === 0){
        player1 = true;
      } else if(random === 1 && resultCurrentScore1 !== 0) {
        audioLost.play();
        currentScore1.innerText = 0;
        result = 0;
        resultCurrentScore1 = 0;
        text1.innerText = "C\'est au tour du joueur 2";
        player1 = false;
        player2 = true;
      }
  }

    if(player2 === true) {
      if(random !== 1){
      result = resultCurrentScore2 += random;
      currentScore2.innerText = result;
        if(result >= 100){
          audioWin.play();
          winText.innerText = 'Victoire du joueur 2 !';
          winText.style.display= 'inline-block';
          buttonDiceThrow.disabled = true;
          hold.disabled = true;
          styleMain(main2)
        }
      } else if(random === 1 && resultCurrentScore2 === 0){
      player2 = true;

      } else if(random === 1 && resultCurrentScore2 !== 0) {
      audioLost.play();
      result = 0;
      currentScore2.innerText = 0;
      resultCurrentScore2 = 0;
      text1.innerText = "C\'est au tour du joueur 1";
      player1 = true;
      player2 = false;
    }
  }
}


// Function hold - global score
function globalPlayerScore(){
  if(player1 === true){
    resultGlobalScore1 += resultCurrentScore1;
    globalScore1.innerText = resultGlobalScore1;
    currentScore1.innerText = 0;

      if(resultGlobalScore1 < 100){
        resultCurrentScore1 = 0;
        audioHold.play();
        text1.innerText = "C\'est au tour du joueur 2";
        styleMain(main2);
      }

      if(resultGlobalScore1 >= 100){
        audioWin.play();
        winText.innerText = 'Victoire du joueur 1 !';
        winText.style.display= 'inline-block';
        buttonDiceThrow.disabled = true;
        hold.disabled = true;
        styleMain(main1)
      }
    }

  if(player2 === true){
    resultGlobalScore2 += resultCurrentScore2;
    globalScore2.innerText = resultGlobalScore2;
    currentScore2.innerText = 0;

    if(resultGlobalScore2 < 100){
    resultCurrentScore2 = 0;
    audioHold.play();
    text1.innerText = "C\'est au tour du joueur 1";

    styleMain(main1);
  }

    if(resultGlobalScore2 >= 100){
    audioWin.play()
    winText.innerText = 'Victoire du joueur 2 !';
    winText.style.display= 'inline-block';
    buttonDiceThrow.disabled = true;
    hold.disabled = true;
    styleMain(main2);
    }
  }
}

// function new game
function startGame (){
  audioNew.play();
  player1 = true;
  styleMain(main1);
  winText.style.display = 'none';
  winText.innerText = '';
  currentScore1.innerText = 0;
  currentScore2.innerText = 0;
  resultCurrentScore1 = 0;
  resultCurrentScore2 = 0;

  globalScore1.innerText = 0;
  globalScore2.innerText = 0;
  resultGlobalScore1 = 0;
  resultGlobalScore2 = 0;
  buttonDiceThrow.disabled = false;
  hold.disabled = false;
}
