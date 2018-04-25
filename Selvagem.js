// Background.js

var Selvagem = Entity.extend(function () {
    this.currState = undefined; // estado atual;
    var _this = this;
    var vFrame = 0;
    var timerAndar = 0;

    this.estaAndar = 1;
    this.parado = false;
    this.states = {
        ANDAR: 'ANDAR',
        RECUAR: 'RECUAR',
        PARADO: 'PARADO',
        MORRER : 'MORRER'
    }


    this.constructor = function (spriteSheet, x, y, nivel) {
        this.super();
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.currState = this.states.PARADO;
        this.vx = 0;
        this.vy = 0;
        this.nome = undefined;
        this.nivel = nivel;
        this.ataque1 = 40;
        this.ataque2 = 70;
        this.exp= 80;
        setup();
    };


    this.getSprite = function () {
        return this.frames[this.currentFrame];
    };


    this.update = function () {

        if(this.killed === true) {
            // if (this.alpha != 0) {
            if (this.currState == this.states.MORRER && this.currentFrame == this.frames.length - 1) {
                this.y -= 2.5;
                return this.alpha -= 0.01;
            }

        }
        vFrame = vFrame < this.frames.length - 1 ? vFrame + 0.1 : 0;
        this.currentFrame = Math.floor(vFrame);


        this.width = this.frames[this.currentFrame].width;    //atualizar a altura
        this.height = this.frames[this.currentFrame].height;  // atualizar os
        this.x += this.vx;

        // andamento automatico
    if(this.parado != true){
        if (this.parado === false) {
            if (timerAndar == 120) {
                this.estaAndar = -1;
            } else if (timerAndar == 0) {
                this.estaAndar = 1;
            }
            timerAndar += this.estaAndar;
        }
    }
    };


    function setup() {

        _this.eStates['ANDAR'] = _this.spriteSheet.getStats('ANDAR');
        _this.eStates['RECUAR'] = _this.spriteSheet.getStats('RECUAR');
        _this.eStates['PARADO'] = _this.spriteSheet.getStats('PARADO');
        _this.eStates['MORRER']=_this.spriteSheet.getStats('MORRER');
        _this.frames = _this.eStates[_this.currState];
        _this.width = _this.frames[0].width;
        _this.height = _this.frames[0].height;

    }

    this.andar = function () {
        toogleState(this.states.ANDAR);
        this.vx=2;
    };

    this.recuar = function () {
        toogleState(this.states.RECUAR);
        this.vx=2;
    };

    this.parar = function () {
        toogleState(this.states.PARADO);
        this.parado = true;
        this.vx=0;
    };

    this.morrer = function () {
        toogleState(this.states.MORRER);
    };

    function toogleState(theState) {
        if (_this.killed) return;
        if (_this.currState != theState) {
            _this.currState = theState;
            _this.frames = _this.eStates[theState];
            _this.currentFrame = 0;
        }
    }

});


