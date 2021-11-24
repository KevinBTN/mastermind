"use strict"

/**Variables */
var tab1 = createArray(12, 8);
const couleurs = ["rgb(255, 255, 255)", "rgb(128, 0, 128)", "rgb(255, 255, 0)", "rgb(0, 128, 0)", "rgb(255, 0, 0)", "rgb(173, 216, 230)"];
var combGagnante = [];
var combJoueur = [];
const btnColor = document.querySelectorAll(".btn-color");
const btnAnnuler = document.getElementById("btnAnnuler");
const plateau = document.getElementById("plateau");
var last = document.querySelectorAll(".transparent");
var rang = 11;
var col = 4; 
var nbNoirs = 0;
var nbBlancs = 0;
/**Functions */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }
function generateComb(){
    for(let i = 0; i < 4; i++){
        combGagnante.push(couleurs[getRandomInt(0, 5)]);
    }
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
function displayArray(){
    for(let i = 0; i < tab1.length; i++){
        const test = document.getElementById("test");
        const row = document.createElement("div");
        const smallCol1 = document.createElement("div");
        const bigCol = document.createElement("div");
        const smallCol1row = document.createElement("div");
        const bigColrow = document.createElement("div");
        const smallCol1rowContain = document.createElement("div");
        const bigColrowContain = document.createElement("div");
        row.classList.add("row", "rang");
        smallCol1.classList.add("col-3");
        bigCol.classList.add("col-8");
        smallCol1row.classList.add("row", "border", "border-secondary", "text-center");
        bigColrow.classList.add("row", "text-center");
        smallCol1rowContain.classList.add("text-center", "mini", "mt-2");
        bigColrowContain.classList.add("mt-2");
        test.appendChild(row);
        row.appendChild(smallCol1);
        row.appendChild(bigCol);
        smallCol1.appendChild(smallCol1row);
        bigCol.appendChild(bigColrow);
        smallCol1row.appendChild(smallCol1rowContain);
        bigColrow.appendChild(bigColrowContain);

        for(let j = 0; j < tab1[i].length; j++){
            if(j < 4){
                const miniElem = document.createElement("div");
                miniElem.classList.add("rond", "rounded-circle", "d-inline-block", "m-2", "mini-transparent");
                miniElem.setAttribute("id", i + "-" + j);
                smallCol1rowContain.appendChild(miniElem);
            }
            else if(j > 3){
                const elem = document.createElement("div");
                elem.classList.add("m-1", "d-inline-block", "grandRond", "rounded-circle", "transparent");
                elem.setAttribute("id", i + "-" + j);
                bigColrowContain.appendChild(elem);
            }
        }
    }
}
function creationCombi(color){
    col++;
    combJoueur.push(color);
}

function validationCombi(color){
    combJoueur.push(color);
    comparaison();
    if(rang > 0){
        rang--;
        col = 4;
        combJoueur= [];
    }
    else if(nbNoirs < 4){
        perdu();
    }
    nbBlancs = 0;
    nbNoirs = 0;
}

function comparaison(){
    let combTest = [];
    for(let k = 0; k < combGagnante.length; k++){
        combTest.push(combGagnante[k]);
    }
    for(let i = 0; i < combJoueur.length; i++){
        if( combTest[i] == combJoueur[i]){
            nbNoirs++; 
            combTest[i] = "";
        }
        for(let j = 0; j < combJoueur.length; j++){
            if(combTest[i] == combJoueur[j]){
                nbBlancs++;
                combTest[i] = "";
            }
        }
    }
    for(let n = 0; n < nbNoirs; n++){
        document.getElementById(rang + "-" + n).style.backgroundColor = "black";
    }
    for(let b = nbNoirs; b < nbBlancs; b++){
        document.getElementById(rang + "-" + b).style.backgroundColor = "white";
    }
    if(nbNoirs == 4){
        victoir();
    }

}
function victoir(){
    var victoirMsg = document.createElement("h2");
    victoirMsg.setAttribute("class", "msgVictoir");
    var textVictoir = document.createTextNode("BRAVO! Vous avez trouvé la combinaison!");
    plateau.appendChild(victoirMsg);
    victoirMsg.appendChild(textVictoir);
}
function perdu(){
    var victoirMsg = document.createElement("h2");
    victoirMsg.setAttribute("class", "msgVictoir");
    var textVictoir = document.createTextNode("PERDU! La combinaison que vous cherchiez est: ");
    plateau.appendChild(victoirMsg);
    victoirMsg.appendChild(textVictoir);
    for(let i = 0; i < combGagnante.length; i++){
        var elemFin = document.createElement("div");
        elemFin.classList.add("m-1", "d-inline-block", "grandRond", "rounded-circle", "transparent");
        victoirMsg.appendChild(elemFin);
        elemFin.style.backgroundColor = combGagnante[i];
    }
    console.log("nbnoir = " + nbNoirs);
}
/**Executions */
/*Listener boutons, donne la couleur de BG du bouton au rond vide suivant */
for(let i = 0; i < btnColor.length; i++){
    btnColor[i].addEventListener("click", function(){
        var color = window.getComputedStyle(btnColor[i]).getPropertyValue("background-color");
        document.getElementById(rang + "-" + col).style.backgroundColor = color;
        if(col == 7){
            validationCombi(color);
        }
        else{
            creationCombi(color);
            
        }
        

    });
}
/*Listener boutons cancel*/
btnAnnuler.addEventListener("click", function(){
        var previousCol = col -1;
        document.getElementById(rang + "-" + previousCol).style.backgroundColor = "transparent";
        if(col > 4 && col < 8){
            col--;
            combJoueur.pop();
        }
        

})
generateComb();
document.body.onload = displayArray;