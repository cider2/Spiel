function Creep(game, x, y, p, creepFacing, creepPatrolTime, shootDelay, health, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'creep', frame);

  this.anchor.setTo(0.5, 0.5);
  
  //this.game.physics.enable(this, Phaser.Physics.ARCADE);
  this.game.physics.enable(this, Phaser.Physics.P2JS);
  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 100;

  this.speedX = 50;
  this.health = health;
  this.isKilled = false;
  this.bulletSpeed = p.speed;
  this.collisionDamage = 10;  // Wenn Spieler Gegner berührt

  this.animations.add('walkLeft', [0,1,2,3,4,5,6,7,8,9], 10, true);
  this.animations.add('walkRight', [10,11,12,13,14,15,16,17,18], 10, true);



  this.creepBullets = this.game.add.group();
  this.creepBullets.enableBody = true;
  this.creepBullets.physicsBodyType = Phaser.Physics.ARCADE;
  this.creepBullets.createMultiple(30, p.getSprite());
  this.creepBullets.setAll('scale.x', p.scale.x);
  this.creepBullets.setAll('scale.y', p.scale.y);
  this.creepBullets.setAll('anchor.x', 0.5);
  this.creepBullets.setAll('anchor.y', 1);
  this.creepBullets.setAll('outOfBoundsKill', true);
  this.creepBullets.setAll('checkWorldBounds', true);

  this.muzzleFlash = this.game.add.sprite(this.body.x+32,this.body.y+32,'explosions');
  this.muzzleFlash.frame = 49;
  this.muzzleFlash.anchor.setTo(0.5, 0.5);
  this.muzzleFlash.scale.setTo(0.3,0.3);
  this.muzzleFlash.alpha = 0.0;

  this.anchor.setTo(0.5, 0.5);

  this.creepFacing = creepFacing;
  this.creepPatrolTime = creepPatrolTime;
  this.sawPlayer = 'none';
  this.creepTime = 0;
  this.patrolingLeft = true;
  this.creepIsShooting = false;

  this.bulletTime = 0;
  this.shootDelay = shootDelay;




}

Creep.prototype = Object.create(Phaser.Sprite.prototype);  
Creep.prototype.constructor = Creep;

Creep.prototype.update = function() {
  if (!this.isKilled) {
    this.patroling();
  }

},


Creep.prototype.patrolLeft = function() {

     this.patrolingLeft = true;
}

Creep.prototype.patrolRight = function() {

     
     if (!this.patrolingLeft) {
        this.creepFacing = 'right';
        this.game.time.events.add(Phaser.Timer.SECOND * this.creepPatrolTime, this.patrolLeft, this);
        this.walkRight(); 
     }
     

},

Creep.prototype.patroling = function() {


  if (this.patrolingLeft) {
        this.creepFacing = 'left';
        this.walkLeft();
        this.game.time.events.add(Phaser.Timer.SECOND * this.creepPatrolTime, this.patrolRight, this);
        this.patrolingLeft = false;
  }

  this.lookForPlayer();

  //console.log(this.sawPlayer);
  
/* if (this.sawPlayer == 'left') {
    this.creepFacing = 'left';
    this.shootLeft();
  }  else if (this.sawPlayer == 'right') {
    this.creepFacing = 'right';
    this.shootRight();
  }
  */


  if (this.creepIsShooting && this.sawPlayer == 'right' && this.creepFacing == 'right') {
    this.shootRight();
  } else if (this.creepIsShooting && this.sawPlayer == 'left' && this.creepFacing == 'left') {
    this.shootLeft();
  }

//console.log(player.y <= this.body.y + 80 && player.y >= this.body.y - 40);

},

Creep.prototype.lookForPlayer = function() {
  
  if ((player.y <= this.body.y + 100 && player.y >= this.body.y - 40) && player.x >= this.body.x && player.x <= this.body.x + 700) {
      this.sawPlayer = 'right';
      this.creepIsShooting = true;
  } else if ((player.y <= this.body.y + 100 && player.y >= this.body.y - 40) && player.x <= this.body.x && player.x >= this.body.x - 700) {
      this.sawPlayer = 'left';
      this.creepIsShooting = true;
  } else {
    this.sawPlayer = 'none';
    this.creepIsShooting = false;
  }




},


Creep.prototype.walkLeft = function() {
  
  this.body.velocity.x = -this.speedX;
  this.animations.play('walkLeft');

},
  

Creep.prototype.walkRight = function() {
  
  this.body.velocity.x = this.speedX;
  this.animations.play('walkRight');

},



Creep.prototype.shootRight = function() {

  if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      var bullet = this.creepBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x + 64, this.y +12);
       bullet.body.velocity.x = this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;

       this.muzzleFlash.x = this.body.x+94;
       this.muzzleFlash.y = this.body.y+30;
       this.muzzleFlash.alpha = 1.5;
       this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
      }
  } 
},


Creep.prototype.shootLeft = function() {

   if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      var bullet = this.creepBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x - 64, this.y +12);
       bullet.body.velocity.x = -this.bulletSpeed;
       this.bulletTime = this.game.time.now + this.shootDelay;

       this.muzzleFlash.x = this.body.x+8;
       this.muzzleFlash.y = this.body.y+30;
       this.muzzleFlash.alpha = 1.5;
       this.game.time.events.add(Phaser.Timer.SECOND * 0.02, this.hideMuzzleFlash, this);
      }
  } 
},

Creep.prototype.hideMuzzleFlash = function() {
  this.muzzleFlash.alpha = 0.0;
},


Creep.prototype.getBullets = function() {
  return this.creepBullets;
}

Creep.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Creep.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}