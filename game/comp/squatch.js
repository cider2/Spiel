function Squatch(game, x, y, p, direction, shootDelay, health, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'squatch', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.body.height = 60;
  this.body.width = 60;

  this.health = health;
  this.isKilled = false;
  this.bulletSpeed = p.speed + 300;
  this.collisionDamage = 20;

  this.direction = direction;
  this.shootDelay = shootDelay;

  this.animations.add('shootLeft', [4,0], 10, false);
  this.animations.add('shootRight', [3,2], 10, false);

  this.bulletTime = 1000;

  this.direction = direction;

  this.squatchBullets = this.game.add.group();
  this.squatchBullets.enableBody = true;
  this.squatchBullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.squatchBullets.createMultiple(30, p.getSprite());
  this.squatchBullets.setAll('scale.x', p.scale.x);
  this.squatchBullets.setAll('scale.y', p.scale.y);
  this.squatchBullets.setAll('anchor.x', 0.5);
  this.squatchBullets.setAll('anchor.y', 1);
  this.squatchBullets.setAll('outOfBoundsKill', true);
  this.squatchBullets.setAll('checkWorldBounds', true);

}

Squatch.prototype = Object.create(Phaser.Sprite.prototype);  
Squatch.prototype.constructor = Squatch;

Squatch.prototype.update = function() {

  if (this.health <= 0) {
    this.killIt();
  }

  if (!this.isKilled) {
    if (this.direction == 'right') {
      this.shootRight();
    }  else if (this.direction == 'left') {
      this.shootLeft();
    }
    
  }
  
},
        
Squatch.prototype.shootRight = function() {
  
  
  if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      var bullet = this.squatchBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y + 30);
       bullet.body.velocity.x = this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shootRight');
      }
  }
},

Squatch.prototype.shootLeft = function() {

  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.squatchBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x -40, this.y + 30);
       bullet.body.velocity.x = -this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shootLeft');
      }
  }
},


Squatch.prototype.getBullets = function() {
  return this.squatchBullets;
},


Squatch.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Squatch.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}