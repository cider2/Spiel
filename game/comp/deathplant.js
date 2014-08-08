function Deathplant(game, x, y, p, direction, shootDelay, health, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'deathplant', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.P2JS);

  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 100;

  this.health = health;
  this.isKilled = false;
  this.bulletSpeed = p.speed;
  this.collisionDamage = 10;

  this.direction = direction;
  this.shootDelay = shootDelay;



/*
  if (direction == 'up') {
    this.body.rotate = 0;
  }  else if (direction == 'right') {
    this.body.angle = 90;
  } else if (direction == 'down') {
    this.body.angle = 180;
  }  else if (direction == 'left') {
    this.body.angle = 270;
  }
  */

  this.animations.add('shootUp', [0,4], 10, false);
  this.animations.add('shootDown', [2,3], 10, false);

  this.bulletTime = 1000;

  this.deathplantBullets = this.game.add.group();
  this.deathplantBullets.enableBody = true;
  this.deathplantBullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.deathplantBullets.createMultiple(30, p.getSprite());
  this.deathplantBullets.setAll('scale.x', p.scale.x);
  this.deathplantBullets.setAll('scale.y', p.scale.y);
  this.deathplantBullets.setAll('anchor.x', 0.5);
  this.deathplantBullets.setAll('anchor.y', 1);
  this.deathplantBullets.setAll('outOfBoundsKill', true);
  this.deathplantBullets.setAll('checkWorldBounds', true);

}

Deathplant.prototype = Object.create(Phaser.Sprite.prototype);  
Deathplant.prototype.constructor = Deathplant;

Deathplant.prototype.update = function() {

  if (this.health <= 0) {
    this.killIt();
  }

  if (!this.isKilled) {

    if (this.direction == 'up') {
      this.shootUp();
    } //  else if (this.direction == 'right') {
      //  this.shootRight(); }
    else if (this.direction == 'down') {
      this.shootDown();
    } // else if (this.direction == 'left') {
    //  this.shootLeft();
  //  }
  
  }


},



        
Deathplant.prototype.shootRight = function() {
  
  
  if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.x = this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shoot');
      }
  }
},

Deathplant.prototype.shootLeft = function() {

  
  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.x = -this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shoot');
      }
  }
},

Deathplant.prototype.shootUp = function() {

  
  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.y = -this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shootUp');
      }
  }
},

Deathplant.prototype.shootDown = function() {

  
  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.y = this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shootDown');
      }
  }
},

Deathplant.prototype.getBullets = function() {
  return this.deathplantBullets;
},


Deathplant.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Deathplant.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}