var Ninja = Entity.extend(function(){
  this.currState=undefined; // estado atual;
  var _this=this;
	var vFrame =0;
  this.states={
	  ANDAR:'ANDAR',
	  ATACAR:'ATACAR',
	  PARADO:'PARADO',
	  MORRER:'MORRER',
	  RECUAR:'RECUAR'
  }
  
 
  this.constructor= function(spriteSheet,x,y,nivel, nome){
	  this.super();
	  this.x=x;
	  this.y=y;
	  this.spriteSheet=spriteSheet;
	  this.currState=this.states.PARADO;
	  this.currentFrame=0;
	  this.nivel = nivel;
	  this.nome = nome;
	  this.ataque1 = 20;
	  this.ataque2 = 50;
	  this.exp =0;
	  setup();
  };
  
  this.update=function(){

	 	if(this.alpha!=0) {
			//console.log(this.alpha);
			if (this.currState == this.states.MORRER && this.currentFrame == this.frames.length - 1) {
				this.y -= 2;
				return this.alpha -= 0.01;
			}
		}

	  vFrame= vFrame < this.frames.length-1?vFrame+0.4:0;
	  this.currentFrame=Math.floor(vFrame);


	  //this.currentFrame=this.currentFrame< this.frames.length-1?this.currentFrame+1:0;

	  this.width=this.frames[this.currentFrame].width;    //atualizar a altura
	  this.height=this.frames[this.currentFrame].height;  // atualizar os



	  if(this.currState===this.states.ATACAR && this.currentFrame==this.frames.length){
		  this.parar();
	  }

  };
  
  this.getSprite=function(){
	  return this.frames[this.currentFrame];
  };
  

  function setup(){
	 
	  _this.eStates['ANDAR']=_this.spriteSheet.getStats('ANDAR');
	  _this.eStates['ATACAR']=_this.spriteSheet.getStats('ATACAR');
	  _this.eStates['PARADO']=_this.spriteSheet.getStats('PARADO');
	  _this.eStates['MORRER']=_this.spriteSheet.getStats('MORRER');
	  _this.eStates['RECUAR']=_this.spriteSheet.getStats('RECUAR');
	  
	  _this.frames=_this.eStates[_this.currState]; 
	  _this.width=_this.frames[0].width;  //atualizar a altura 
	  _this.height=_this.frames[0].height;  // atualizar os 
	 
	 // atualizar o array de frames atual
	  
  }


	this.andar=function(){
		toogleState(this.states.ANDAR);
	}

	this.recuar=function(){
		toogleState(this.states.RECUAR);
	}

	this.parar=function(){
		toogleState(this.states.PARADO);
	}

	this.atacar=function(){
		toogleState(this.states.ATACAR);
	}

	this.morrer=function(){
		toogleState(this.states.MORRER);
	}


	function toogleState(theState){
		if(_this.killed) return;
		if(_this.currState!=theState){
			_this.currState=theState;
			_this.frames=_this.eStates[theState];
			_this.currentFrame=0;
		}
	}

});


