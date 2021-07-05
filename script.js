jQuery(document).ready(() => {

  $(function($){
    console.log('jQuery est inclus !')
});

  $('#title-rules').click(function(){$('#rules').slideToggle('slow', 'linear')})

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
