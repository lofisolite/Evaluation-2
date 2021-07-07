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
const diceJet = document.getElementById('lancer');
const hold = document.getElementById('hold');
const newGame = document.getElementById('new-game');
const currentScore1 = document.getElementById('score-current-1');
const currentScore2 = document.getElementById('score-current-2');
const globalScore1 = document.getElementById('score-global-1');
const globalScore2 = document.getElementById('score-global-2');
const text = document.getElementById('p-texte');


// Images
const face1 = new Image('audio/face-1.png');
const face2 = new Image('audio/face-2.png');
const face3 = new Image('audio/face-3.png');
const face4 = new Image('audio/face-4.png');
const face5 = new Image('audio/face-5.png');
const face6 = new Image('audio/face-6.png');


// Audio
const audioDice = new Audio('Audio/dice.wav');
const audioHold = new Audio('Audio/hold.wav');
const audioLost = new Audio('Audio/lost.wav');
const audioWin = new Audio('Audio/win.flac');



diceJet.addEventListener('click', () =>{
  audioDice.play();
})

hold.addEventListener('click', () =>{
  audioHold.play();
})
