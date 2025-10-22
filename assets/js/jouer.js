let score = 0;
let nbrMancheMin = 12;
let manchegagne = 0 ;
let partieGg = false;
let nombreDeCarteSelectionnee = 0;
let carte1;
let carte2;
let temp;
const messageHTML = document.getElementById("message");
const cartes = document.querySelectorAll(".carte");
const messageGagneHTML = document.getElementById("message_gagne");

function gagneMancheOuPas(c1,c2){
    if(c1.childNodes[3].src === c2.childNodes[3].src){
        manchegagne++;
    }
    if(manchegagne === nbrMancheMin/2){
        messageGagne();
        messageGagneHTML.style.display = "block";
    }
}
function onRetourneLesCartesSiPerdu(c1,c2){
    if(c1.childNodes[3].src !== c2.childNodes[3].src){
        c1.classList.remove('visible');
        c2.classList.remove('visible');
    }
}
//Si le nombre de manchegagne est égal au nombre de cartes div par 2 alors partiegagne = true
function changeMessage(){
    const message = `Nombre de coups : ${score}`;
    messageHTML.textContent = message;
}
function messageGagne(){
    const message = `Votre score final : ${score}`;
    messageHTML.textContent = message;
}
function leScoreMonte(c1,c2){
    score ++;
    if(manchegagne !== nbrMancheMin/2){
        changeMessage();
    }
}
function tournerCarte(){
    this.classList.add('visible');
    switch (nombreDeCarteSelectionnee) {
        case 0:
            carte1 = this;
            nombreDeCarteSelectionnee ++;
            break;
        case 1:
            carte2 = this;
            nombreDeCarteSelectionnee ++;
            leScoreMonte(carte1,carte2);
            verifErreurDoubleClick(carte1,carte2);
            gagneMancheOuPas(carte1,carte2);
            break;
        case 2:
            onRetourneLesCartesSiPerdu(carte1,carte2);
            carte1 = this;
            nombreDeCarteSelectionnee=1;
        default:
            break;
    }
}
function reinitialiser(){
    const cartesRetournees = document.querySelectorAll(".visible");
    nombreDeCarteSelectionnee=0;
    score = 0 ;
    manchegagne = 0;
    cartesRetournees.forEach(carte => carte.classList.remove("visible"));
    changeMessage();
}
function verifErreurDoubleClick(c1,c2){
    //si doubleClick alors afficher vous avez triché et réinitialisé.
    if(c1.childNodes[3] === c2.childNodes[3]){
        alert('Vous avez triché');
        reinitialiser();
        //pour gérer l'incrémentation qui arrive après la vérif.
        manchegagne--;
    }
}

// ------------LES EVENEMENTS ----------------------
cartes.forEach(carte => carte.addEventListener('click',tournerCarte));

//appuyer sur la barre espace pour réinitialiser le score, le nombre de manchegagne et le nombre de carte sélectionnée et remettre toutes les cartes faces cachées
document.addEventListener('keydown',(e) => {
    if(e.key===" "){
        reinitialiser();
    }
})

// https://marina-ferreira.github.io/tutorials/js/memory-game/