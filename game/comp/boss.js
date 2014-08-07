function Boss(game, x, y, p, shootDelay, health, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'boss', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.scale.x = 0.75;
  this.scale.y = 0.75;

  this.body.height = 300;
  this.body.width = 300;

  this.health = health;
  this.isKilled = false;
  this.bulletSpeed = p.speed + 300;
  this.collisionDamage = 50;

  this.shootDelay = shootDelay;

  this.frame = 1;

  this.animations.add('shootLeft', [1,2,1,0], 10, false);

  this.bulletTime = 1000;

  this.isActivated = false;

  this.bossBullets = this.game.add.group();
  this.bossBullets.enableBody = true;
  this.bossBullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.bossBullets.createMultiple(30, p.getSprite());
  this.bossBullets.setAll('scale.x', p.scale.x);
  this.bossBullets.setAll('scale.y', p.scale.y);
  this.bossBullets.setAll('anchor.x', 0.5);
  this.bossBullets.setAll('anchor.y', 1);
  this.bossBullets.setAll('outOfBoundsKill', true);
  this.bossBullets.setAll('checkWorldBounds', true);

}

Boss.prototype = Object.create(Phaser.Sprite.prototype);  
Boss.prototype.constructor = Boss;

Boss.prototype.update = function() {

  if (this.health <= 0) {
    this.killIt();
  }

  if (!this.isKilled && this.isActivated) {
      this.shootLeft();
  }
  
},


Boss.prototype.shootLeft = function() {

  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.bossBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x -70, this.y);
       //bullet.body.velocity.x = -this.bulletSpeed;
       this.game.physics.arcade.moveToObject(bullet,player,this.bulletSpeed);
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shootLeft');
      }
  }
},


Boss.prototype.getBullets = function() {
  return this.bossBullets;
},


Boss.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Boss.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}