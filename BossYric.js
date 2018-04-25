// Background.js

var BossYric = Entity.extend(function () {
    this.currState = undefined; // estado atual;
    var _this = this;
    var vFrame = 0;

    this.estaAndar = 1;
    this.parado = false;
    this.states = {
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
        this.ataque2 = 80;
        this.exp= 100;
        setup();
    };


    this.getSprite = function () {
        return this.frames[this.currentFrame];
    };


    this.update = function () {

        if(this.killed === true) {
            if (this.currState == this.states.MORRER && this.currentFrame == this.frames.length - 1) {
            }

        }
        vFrame = vFrame < this.frames.length - 1 ? vFrame + 0.1 : 0;
        this.currentFrame = Math.floor(vFrame);


        this.width = this.frames[this.currentFrame].width;    //atualizar a altura
        this.height = this.frames[this.currentFrame].height;  // atualizar os
        this.x += this.vx;


    };


    function setup() {


        _this.eStates['PARADO'] = _this.spriteSheet.getStats('PARADO');
        _this.eStates['MORRER']=_this.spriteSheet.getStats('MORRER');
        _this.frames = _this.eStates[_this.currState];
        _this.width = _this.frames[0].width;
        _this.height = _this.frames[0].height;

    }

    this.parar = function () {
        toogleState(this.states.PARADO);
        this.parado = true;
        this.vx=0;
    };

    this.morrer = function () {
        toogleState(this.states.MORRER);
        this.vx=0;
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


