var canvas;// representação genérica dos canvas
var canvases = {
    background: {canvas: null, ctx: null}, // canvas, drawingSurface (contex2d)
    entities: {canvas: null, ctx: null}
};
var drawingSurface;
var entities = [];
var teclas = new Array(255);
var gameWorld = undefined;
var camera = undefined;
var umNinja = undefined;
var background = undefined;
var assetsLoaded = 0;
var umWarrior = undefined;
var umSelvagem = undefined;
var umViking = undefined;
var oBossYric = undefined;
var loadInfo = undefined;
var assetsLoadInfo = undefined;
var animationHandler;
var oBody;
var divJogo;
var canvasHPNinja;
var canvasHPInimigo;
var canvasXPbar;
var canvasHPbar;
var drawHPninja;
var drawHPinimigo;
var drawXPbar;
var drawHPbar;
var btnAtaque1Ninja;
var btnAtaque2Ninja;
var btnAtaque1Inimigo;
var btnNivelInimigo;
var divEcraInicial;
var btnStartGame;
var fightScreen;
var debugMode = false;
var divNameStats;
var divExpStats;
var divAtaquesStats;
var divLabelsAtaques;
var divPoderAtaques;
var labelNivel;
var labelNameStats;
var labelAtaque1;
var labelAtaque2;
var labelPoderAtaque1;
var labelPoderAtaque2;
var quebraLinha;
var divStats;
var XPbar;
var imgDead;
var divZonaInimigo;
var imagemFinal;
var imagemFinal2;
var nivelAtual = 1;
var btnTryAgain;



//window.addEventListener("load", init, false);

healthBar = {
    healthNinja: 100,
    healthWarrior: 100,
    healthViking: 100,
    healthSelvagem:100,
    healthBossYric:120

};

var exp = 0;
fight = {
    vitoria: false
};

entityFight = {
    silverWarrior: false,
    viking: false,
    selvagem: false,
    bossYric: false
};

var GameSounds = {
    ATAQUES: {},
    MORTE: {},
    AMBIENTE: {}
};

var levelupSound;
var tryAgainSound;

var GameStates = {
    RUNNING: 1,
    PAUSED: 2,
    STOPED: 3,
    LOADING: 4,
    LOADED: 5,
    FIGHTING:6
};
var gameState = undefined;


function init() {


    //Loads Ecra inicial
    divEcraInicial = document.querySelector("#ecraInicial");
    btnStartGame = document.querySelector("#comecarJogo");
    oBody = document.querySelector("body");

    //Load ficheiros html para o jogo
    divJogo = document.querySelector("#divJogo");

    canvas = document.querySelector("#jogo");
    drawingSurface = canvas.getContext("2d");

    canvasHPNinja = document.querySelector("#healthbarNinja");
    drawHPninja = canvasHPNinja.getContext("2d");

    canvasXPbar = document.querySelector("#xpBar");
    drawXPbar = canvasXPbar.getContext("2d");

    canvasHPbar = document.querySelector("#hpBar");
    drawHPbar = canvasHPbar.getContext("2d");

    canvasHPInimigo = document.querySelector("#healthbarInimigo");
    drawHPinimigo = canvasHPInimigo.getContext("2d");

    fightScreen = document.querySelector("#FightScreen");
    divZonaInimigo = document.querySelector("#zonaInimigo");
    divStats = document.querySelector("#stats");
    divNameStats = document.querySelector("#nameStats");
    divExpStats = document.querySelector("#expStats");
    divAtaquesStats = document.querySelector("#ataquesStats");
    divLabelsAtaques = document.querySelector("#labelsAtaques");
    divPoderAtaques = document.querySelector("#poderAtaques");
    quebraLinha = document.createElement("br");

    //botoes Ataque
    btnAtaque1Ninja = document.querySelector("#btnAtaque1Heroi");
    btnAtaque2Ninja = document.querySelector("#btnAtaque2Heroi");
    btnAtaque1Inimigo = document.querySelector("#btnAtaque1Inimigo");
    btnNivelInimigo = document.querySelector("#btnNivelInimigo");
    btnAtaque1Ninja.addEventListener("click", ataque1, false);
    btnAtaque2Ninja.addEventListener("click", ataque2, false);

    //Limpar o log de combate
    document.querySelector("#FightLog").value = "";

    //Loading
    loadInfo = document.querySelector("#loadInfo");
    assetsLoadInfo = document.querySelector("#assetLoaded");
    gameState = GameStates.LOADING;

    // 1 -  criar o gameWorld
    gameWorld = new GameWorld(0, 0, canvas.width, canvas.height);
    // 2 - criar e configurar a c�mara
    camera = new Camera(0, gameWorld.height / 2, gameWorld.width, gameWorld.height / 2);
    // 3 - carregar a spriteSheet do ninja
    var sp = new SpriteSheet();
    sp.load("assets//ninja.png", "assets//ninja.json", loaded);
    // 4 - carregar a spriteSheet do background
    var spBackground = new SpriteSheet();
    spBackground.load("assets//background.png", "assets//background.json", loaded);
    // 5 - carregar inimigo
    var spWarrior = new SpriteSheet();
    spWarrior.load("assets//silverwarrior.png", "assets//silverwarrior.json", loaded);
    var spSelvagem = new SpriteSheet();
    spSelvagem.load("assets//selvagem.png", "assets//selvagem.json", loaded);
    var spViking = new SpriteSheet();
    spViking.load("assets//viking.png", "assets//viking.json", loaded);
    var spBossYric = new SpriteSheet();
    spBossYric.load("assets//bossYric.png", "assets//bossYric.json", loaded);

    //load Sounds
    gSoundManager.loadAsync("sounds/deathSound.mp3", function (so) {
        GameSounds.MORTE.NINJA = so;
        loaded("sounds/deathSound.mp3");
    });
    gSoundManager.loadAsync("sounds/fightTheme.mp3", function (so) {
        GameSounds.AMBIENTE.LUTAR = so;
        loaded("sounds/fightTheme.mp3")
    });
    gSoundManager.loadAsync("sounds/ingameTheme.mp3", function (so) {
        GameSounds.AMBIENTE.JOGO = so;
        loaded("sounds/ingameTheme.mp3");
    });

    gSoundManager.loadAsync("sounds/bossFight.mp3", function (so) {
        GameSounds.AMBIENTE.BOSS = so;
        loaded("sounds/bossFight.mp3");
    });

    gSoundManager.loadAsync("sounds/endGame.mp3", function (so) {
        GameSounds.AMBIENTE.FINAL = so;
        loaded("sounds/endGame.mp3");
    });

    gSoundManager.loadAsync("sounds/ataque1.mp3", function (so) {
        GameSounds.ATAQUES.ATAQUE1 = so;
        loaded("sounds/ataque1.mp3");
    });

    gSoundManager.loadAsync("sounds/ataque2.mp3", function (so) {
        GameSounds.ATAQUES.ATAQUE2 = so;
        loaded("sounds/ataque2.mp3");
    });

    gSoundManager.loadAsync("sounds/ataqueWarrior.mp3", function (so) {
        GameSounds.ATAQUES.WARRIOR = so;
        loaded("sounds/ataqueWarrior.mp3");
    });

    gSoundManager.loadAsync("sounds/ataqueViking.mp3", function (so) {
        GameSounds.ATAQUES.VIKING = so;
        loaded("sounds/ataqueViking.mp3");
    });

    gSoundManager.loadAsync("sounds/ataqueSelvagem.mp3", function (so) {
        GameSounds.ATAQUES.SELVAGEM = so;
        loaded("sounds/ataqueSelvagem.mp3");
    });

    gSoundManager.loadAsync("sounds/bossAtack.mp3", function (so) {
        GameSounds.ATAQUES.BOSS = so;
        loaded("sounds/bossAtack.mp3");
    });

    gSoundManager.loadAsync("sounds/LevelUp.mp3", function (so) {
        levelupSound = so;
        loaded("sounds/LevelUp.mp3");
    });

    gSoundManager.loadAsync("sounds/tryagain.mp3", function (so) {
        tryAgainSound = so;
        loaded("sounds/tryagain.mp3");
    });
}

function loaded(assetName) {

    assetsLoaded++;
    assetsLoadInfo.innerHTML = " Loading: " + assetName;
    console.log(assetName);
    if (assetsLoaded < 19) return;
    assetsLoadInfo.innerHTML = "Game Loaded";

    loadInfo.classList.toggle("hidden");// esconder a informa��o de loading

    divJogo.style.display = "block";

    gameState = GameStates.LOADED;

    //  criar a entidade ninja
    umNinja = new Ninja(gSpriteSheets['assets//ninja.png'], canvas.width / 4, canvas.height / 2.9);
    umNinja.x = gameWorld.width / 3.7 - umNinja.width / 2;
    umNinja.nivel = 1;
    umNinja.nome = nomeNinja.value;
    nome = umNinja.nome;

    //  criar a entidade background
    background = new Background(gSpriteSheets['assets//background.png'], -6000, 0);

    //  criar os inimigos
    umWarrior = new SilverWarrior(gSpriteSheets['assets//silverwarrior.png'], canvas.width / 1.8, canvas.height / 2.7, 3);
    umWarrior.nome = "Silver Warrrior";

    umSelvagem = new Selvagem(gSpriteSheets['assets//selvagem.png'], canvas.width / 0.8, canvas.height / 2.7, 7);
    umSelvagem.nome = "Selvagem";

    umViking = new Viking(gSpriteSheets['assets//viking.png'], canvas.width / 1.1, canvas.height / 2.7, 5);
    umViking.nome = "Viking";

    // criar o boss
    oBossYric = new BossYric(gSpriteSheets['assets//bossYric.png'], canvas.width / 0.6, canvas.height/3.6, 10);
    oBossYric.nome = "Yric, Overlord of Existence";

    // 4 - configurar o background
    background.x = Math.floor(background.width / 5) * -2;
    // 5 colocar as entidades no array de entidades
    entities.push(background);
    entities.push(umNinja);
    entities.push(umWarrior);
    entities.push(umSelvagem);
    entities.push(umViking);
    entities.push(oBossYric);

    //Update the sprite as soon as the image has been loaded
    update();

    //Criar dinamicamente as Labels do Nome e do nivel no painel stats

    labelNameStats = document.createElement("label");
    labelNameStats.appendChild(document.createTextNode(umNinja.nome));
    labelNameStats.setAttribute("id", "nome");
    divNameStats.appendChild(labelNameStats);

    labelNivel = document.createElement("label");
    labelNivel.appendChild(document.createTextNode(umNinja.nivel));
    labelNivel.setAttribute("id", "nivel");
    divExpStats.appendChild(labelNivel);

    labelAtaque1 = document.createElement("label");
    labelAtaque1.appendChild(document.createTextNode("Ataque 1:"));
    labelAtaque1.setAttribute("id", "ataque1");
    divLabelsAtaques.appendChild(labelAtaque1);

    labelAtaque2 = document.createElement("label");
    labelAtaque2.appendChild(document.createTextNode("Ataque 2:"));
    labelAtaque2.setAttribute("id", "ataque2");
    divLabelsAtaques.appendChild(labelAtaque2);

    labelPoderAtaque1 = document.createElement("label");
    labelPoderAtaque1.appendChild(document.createTextNode(umNinja.ataque1 + " Dano"));
    labelPoderAtaque1.setAttribute("id", "ataque1");
    divPoderAtaques.appendChild(labelPoderAtaque1);

    labelPoderAtaque2 = document.createElement("label");
    labelPoderAtaque2.appendChild(document.createTextNode(umNinja.ataque2 + " Dano"));
    labelPoderAtaque2.setAttribute("id", "ataque2");
    divPoderAtaques.appendChild(labelPoderAtaque2);

    //Carregar a imagem da barra de experiencia
    XPbar = new Image();
    XPbar.src = 'assets/XpBar.png';
    XPbar.style = "width: 230px; position: absolute; top:70px; float:left; left:0px; z-index:4";
    divExpStats.appendChild(XPbar);


    // Escrever os nomes das entidades nos portraits
    document.getElementById("nomePortraitNinja").innerHTML = umNinja.nome;
    //document.getElementById("nomePortraitInimigo").innerHTML = umWarrior.nome;

    drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
    drawExperienceBar(drawXPbar, 0, 0, 180, 50, 0, 100);

    gSoundManager.stopAll();
    GameSounds.AMBIENTE.JOGO.play(true, 0.2);

    swal("BEM VINDO AO KINGDOM OF GLORY" + "\n"+ "O objectivo do jogo é derrotar os inimigos até conseguir defrontar e derrotar o boss no final!" +"\n"+
    "Controlos do jogo:" +"\n" +
    "SETA DIREITA: ANDAR PARA A FRENTE"+"\n" +
    "SETA ESQUERDA: ANDAR PARA TRÁS");

    gameState = GameStates.RUNNING;
    window.addEventListener("keydown", keyDownHandler, false);
    window.addEventListener("keyup", keyUpHandler, false);
}


function keyDownHandler(e) {

    if(gameState == GameStates.FIGHTING){
        return false;
    }

    var codTecla = e.keyCode;
    teclas[codTecla] = true;

}

function keyUpHandler(e) {
    var codTecla = e.keyCode;
    teclas[codTecla] = false;

    switch (codTecla) {
        case  keyboard.KPAD_PLUS  :
            umNinja.vx = umNinja.vy += 3;
            break;
        case  keyboard.KPAD_MINUS :
            umNinja.vx = umNinja.vy -= 3;
            break;
    }
    umNinja.parar();
    background.parar();
}


function update() {
    //Create the animation loop


    if (teclas[keyboard.LEFT]) {
        umNinja.recuar();
        umNinja.x -= umNinja.vx + 2;
        umNinja.dir = -1;
    }
    if (teclas[keyboard.RIGHT]) {
        umNinja.andar();
        umNinja.x += umNinja.vx + 2;
        umNinja.dir = 1;
    }

    //andar automatico warrior
    if (umWarrior.parado != true) {
        if (umWarrior.estaAndar == 1) {
            umWarrior.recuar();
            umWarrior.vx = 1;
        } else if (umWarrior.estaAndar < 1) {
            umWarrior.andar();
            umWarrior.vx = -1;
        }
    }

    //andar automatico viking
    if (umViking.parado != true) {
        if (umViking.estaAndar == 1) {
            umViking.recuar();
            umViking.vx = 1;
        } else if (umViking.estaAndar < 1) {
            umViking.andar();
            umViking.vx = -1;
        }
    }

    //andar automatico selvagem
    if (umSelvagem.parado != true) {
        if (umSelvagem.estaAndar == 1) {
            umSelvagem.recuar();
            umSelvagem.vx = 1;
        } else if (umSelvagem.estaAndar < 1) {
            umSelvagem.andar();
            umSelvagem.vx = -1;
        }
    }

    for (var i = 0; i < entities.length; i++) {
        entities[i].update();
    }

    // 1 - calcular 1/3 do tamanho do background
    var bk3 = Math.floor(background.width / 3);
    // 2 -  reposicionar o background consoante a sua posi��o atual e a sua dire��o
    if (umNinja.dir == -1) {
        if (background.x >= 0)
            background.x = bk3 * -2;

    } else if (umNinja.dir == 1) {
        if (background.x <= bk3 * -2)
            background.x = 0;
    }


    if (umNinja.x < camera.leftInnerBoundary()) {
        umNinja.x = camera.leftInnerBoundary();
        background.vx = 0;
    }

    if (umNinja.x + umNinja.width > camera.rightInnerBoundary()) {
        umNinja.x = camera.rightInnerBoundary() - umNinja.width;
        background.vx = umNinja.vx / 2 * -1;
        umWarrior.x -= umNinja.vx - 1;
        umSelvagem.x -= umNinja.vx - 1;
        umViking.x -= umNinja.vx - 1;
        oBossYric.x -= umNinja.vx - 1;
    }

    requestAnimationFrame(update, canvas);
    checkColisions();// Verificar se há colisões
    clearArrays();
    render();

}

function render() {
    //Clear the previous animation frame

    drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < entities.length; i++) {

        var entity = entities[i];
        var sprite = entities[i].getSprite();
        entity.render(drawingSurface);

        if (debugMode) entity.drawColisionBoundaries(drawingSurface, true, false, "blue", "red");
    }
    if (debugMode)camera.drawFrame(drawingSurface, true);

    cancelAnimationFrame(animationHandler);
}

function drawHealthbar(canvas, x, y, width, height, health, max_health) {
    if (health >= max_health) {
        health = max_health;
    }
    if (health <= 0) {
        health = 0;
    }
    canvas.fillStyle = '#000000';
    canvas.fillRect(x, y, width, height);
    var colorNumber = Math.round((1 - (health / max_health)) * 0xff) * 0x10000 + Math.round((health / max_health) * 0xff) * 0x100;
    var colorString = colorNumber.toString(16);
    if (colorNumber >= 0x100000) {
        canvas.fillStyle = '#' + colorString;
    } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
        canvas.fillStyle = '#0' + colorString;
    } else if (colorNumber << 0x10000) {
        canvas.fillStyle = '#00' + colorString;
    }
    canvas.fillRect(x + 1, y + 1, (health / max_health) * (width - 2), height - 2);
    return healthBar.health = health;
}

function drawExperienceBar(canvas, x, y, width, height, experience, max_experience) {

    if (experience >= max_experience) {
        experience = max_experience;
    }
    if (experience <= 0) {
        experience = 0;
    }
    canvas.fillStyle = '#000000';
    canvas.fillRect(x, y, width, height);
    var colorNumber = Math.round((1 - (experience / max_experience)) * 0xff) * 0x10000 + Math.round((experience / max_experience) * 0xff) * 0x100;
    var colorString = colorNumber.toString(17);
    if (colorNumber >= 0x100000) {
        canvas.fillStyle = '#' + colorString;
    } else if (colorNumber << 0x100000 && colorNumber >= 0x10000) {
        canvas.fillStyle = '#0' + colorString;
    } else if (colorNumber << 0x10000) {
        canvas.fillStyle = '#00' + colorString;
    }
    canvas.fillRect(x + 1, y + 1, (experience / max_experience) * (width - 2), height - 2);

}

// faz os testes de verificação de colisões
function checkColisions() {
    console.log("war:" + entityFight.silverWarrior);
    if (umWarrior.hitTestRectangle(umNinja) && !umWarrior.isColliding) {
        entityFight.silverWarrior = true;
        umNinja.isColliding = true;
        poderesAtaque(umWarrior.ataque1,umWarrior.ataque2,umWarrior.nivel);
        fightScreen.style.display = "block";
        novaLuta();
        divZonaInimigo.style.backgroundImage = "url('assets/Portraits/silverWarrior.png')";
        document.getElementById("nomePortraitInimigo").innerHTML = umWarrior.nome;
        umWarrior.parar();
        gSoundManager.stopAll();
        GameSounds.AMBIENTE.LUTAR.play(true, 0.1);
        swal("Para derrotar os inimigos:" +"\n" +
             "Basta clicar no ataque que desejar e o ninja ataca, após o ataque o inimigo ataca de volta, e so depois disso, poderá atacar de volta");

    }
    if (umNinja.right() < 0) umNinja.x = canvas.width + 200;
    if (umWarrior.right() < 0) umWarrior.x = canvas.width + 200;

    // ninja colide com warrior
    umNinja.blockRectangle(umWarrior);


    if (umViking.hitTestRectangle(umNinja) && !umViking.isColliding) {
        entityFight.viking = true;
        umNinja.isColliding = true;
        poderesAtaque(umViking.ataque1,umViking.ataque2,umViking.nivel);
        fightScreen.style.display = "block";
        novaLuta();
        divZonaInimigo.style.backgroundImage = "url('assets/Portraits/viking.png')";
        document.getElementById("nomePortraitInimigo").innerHTML = umViking.nome;
        umViking.parar();
        gSoundManager.stopAll();
        GameSounds.AMBIENTE.LUTAR.play(true, 0.1);
    }
    if (umNinja.right() < 0) umNinja.x = canvas.width + 200;
    if (umViking.right() < 0) umViking.x = canvas.width + 200;

    // ninja colide com viking
    umNinja.blockRectangle(umViking);

    if (umSelvagem.hitTestRectangle(umNinja) && !umSelvagem.isColliding) {
        entityFight.selvagem = true;
        umNinja.isColliding = true;
        poderesAtaque(umSelvagem.ataque1,umSelvagem.ataque2,umSelvagem.nivel);
        fightScreen.style.display = "block";
        novaLuta();
        divZonaInimigo.style.backgroundImage = "url('assets/Portraits/selvagem.png')";
        document.getElementById("nomePortraitInimigo").innerHTML = umSelvagem.nome;
        umSelvagem.parar();
        gSoundManager.stopAll();
        GameSounds.AMBIENTE.LUTAR.play(true, 0.1);
    }
    if (umNinja.right() < 0) umNinja.x = canvas.width + 200;
    if (umSelvagem.right() < 0) umSelvagem.x = canvas.width + 200;

    // ninja colide com selvagem
    umNinja.blockRectangle(umSelvagem);

    if (oBossYric.hitTestRectangle(umNinja) && !oBossYric.isColliding) {
        entityFight.bossYric = true;
        umNinja.isColliding = true;
        poderesAtaque(oBossYric.ataque1,oBossYric.ataque2,oBossYric.nivel);
        fightScreen.style.display = "block";
        novaLuta();
        divZonaInimigo.style.backgroundImage = "url('assets/Portraits/bossYric.png')";
        document.getElementById("nomePortraitInimigo").innerHTML = oBossYric.nome;
        oBossYric.parar();
        gSoundManager.stopAll();
        GameSounds.AMBIENTE.BOSS.play(true, 0.1);
    }
    if (umNinja.right() < 0) umNinja.x = canvas.width + 200;
    if (oBossYric.right() < 0) oBossYric.x = canvas.width + 200;

    // ninja colide com boss Yric
    umNinja.blockRectangle(oBossYric);

}

function clearArrays() {
    entities = entities.filter(filterByActiveProp);
}


function filterByActiveProp(obj) {
    if (obj.active == true) return obj;
}

/*Funções para a luta*/
function fightNinja(poderAtaque) {

    if (entityFight.silverWarrior === true) {
        if(healthBar.healthWarrior > 0) {
            healthBar.healthWarrior += -poderAtaque;
            return healthBar.healthWarrior;
        }
    }

    if (entityFight.viking === true) {
        if(healthBar.healthViking > 0) {
            healthBar.healthViking += -poderAtaque;
            return healthBar.healthViking;
        }
    }

    if (entityFight.selvagem === true) {
        if(healthBar.healthSelvagem > 0) {
            healthBar.healthSelvagem += -poderAtaque;
            return healthBar.healthSelvagem;
        }
    }

    if (entityFight.bossYric === true) {
        if(healthBar.healthBossYric > 0) {
            healthBar.healthBossYric += -poderAtaque;
            return healthBar.healthBossYric;
        }
    }
}

function fightEnemy(poderAtaque) {
    if (healthBar.healthNinja <= 0) {
    } else {
        healthBar.healthNinja += -poderAtaque;
        return healthBar.healthNinja;
    }
}

function ataque1() {
    btnAtaque1Ninja.disabled = true;
    btnAtaque2Ninja.disabled = true;
    document.querySelector("#FightLog").style = "display:block";
    GameSounds.ATAQUES.ATAQUE1.play(false, 0.2);
    drawHealthbar(drawHPinimigo, 0, 0, 300, 50, fightNinja(umNinja.ataque1), 100);
    document.querySelector("#FightLog").value += "Ninja: Ataque 1 -" + umNinja.ataque1 + " de Dano!  ";

    if (entityFight.silverWarrior === true) {
        if (healthBar.healthWarrior <= 0) {
            entityFight.silverWarrior = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "Recuperou 30 de vida" + "\n" + "Experiencia: +" + umWarrior.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 30;
            umNinja.exp += umWarrior.exp;
            levelUp(umNinja.exp);
            umWarrior.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            gameState = GameStates.RUNNING;
        }
        if (healthBar.healthWarrior > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }

    if (entityFight.viking === true) {
        if (healthBar.healthViking <= 0) {
            entityFight.viking = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "Recuperou 40 de vida" + "\n" + "Experiencia: +" + umViking.exp );
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 40;
            umNinja.exp += umViking.exp;
            levelUp(umNinja.exp);
            umViking.morrer();
            umViking.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            gameState = GameStates.RUNNING;
        }
        if (healthBar.healthViking > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }

    if (entityFight.selvagem === true) {
        if (healthBar.healthSelvagem <= 0) {
            entityFight.selvagem = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "Recuperou 50 de vida" + "\n" + "Experiencia: +" + umSelvagem.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 50;
            umNinja.exp += umSelvagem.exp;
            levelUp(umNinja.exp);
            umSelvagem.morrer();
            umSelvagem.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            gameState = GameStates.RUNNING;
        }
        if (healthBar.healthSelvagem > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }

    if (entityFight.bossYric === true) {
        if (healthBar.healthBossYric <= 0) {
            entityFight.bossYric = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "Recuperou 100 de vida"+ "\n" + "Experiencia: +" + oBossYric.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 70;
            umNinja.exp += oBossYric.exp;
            levelUp(umNinja.exp);
            oBossYric.morrer();
            oBossYric.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            setTimeout(endGame,1000);
        }
        if (healthBar.healthBossYric > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }
}

function ataque2() {
    btnAtaque1Ninja.disabled = true;
    btnAtaque2Ninja.disabled = true;
    document.querySelector("#FightLog").style = "display:block";
    GameSounds.ATAQUES.ATAQUE2.play(false, 0.2);
    drawHealthbar(drawHPinimigo, 0, 0, 300, 50, fightNinja(umNinja.ataque2), 100);
    document.querySelector("#FightLog").value += "Ninja: Ataque 2 -" + umNinja.ataque2 + " de Dano!  ";
    if (entityFight.silverWarrior === true) {
    if(healthBar.healthWarrior <=0){
        entityFight.silverWarrior =  false;
        fightScreen.style.display = "none";
        swal("Vitoria!" + "\n" + "recuperou 30 de vida"+ "\n" + "Experiencia: +" + umWarrior.exp);
        gSoundManager.stopAll();
        GameSounds.AMBIENTE.JOGO.play(true, 0.2);
        console.log(healthBar.healthNinja);
        if (healthBar.healthNinja != 100)healthBar.healthNinja += 30;
        umNinja.exp += umWarrior.exp;
        levelUp(umNinja.exp);
        umWarrior.killed = true;
        drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
        gameState = GameStates.RUNNING;
    }
    if (healthBar.healthWarrior > 0) {
        setTimeout(ataqueInimigo, 1200);
    }
    }

    if (entityFight.viking === true) {
        if (healthBar.healthViking <= 0) {
            entityFight.viking = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" +" Recuperou 40 de vida"+ "\n" + "Experiencia: +" + umViking.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 40;
            umNinja.exp += umViking.exp;
            levelUp(umNinja.exp);
            umViking.morrer();
            umViking.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            gameState = GameStates.RUNNING;
        }
        if (healthBar.healthViking > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }

    if (entityFight.selvagem === true) {
        if (healthBar.healthSelvagem <= 0) {
            entityFight.selvagem = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "recuperou 50 de vida"+ "\n" + "Experiencia: +" + umSelvagem.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 50;
            umNinja.exp += umSelvagem.exp;
            levelUp(umNinja.exp);
            umSelvagem.morrer();
            umSelvagem.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            gameState = GameStates.RUNNING;
        }
        if (healthBar.healthSelvagem > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }


    if (entityFight.bossYric === true) {
        if (healthBar.healthBossYric <= 0) {
            entityFight.bossYric = false;
            fightScreen.style.display = "none";
            swal("Vitoria!" + "\n" + "recuperou 100 de vida"+ "\n" + "Experiencia: +" + oBossYric.exp);
            gSoundManager.stopAll();
            GameSounds.AMBIENTE.JOGO.play(true, 0.2);
            console.log(healthBar.healthNinja);
            if (healthBar.healthNinja != 100)healthBar.healthNinja += 70;
            umNinja.exp += oBossYric.exp;
            levelUp(umNinja.exp);
            oBossYric.morrer();
            oBossYric.killed = true;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            setTimeout(endGame,2000);
        }
        if (healthBar.healthBossYric > 0) {
            setTimeout(ataqueInimigo, 1200);

        }
    }
}

function ataqueInimigo() {
    //gere o poder do ataque aleatoriamente entre os dois valores dos ataques

    if (entityFight.silverWarrior === true) {
        if (healthBar.healthNinja > 0) {
            var ataque = Math.floor(Math.random() * ((umWarrior.ataque2 - umWarrior.ataque1) + 1) + umWarrior.ataque1);
            GameSounds.ATAQUES.WARRIOR.play(false, 0.2);
            drawHealthbar(drawHPninja, 0, 0, 300, 50, fightEnemy(ataque), 100);
            document.querySelector("#FightLog").value += "Inimigo: Ataque1 -" + ataque + " de Dano!  " +
            "-------------------------------  ";
            btnAtaque1Ninja.disabled = false;
            btnAtaque2Ninja.disabled = false;
        }
        if (healthBar.healthNinja <= 0) {
            fightScreen.style.display = "none";
            umNinja.morrer();
            umNinja.killed = true;
            umNinja.x = umNinja.x - 50;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            stopGame();
        }

    }

    if(entityFight.viking === true){
        if (healthBar.healthNinja > 0) {
            var ataque = Math.floor(Math.random() * ((umViking.ataque2 - umViking.ataque1) + 1) + umViking.ataque1);
            GameSounds.ATAQUES.VIKING.play(false, 0.2);
            drawHealthbar(drawHPninja, 0, 0, 300, 50, fightEnemy(ataque), 100);
            document.querySelector("#FightLog").value += "Inimigo: Ataque1 -" + ataque + " de Dano!  " +
            "-------------------------------  ";
            btnAtaque1Ninja.disabled = false;
            btnAtaque2Ninja.disabled = false;
        } if(healthBar.healthNinja <= 0){
            fightScreen.style.display = "none";
            umNinja.morrer();
            umNinja.killed = true;
            umNinja.x = umNinja.x - 50;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            stopGame();
        }
    }

    if(entityFight.selvagem === true){
        if (healthBar.healthNinja > 0) {
            var ataque = Math.floor(Math.random() * ((umSelvagem.ataque2 - umSelvagem.ataque1) + 1) + umSelvagem.ataque1);
            GameSounds.ATAQUES.SELVAGEM.play(false, 0.2);
            drawHealthbar(drawHPninja, 0, 0, 300, 50, fightEnemy(ataque), 100);
            document.querySelector("#FightLog").value += "Inimigo: Ataque1 -" + ataque + " de Dano!  " +
            "-------------------------------  ";
            btnAtaque1Ninja.disabled = false;
            btnAtaque2Ninja.disabled = false;
        } if(healthBar.healthNinja <= 0){
            fightScreen.style.display = "none";
            umNinja.morrer();
            umNinja.killed = true;
            umNinja.x = umNinja.x - 50;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            stopGame();
        }
    }

    if(entityFight.bossYric === true){
        if (healthBar.healthNinja > 0) {
            var ataque = Math.floor(Math.random() * ((oBossYric.ataque2 - oBossYric.ataque1) + 1) + oBossYric.ataque1);
            GameSounds.ATAQUES.BOSS.play(false, 0.2);
            drawHealthbar(drawHPninja, 0, 0, 300, 50, fightEnemy(ataque), 100);
            document.querySelector("#FightLog").value += "Inimigo: Ataque1 -" + ataque + " de Dano!  " +
            "-------------------------------  ";
            btnAtaque1Ninja.disabled = false;
            btnAtaque2Ninja.disabled = false;
        } if(healthBar.healthNinja <= 0){
            fightScreen.style.display = "none";
            umNinja.morrer();
            umNinja.killed = true;
            umNinja.x = umNinja.x - 50;
            drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
            stopGame();
        }
    }
}


function updateLevel() {
    levelupSound.play(false,0.3);
    umNinja.nivel++;
    nivelAtual = umNinja.nivel;
    umNinja.ataque1 = umNinja.ataque1 + 10;
    umNinja.ataque2 = umNinja.ataque2 + 5;
    healthBar.healthNinja += 50;
    drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
    umNinja.exp =0;
    swal("Level UP!" + "\n" + " Level: " + umNinja.nivel + "\n" + "Life:" +  healthBar.healthNinja + "\n" +
    "Ataque 1: +10"+ "\n" + "Ataque 2: +5" );


    divExpStats.removeChild(labelNivel);
    divPoderAtaques.removeChild(labelPoderAtaque1);
    divPoderAtaques.removeChild(labelPoderAtaque2);

    labelNivel = document.createElement("label");
    labelNivel.appendChild(document.createTextNode(nivelAtual));
    labelNivel.setAttribute("id", "nivel");
    divExpStats.appendChild(labelNivel);

    labelPoderAtaque1 = document.createElement("label");
    labelPoderAtaque1.appendChild(document.createTextNode(umNinja.ataque1 + " Dano"));
    labelPoderAtaque1.setAttribute("id", "ataque1");
    divPoderAtaques.appendChild(labelPoderAtaque1);

    labelPoderAtaque2 = document.createElement("label");
    labelPoderAtaque2.appendChild(document.createTextNode(umNinja.ataque2 + " Dano"));
    labelPoderAtaque2.setAttribute("id", "ataque2");
    divPoderAtaques.appendChild(labelPoderAtaque2);
}

function levelUp(experiencia) {
    console.log(umNinja.exp);
    if (experiencia >= 100) {
        drawExperienceBar(drawXPbar, 0, 0, 300, 50, experiencia, 100);
        updateLevel();
        drawExperienceBar(drawXPbar, 0, 0, 300, 50, 0, 100);
    } else {
        drawExperienceBar(drawXPbar, 0, 0, 300, 50, experiencia, 100);
    }

    /*Fim das funçoes de luta*/
}
function stopGame() {
    cancelAnimationFrame(animationHandler);
    gameState = GameStates.STOPED;
    gSoundManager.stopAll(); //p�ram-se todos os  sons
    GameSounds.MORTE.NINJA.play(false, 0.2);
    imgDead = document.querySelector("#imgDead");
    imgDead.style.display = "block";

    btnTryAgain = document.createElement("input");
    btnTryAgain.setAttribute("value", "Try Again");
    btnTryAgain.setAttribute("id", "btnRestart");
    divJogo.appendChild(btnTryAgain);
    btnTryAgain.setAttribute("type", "submit");
    btnTryAgain.onclick = function () {
        respawn();
    };
}

function novaLuta(){
    gameState = GameStates.FIGHTING;
    document.querySelector("#FightLog").value = "";
    console.log(healthBar.healthNinja);
    btnAtaque1Ninja.disabled = false;
    btnAtaque2Ninja.disabled = false;
    drawHealthbar(drawHPninja, 0, 0, 300, 50, healthBar.healthNinja, 100);
    drawHealthbar(drawHPinimigo, 0, 0, 300, 50, 100, 100);
}


function endGame(){

    imagemFinal = document.querySelector("#imgEndGame2");
    imagemFinal.style.display = "block";
    imagemFinal2 = document.querySelector("#imgEndGame1");
    imagemFinal2.style.display = "block";
    gSoundManager.stopAll();
    GameSounds.AMBIENTE.FINAL.play(true, 0.2);
    var btnRestart = document.createElement("input");
    btnRestart.setAttribute("value", "Close");
    btnRestart.setAttribute("id", "btnClose");
    divJogo.appendChild(btnRestart);
    btnRestart.setAttribute("type", "submit");
    btnRestart.onclick = function () {
        location.href = "kog.html";
    };
}


function poderesAtaque(ataque1,ataque2, nivel){
    btnAtaque1Ninja.value = "Ataque 1-  " + umNinja.ataque1 + " Dano";
    btnAtaque2Ninja.value = "Ataque 2-  " + umNinja.ataque2 + " Dano";
    btnNivelInimigo.value = "Nivel- " + nivel;
    btnAtaque1Inimigo.value = "Poder Ataque: " + ataque1 + " - " + ataque2;
}

function respawn(){
    //Recria o ninja e todos os inimigos nas suas posições

    GameSounds.AMBIENTE.JOGO.play(true, 0.2);
    imgDead = document.querySelector("#imgDead");
    imgDead.style.display = "none";
    btnTryAgain.style.display = "none";
    healthBar.healthNinja = 100;
    drawHealthbar(drawHPbar, 0, 0, 200, 50, healthBar.healthNinja, 100);
    drawHealthbar(drawHPninja, 0, 0, 300, 50, healthBar.healthNinja, 100);
    // 1 - criar a entidade ninja
    umNinja = new Ninja(gSpriteSheets['assets//ninja.png'], canvas.width / 4, canvas.height / 2.9);
    umNinja.x = gameWorld.width / 3.7 - umNinja.width / 2;
    umNinja.nivel = nivelAtual;
    umNinja.nome = nomeNinja.value;

    tryAgainSound.play(false,0.3);
    // 2 - criar a entidade background
    background = new Background(gSpriteSheets['assets//background.png'], -6000, 0);

    // 3 - criar os inimigos
    umWarrior = new SilverWarrior(gSpriteSheets['assets//silverwarrior.png'], canvas.width / 1.8, canvas.height / 2.7, 3);
    umWarrior.nome = "Silver Warrrior";

    umSelvagem = new Selvagem(gSpriteSheets['assets//selvagem.png'], canvas.width / 0.8, canvas.height / 2.7, 7);
    umSelvagem.nome = "Selvagem";

    umViking = new Viking(gSpriteSheets['assets//viking.png'], canvas.width / 1.1, canvas.height / 2.7, 5);
    umViking.nome = "Viking";

    // criar o boss

    oBossYric = new BossYric(gSpriteSheets['assets//bossYric.png'], canvas.width / 0.6, canvas.height/3.6, 10);
    oBossYric.nome = "Yric, Overlord of Existence";

    // 4 - configurar o background
    background.x = Math.floor(background.width / 5) * -2;
    // 5 colocar as entidades no array de entidades
    entities.push(background);
    entities.push(umNinja);
    entities.push(umWarrior);
    entities.push(umSelvagem);
    entities.push(umViking);
    entities.push(oBossYric);

    respawnEnemys();

}

function respawnEnemys(){

    entityFight.silverWarrior = false;
    entityFight.viking = false;
    entityFight.selvagem = false;
    entityFight.bossYric = false;


    umWarrior.killed = false;
    umViking.killed = false;
    umSelvagem.killed = false;
    oBossYric.killed = false;

    umWarrior.isColliding = false;
    umViking.isColliding = false;
    umSelvagem.isColliding = false;
    oBossYric.isColliding = false;

    healthBar.healthWarrior = 100;
    healthBar.healthSelvagem = 100;
    healthBar.healthViking = 100;
    healthBar.healthBossYric = 120;
}