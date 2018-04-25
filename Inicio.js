var btnComecarJogo;
var divEcraInicial;
var backgroundImage;
var divHistoria;
var divZonaTexto;
var btnNext;
var divJogo;
var oBody;
var escolherNome;
var btnBatalha;
var nomeNinja;
var asset = 0;
var somInicial;

window.addEventListener("load", inicio, false);

function inicio() {

    btnComecarJogo = document.querySelector("#comecarJogo");

    gSoundManager.loadAsync("sounds/mainTheme.mp3", function (so) {
        somInicial= so;
        loadSom("sounds/mainTheme.mp3")
    });

    btnComecarJogo.addEventListener("click", historia, false);
}

function loadSom(){

    asset++;
    if (asset == 1) inicio();
    somInicial.play(true, 0.2);

}

function historia() {

    divEcraInicial = document.querySelector("#ecraInicial");
    backgroundImage = document.querySelector("#background-image");
    divHistoria = document.querySelector("#historia");
    divZonaTexto = document.querySelector("#zonaTexto");
    oBody = document.querySelector("body");
    btnNext = document.querySelector("#next");


    divEcraInicial.style.display = 'none';
    backgroundImage.style.display = 'none';
    divHistoria.style.display = 'block';
    oBody.style.backgroundImage = 'none';
    oBody.style.backgroundColor = 'black';
    escreve('No ano 1850, existia um reino intitulado Kingdom of Glory, este reino guardava um tesouro que possibilitava ao seu dono um poder imenso. ' +
    'Poder este que se caísse nas mãos erradas, poderia levar ao fim do mundo. Um dia, um grupo de monstros e bandidos liderados por Yric, tentou invadir ' +
    'o reino para roubar o tesouro, é ai que o nosso herói entra para salvar o seu reino e o destino do mundo...', divZonaTexto.getElementsByTagName('label')[0]);

    btnNext.addEventListener("click",escolherNomeNinja, false);

}

function escolherNomeNinja() {
    escolherNome = document.querySelector("#escolherNome");
    btnBatalha = document.querySelector("#batalha");

    divEcraInicial.style.display = 'none';
    backgroundImage.style.display = 'none';
    divHistoria.style.display = 'none';
    escolherNome.style.display = 'block';
    oBody.style.backgroundImage = "url('assets/backHistoria.jpg')";
    oBody.style.backgroundRepeat = "no-repeat";
    oBody.style.backgroundSize = "cover";

    btnBatalha.addEventListener("click", jogo, false);

}

function jogo() {
   // escolherNome = document.querySelector("#escolherNome");
    divJogo = document.querySelector("#divJogo");
    nomeNinja = document.querySelector("#nomeEscolhido");

    escolherNome.style.display = 'none';
    divJogo.style.display = 'block';
    oBody.style.backgroundImage = "url('assets/backgroundBody3.jpg')";
    init();

}

function escreve(texto, sitio){
    var ndx=0;

    putText();
    function putText(){
        sitio.innerHTML=texto.substr(0,ndx);
        ndx++;
        if(ndx<=texto.length) setTimeout(putText,100);
    }
}