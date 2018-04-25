
// Background.js

var Background = Entity.extend(function () {
    this.currState = undefined; // estado atual;
    var _this = this;

    this.states = {
        UNIQUE: 'UNIQUE'
    }


    this.constructor = function (spriteSheet, x, y) {
        this.super();
        this.x = x;
        this.y = y;
        this.spriteSheet = spriteSheet;
        this.currState = this.states.UNIQUE;
        this.vx = 0;
        this.vy=0;
        setup();
    };

    this.update = function () {
        this.x=this.x+this.vx;
        if(this.x==Math.round(this.width/3*2))this.x=0;

    };

    this.getSprite = function () {
        return this.frames[this.currentFrame];
    };


    function setup() {
        _this.eStates['UNIQUE'] = _this.spriteSheet.getStats('UNIQUE');
        _this.frames = _this.eStates[_this.currState];
        _this.width=_this.frames[0].width;
        _this.height=_this.frames[0].height;
    }

    this.andar = function () {
        this.vx=1;
    }

    this.parar = function () {
        this.vx=0;
    }

});


