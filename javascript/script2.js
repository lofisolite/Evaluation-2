jQuery(document).ready(() => {
  $('#title-rules').click(function(){$('#rules').slideToggle('400', 'linear')})

  $('#credits').click(function(){$('#footer-child').slideToggle('400', 'linear')})
})


/* Essai changement texte règles
let titleRules = document.getElementById('title-rules');

if(titleRules.textContent == "Lire les règles du jeu"){
  titleRules.addEventListener('click', () => {
  titleRules.textContent = "Cacher les règles du jeu";})
}
if(titleRules.textContent == "Cacher les règles du jeu"){
  titleRules.addEventListener('click', () => {
  titleRules.textContent = "Lire les règles du jeu";})
}*/

// DOM
const buttonDiceThrow = document.getElementById('throw');
const hold = document.getElementById('hold');
const newGame = document.getElementById('new-game');
const currentScore1 = document.getElementById('score-current-1');
const currentScore2 = document.getElementById('score-current-2');
const globalScore1 = document.getElementById('score-global-1');
const globalScore2 = document.getElementById('score-global-2');
const text1 = document.getElementById('p-text1');
const diceImage = document.getElementById('dice-image');
const main1 = document.getElementById('main-left');
const main2 = document.getElementById('main-right');

// Audio
const audioDice = new Audio('Audio/dice.wav');
const audioHold = new Audio('Audio/hold.wav');
const audioLost = new Audio('Audio/lost.wav');
const audioWin = new Audio('Audio/win.flac');


// Variables
let player1 = true;
let player2;
let result;
let resultCurrentScore1 = 0;
let resultCurrentScore2 = 0;
let resultGlobalScore1 = 0;
let resultGlobalScore2 = 0;

// Fonction chiffre dée aléatoire
function randomNumber(){
  return (Math.floor(Math.random() * 5) +1);
}

// Gestionnaire d'événements
buttonDiceThrow.addEventListener('click', () =>{
  audioDice.play();
  diceThrow();
})

hold.addEventListener('click', () =>{
  audioHold.play();
  globalPlayerScore();
})

newGame.addEventListener('click', () =>{

})

// Function score global
function globalPlayerScore(){
  if(player1 === true){
    resultGlobalScore1 += resultCurrentScore1;
    globalScore1.innerText = resultGlobalScore1;
    resultCurrentScore1 = 0;
    currentScore1.innerText = 0;
    player1 = false;
    player2 = true;
  }

  if(player2 === true){
    resultGlobalScore2 += resultCurrentScore2;
    globalScore2.innerText = resultGlobalScore2;
    resultCurrentScore2 = 0;
    currentScore2.innerText = 0;
    player1 = true;
    player2 = false;
  }
}

// Function lancer de dé
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
      console.log(result);
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
      console.log(result);

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
