
var facing = 'left';


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
  this.y = 5000;

  this.game.physics.enable(this, Phaser.Physics.ARCADE);
  //this.game.physics.p2.enable(this);
  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 28;
  this.speed = 200;

  this.walkAnim = this.animations.add('walk');
  this.climbAnim = this.animations.add('climb');
  //this.body.kinematic = false;
  //this.body.motionState = Phaser.Physics.P2.Body.DYNAMIC;

}

Teddy.prototype = Object.create(Phaser.Sprite.prototype);  
Teddy.prototype.constructor = Teddy;

Teddy.prototype.update = function() {




},

Teddy.prototype.goLeft = function() {
	 this.body.velocity.x = -this.speed;

          if (facing != 'left') {
          //  player.animations.play('left');
            facing = 'left';
          }
},

Teddy.prototype.goRight = function() {
	 this.body.velocity.x = this.speed;

          if (facing != 'right') {
         	 this.walkAnim.play(10,true);	
            facing = 'right';
          }

},

Teddy.prototype.climbUp = function() {
	 this.body.velocity.y = -this.speed;
	 
          if (facing != 'up') {
         	 this.climbAnim.play(10,true);	
            facing = 'up';
          }

},

Teddy.prototype.climbDown = function() {
	 this.body.velocity.y = this.speed;
	 
          if (facing != 'down') {
         	 this.climbAnim.play(10,true);	
            facing = 'down';
          }

},


Teddy.prototype.doNothing = function() {

	this.body.velocity.x = 0;
	if (isLadder) {
		this.body.velocity.y = 0;
	}

        if (facing != 'idle') {
            this.animations.stop();

            if (facing == 'left')
            {
                this.frame = 0;
            }
            else
            {
                this.frame = 9;
            }

            facing = 'idle';
        }
    }
,


Teddy.prototype.jump = function() {
		this.body.velocity.y = -300;
},

Teddy.prototype.changeVelocity= function(y) {
		this.body.velocity.y = y;
},


Teddy.prototype.crouch = function() {

};