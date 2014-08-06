function Teddy(game, x, y, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'teddy', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 100;
  
  this.animations.add('shoot', [1,2], 20, true);

}

Teddy.prototype = Object.create(Phaser.Sprite.prototype);  
Teddy.prototype.constructor = Teddy;

Teddy.prototype.update = function() {




},


Teddy.prototype.shootRight = function() {
	this.justShot = true;
	
	this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
},

Teddy.prototype.shootLeft = function() {
	this.justShot = true;
	
	this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
},

Teddy.prototype.hideMuzzleFlash = function() {
	this.muzzleFlash.alpha = 0.0;
}