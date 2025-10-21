let score = 0;
let nbrMancheMin = 12;
//Si les deux cartes retournées sont identiques alors manchegagne
let manchegagne = 0 ;
let partieGg = false;

//permet de retourner les cartes
const cartes = document.querySelectorAll(".carte");
function tournerCarte(){
    this.classList.toggle('tourne');
}
cartes.forEach(carte => carte.addEventListener('click',tournerCarte));

//permet d'afficher le score -- étape 1 à chaque fois que c'est cliqué incrémente de 1;
const messageHTML = document.getElementById("message");
cartes.forEach(carte => carte.addEventListener('click',leScoreMonte));
function leScoreMonte(){
    score ++;
    manchegagne++;
    (manchegagne === nbrMancheMin/2) ? partieGg = true : partieGg = false;
}

//Si le nombre de manchegagne est égal au nombre de cartes div par 2 alors partiegagne = true
function changeMessage(){
    let message = "Nombre de coups : 0";
    console.log(`${manchegagne} est le nombre de manche gagné et la partie est gagné :`);
    console.log(partieGg);
    if(partieGg){
        //Si la partie est gagnee alors afficher le score final
        message = `Votre score final : ${score}`;
    }else{
        message = `Nombre de coups : ${score}`;
    }    
    messageHTML.textContent = message;
}
cartes.forEach(carte => carte.addEventListener('click', changeMessage));


//appuyer sur la barre espace pour réinitialiser le score et REMETTRE TOUTES LES CARTES FACE CACHEE !
document.addEventListener('keydown',(e) => {
    const cartesRetournees = document.querySelectorAll(".tourne");
    if(e.key===" "){
        score = 0;
        cartesRetournees.forEach(carte => carte.classList.remove("tourne"));
    }
})

// https://marina-ferreira.github.io/tutorials/js/memory-game/