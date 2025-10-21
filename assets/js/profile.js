//récupérer le choix
const listOptionDuChoixMemory = document.getElementById("choixMemory").querySelectorAll('option');
const optionCheck = optionValide(listOptionDuChoixMemory);
const valueOptionCheck = optionCheck.getAttribute("value");
//récupérer les images
const img_choix_memory = document.querySelectorAll(".img_choix_memory");
const img_actif = document.querySelector(".img_actif");
//créer une map clé string/ valeur image
const mapOptionMemory = new Map();
for(let i=0 ; i<img_choix_memory.length ; i++){
    mapOptionMemory.set(listOptionDuChoixMemory[i].getAttribute("value"),img_choix_memory[i]);
}
//fonction qui récupère parmi une liste d'élément passé en paramètre, l'élément qui possède l'attribut check
function optionValide(array){
    let element=null;
    array.forEach((e) => {
        if(e.hasAttribute("check")){
            element = e;
        }
    });
    return element
}
//procédure qui prend en paramètre la valeur d'un input, une map dont les clés sont les valeurs des input et les valeurs sont les images correspondantes, un élément image actif et son nom de classe lorsqu'il est actif ainsi que celui lorsqu'il sera inactif. 
function afficheLeBonElement(valeurBtn, mapImg, elementActif, classeActive, classeInactive){
    elementActif.classList.toggle(classeActive);
    mapImg.get(valeurBtn).classList.toggle(classeInactive);
}
//Mes éléments de contrôles
console.log(mapOptionMemory);
afficheLeBonElement(valueOptionCheck,mapOptionMemory,img_actif,".img_actif",".img_inActif");
