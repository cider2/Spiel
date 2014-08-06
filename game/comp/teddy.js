
var facing = 'right';
var shootFacing = 'right';
var hasWeapon = true;
var justFired = false;
var justShot = false;

function Teddy(game, x, y, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'teddy', frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  /* this.startPos = {
    x:900,
    y:600,
    rotation:0
  };
  */
  this.x = 500;
  this.y = 1000;

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 28;
  this.speedX = 200;
  this.speedY = 200;


  this.animations.add('walkRight', [1, 2, 3,4,5,6,7,8], 10, true);
  this.animations.add('walkLeft', [21,20,19,18,17,16,15,14], 10, true);
  this.animations.add('jumpRight', [31,32,33,34], 40, false);  // 28 bis 41
  this.animations.add('jumpLeft', [52,51,50,49], 40, false);  // 42 bis 55
  this.animations.add('climb', [168,169], 8, true); 
  this.animations.add('climbWeapon', [182,183], 8, true); 
  this.animations.add('walkWeaponRight', [85,86,87,88,89,90,91,92], 10, true);
  this.animations.add('walkWeaponLeft', [106,105,104,103,102,101,100,99], 10, true);
  this.animations.add('jumpWeaponRight', [116,117,118,119], 40, false);
  this.animations.add('jumpWeaponLeft', [130,131,132,133], 40, false);
  this.animations.add('fallRight', [34,35,36], 20, false);
  this.animations.add('walkShootingRight', [140,141,142,143,144,145,146,147,148], 10, true);
  this.animations.add('walkShootingLeft', [162,161,160,159,158,157,156,155,154], 10, true);

  //Sprites
  this.muzzleFlash = this.game.add.sprite(this.body.x+32,this.body.y+32,'explosions');
  this.muzzleFlash.frame = 49;
  this.muzzleFlash.scale.setTo(0.5,0.5);
  this.muzzleFlash.alpha = 0.0;

}

Teddy.prototype = Object.create(Phaser.Sprite.prototype);  
Teddy.prototype.constructor = Teddy;

Teddy.prototype.update = function() {




},

Teddy.prototype.goLeft = function() {
	 this.body.velocity.x = -this.speedX;
     facing = 'left';
     shootFacing = 'left';

		if (isFalling) {
          	if (hasWeapon) {
          		if (isShooting) {
          			this.frame = 162;
          		} else {
          			this.frame = 133;
          		}
          	} else {
          		this.frame = 49;
          	}
          }

		 /* if (isFalling) {
	      	 this.frame = 49;
	      }  */
	      if (isShooting) {
          		this.animations.play('walkShootingLeft');
          		//this.shootLeft();
          }
          else if (this.body.onFloor()) {
          	if (hasWeapon) {
          		this.animations.play('walkWeaponLeft');
          	} else {
	            this.animations.play('walkLeft');
          	}
          }
          


},

Teddy.prototype.goRight = function() {
	 this.body.velocity.x = this.speedX;
     facing = 'right';
     shootFacing = 'right';

          if (isFalling) {
          	if (hasWeapon) {
          		if (isShooting) {
          			this.frame = 140;
          		} else {
          			this.frame = 119;
          		}
          	} else {
          		this.frame = 34;
          	}
          }

          if (isShooting) {
          	 this.animations.play('walkShootingRight');
          	 //this.shootRight();
          }

          else if (this.body.onFloor()) {
          	if (hasWeapon) {
          		this.animations.play('walkWeaponRight');
          	} else {
	            this.animations.play('walkRight');
          	}
          }


},

Teddy.prototype.climbUp = function() {
	 this.body.velocity.y = -this.speedY;
	 
          if (facing != 'up') {
          	if (hasWeapon) {
	         	this.animations.play('climbWeapon');
          	} else {
	         	this.animations.play('climb');
          	}
            facing = 'up';
          }

},

Teddy.prototype.climbDown = function() {
	 this.body.velocity.y = this.speedY;
	 
          if (facing != 'down') {
         	if (hasWeapon) {
	         	this.animations.play('climbWeapon');
          	} else {
	         	this.animations.play('climb');
          	}
            facing = 'down';
          }

},


Teddy.prototype.doNothing = function() {

	this.body.velocity.x = 0;
	if (isLadder) {
		this.body.velocity.y = 0;
	}

      //  if (facing != 'idle') {
           // this.animations.stop();
    if (this.body.onFloor()) {
       if (facing == 'left')
	   {
	   		if (hasWeapon) {
	   			this.frame = 105;
	   		} else {
	           	this.frame = 22;
	   		}
       }
       else
       {	
       		if (hasWeapon) {
       			this.frame = 85;
       		}
       		else {
            	this.frame = 0;
       		}
       }
	}
	else {
		if (isLadder) {
			if (hasWeapon) {
	         	this.frame = 182;
          	} else {
				this.frame = 168;
          	}
		}
		else if (facing == 'left') {
			if (hasWeapon) {
	         	this.frame = 133;
          	} else {
				this.frame = 49;
          	}
		}
		else {
			if (hasWeapon) {
	         	this.frame = 119;
          	} else {
				this.frame = 34;
          	}
		}
	}

	if (isShooting) {
		if (facing == 'left') {
	         	this.frame = 161;
		}
		else {
	         	this.frame = 141;
		}
	}

            //facing = 'idle';
//        }
},


Teddy.prototype.jump = function() {
		if (this.body.onFloor()) {
 			this.body.velocity.y = -300;
		}
		if (this.body.onFloor() && facing == 'right') { 
			if (hasWeapon) {
				this.animations.play('jumpWeaponRight');
			} else {
				this.animations.play('jumpRight');
			}
		}
		else if (this.body.onFloor() && facing == 'left') {
			if (hasWeapon) {
				this.animations.play('jumpWeaponLeft');
			} else {
				this.animations.play('jumpLeft');
			}
		}

},

Teddy.prototype.shootRight = function() {
	this.justShot = true;
	this.muzzleFlash.x = this.body.x+52;
	this.muzzleFlash.y = this.body.y+26;
	this.muzzleFlash.alpha = 1.0;
	this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
},

Teddy.prototype.shootLeft = function() {
	this.justShot = true;
	this.muzzleFlash.x = this.body.x-52;
	this.muzzleFlash.y = this.body.y+26;
	this.muzzleFlash.alpha = 1.0;
	this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
},

Teddy.prototype.hideMuzzleFlash = function() {
	this.muzzleFlash.alpha = 0.0;
},


Teddy.prototype.changeVelocity= function(y) {
		this.body.velocity.y = y;
},


Teddy.prototype.crouch = function() {

};