const formulaire = document.querySelector("form");
const message = document.getElementById("message_motdepasse");
// const btnCreationCompte = document.querySelector(".btn_fin_formulaire input[name='creation']");
const nomUtilisateur = document.getElementById("nom");
const emailUtilisateur = document.getElementById("email");
const mdpUtilisateur = document.getElementById("motdepasse");
const mdpConfirm = document.getElementById("confirme_mdp");
const forces = document.querySelector(".force_mot-de-passe");
const forceFaible = document.querySelector(".force_mot-de-passe > :first-child");
const forceMoyen = document.querySelector(".force_mot-de-passe > :nth-child(2)");
const forceFort = document.querySelector(".force_mot-de-passe > :last-child");
const imgErreurNom = document.querySelector("img[alt='Erreur']");
let nomOk = false;
let emailOk = false;
let mdpOk = false;
let mdpconfOk = false;

formulaire.addEventListener('submit', validationFormulaire);

function validationFormulaire(e){
    nomOk,emailOk,mdpOk,mdpconfOk = false;
    e.preventDefault(); // empêche le rechargement de la page
    //Je fais mes tests : 
    // 1 - enregistrement du nom.
    const contenuErreurNom = "Choisissez un pseudo contenant au moins 3 caractères.";
    gestionErreur(nomUtilisateur.value.length < 3, contenuErreurNom, nomUtilisateur);
    if(nomUtilisateur.value.length>=4){nomOk=true;}
    // 2 - enregistrement du mail si pas déjà connu.
    const contenuErreurEmail = "Rentrez un email valide.";
    const conditionEmail = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(emailUtilisateur.value);
    if(localStorage.getItem("email")!==null){
        alert(`L'email ${emailUtilisateur.value} est déjà utilisé. Veuillez saisir un nouvel email.`);
    }else{
        gestionErreur(!(conditionEmail), contenuErreurEmail, emailUtilisateur);
    }
    if(conditionEmail){emailOk=true;}
    // 3 - verification de la validité du mot de passe + affichage force.
    gestionErreur(!validationMotDePasse(),null,mdpUtilisateur);
    if(validationMotDePasse()){mdpOk = true;}
    // 4 - verification confirme mot de passe identique à mot de passe.
    const phrase = "Veuillez entrer le même mot de passe.";
    gestionErreur(mdpUtilisateur.value !== mdpConfirm.value, phrase, mdpConfirm);
    if(mdpUtilisateur.value === mdpConfirm.value){mdpconfOk=true;}
    // 5 - On sauvegarde les données si tout est ok !
    console.log(nomOk);
    console.log(emailOk);
    console.log(mdpOk);
    console.log(mdpconfOk);
    if(nomOk && emailOk && mdpOk && mdpconfOk){sauvegardeDesDonnees();}
}


function gestionErreur(conditionErreur, phraseErreur, elementCible){
    const img = document.createElement("img");
    if(conditionErreur){
        img.src="/memory-game/assets/images/error.svg";
        img.alt='Erreur';
        img.style.display = "block";
        elementCible.insertAdjacentElement("afterend",img);
        if(phraseErreur!==null){
            const baliseErreur = document.createElement("p");
            baliseErreur.textContent = phraseErreur;
            elementCible.insertAdjacentElement("afterend",baliseErreur);
            baliseErreur.style.color = "red";
        }
    }else{
        console.log("Je suis censé arrivé ici !" + elementCible.value);
        img.src = "/memory-game/assets/images/check.svg";
        img.alt = 'Validé';
        img.style.display = "block";
        elementCible.insertAdjacentElement("afterend",img);
    }
}

function validationMotDePasse(){
    const motDePasse = mdpUtilisateur.value;
    const longueurOk = motDePasse.length >= 6;
    const chiffreOk = /[0-9]/.test(motDePasse);
    const specialOk = /[!@#$%^&*(),.?":{}|<>]/.test(motDePasse);

    if(motDePasse.length >= 8){
        forces.style.display = "grid";
        forceFort.style.display = "block";
        forceMoyen.style.display = "block";
        forceFaible.style.display = "block";
    }else if(motDePasse.length > 4){
        forces.style.display = "grid";
        forceMoyen.style.display = "block";
        forceFaible.style.display = "block"
    }else{
        forces.style.display = "grid";
        forceFaible.style.display = "block";
    }

    return (longueurOk && chiffreOk && specialOk);
}

function sauvegardeDesDonnees(){
    if(nomOk && emailOk && mdpOk && mdpconfOk){
        const nomSauvegarde = localStorage.setItem("nom",nomUtilisateur.value);
        const emailSauvegarde = localStorage.setItem("email",emailUtilisateur.value);
        const mdpSauvegarde = localStorage.setItem("motdepasse",mdpUtilisateur.value);
        alert('Toutes les données ont été sauvegardé !');
        console.log(`Le nom est : ${nomSauvegarde}, l'email : ${emailSauvegarde} et le mot de passe est ${mdpSauvegarde}`);
    }
}