function Starsmall(game, x, y, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'starSmall', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.body.height = 32;
  this.body.width = 32;
  this.isKilled = false;

  this.animations.add('turning', [0,1,2,3,4,5,6,7,8,9], 20, true);

}

Starsmall.prototype = Object.create(Phaser.Sprite.prototype);  
Starsmall.prototype.constructor = Starsmall;

Starsmall.prototype.update = function() {

  if (!this.isKilled) {
    this.animations.play('turning');
  }
  
},

Starsmall.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Starsmall.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}