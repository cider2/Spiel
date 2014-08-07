function Creep(game, x, y, p, creepFacing, creepPatrolTime, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'creep', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.body.height = 100;
  this.body.width = 100;

  this.speedX = 50;

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


  this.creepFacing = creepFacing;
  this.creepPatrolTime = creepPatrolTime;
  this.sawPlayer = false;
  this.creepTime = 0;
  this.patrolingLeft = true;
  

}

Creep.prototype = Object.create(Phaser.Sprite.prototype);  
Creep.prototype.constructor = Creep;

Creep.prototype.update = function() {

  this.patroling();

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
     

}

Creep.prototype.patroling = function() {


  if (this.patrolingLeft) {
        this.creepFacing = 'left';
        this.walkLeft();
        this.game.time.events.add(Phaser.Timer.SECOND * this.creepPatrolTime, this.patrolRight, this);
        this.patrolingLeft = false;
  }

  this.lookForPlayer();
  
  if (this.creepFacing == 'right' && this.sawPlayer) {
    this.shootRight();
  }  else if (this.creepFacing == 'left' && this.sawPlayer) {
    this.shootLeft();
  }


},

Creep.prototype.lookForPlayer = function() {
  
  //if ((player.y <= this.body.y + 60 || player.y >= this.body.y - 20) && player.y == this.y)

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
  /*
  if (this.game.time.now > this.bulletTime) {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.x = 2000;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shoot');
      }
  } */
},


Creep.prototype.shootLeft = function() {
  /*
  if (this.game.time.now > this.bulletTime)
                      {
      //  Grab the first bullet we can from the pool
      var bullet = this.deathplantBullets.getFirstExists(false);

      if (bullet)
      {
          //  And fire it
       bullet.reset(this.x, this.y - 40);
       bullet.body.velocity.x = -2000;
       this.bulletTime = this.game.time.now + this.shootDelay;
       this.animations.play('shoot');
      }
  } */
},


Creep.prototype.getBullets = function() {
  return this.creepBullets;
}

