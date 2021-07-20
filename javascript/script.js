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

// Audio
const audioDice = new Audio('Audio/dice.wav');
const audioHold = new Audio('Audio/hold.wav');
const audioLost = new Audio('Audio/lost.wav');
const audioWin = new Audio('Audio/win.flac');

buttonDiceThrow.addEventListener('click', () =>{
  audioDice.play();
  diceThrow();
})

let essai = hold.addEventListener('click', () =>{
  audioHold.play();
})

// Chiffre dée aléatoire
function randomNumber(){
  return (Math.floor(Math.random() * 5) +1);
}

let player1 = true;
let player2;
let result;
let resultCurrentScore1 = 0;
let resultCurrentScore2 = 0;

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

  if(player1 === true){
    if(random !== 1){
      result = resultCurrentScore1 += random;
      currentScore1.innerText = result;
      player1 = true;
      player2 = false;
      console.log(result);
    } else {
      currentScore1.innerText = 0;
      audioLost.play();
      result = 0;
      resultCurrentScore1 = 0;
      text1.innerText = "c\'est au tour du joueur 2";
      player1 = false;
      player2 = true;
    }
  }

  if(player2 === true){
    if(random !== 1){
      result = resultCurrentScore2 += random;
      currentScore2.innerText = result;
      player1 = false;
      player2 = true;
      console.log(result);
    } else {
      currentScore2.innerText = 0;
      audioLost.play();
      player1 = true;
      player2 = false;
      result = 0;
      resultCurrentScore2 = 0;
      text1.innerText = "bug";
    }
  }
}
