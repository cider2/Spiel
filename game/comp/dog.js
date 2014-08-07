function Dog(game, x, y, dogFacing, dogPatrolTime, speedX, health, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'dog', frame);

  this.anchor.setTo(0.5, 0.5);
  
  this.game.physics.enable(this, Phaser.Physics.ARCADE);

  this.body.collideWorldBounds = true;

  this.body.height = 60;
  this.body.width = 60;

  this.speedX = speedX;
  this.health = health;
  this.isKilled = false;

  this.animations.add('walkLeft', [0,1,2,3,4,5,6,7], 10, true);
  this.animations.add('walkRight', [0,1,2,3,4,5,6,7], 10, true);

  this.anchor.setTo(0.5, 0.5);

  this.dogFacing = dogFacing;
  this.dogPatrolTime = dogPatrolTime;
  this.sawPlayer = 'none';
  this.dogTime = 0;
  this.patrolingLeft = true;

}

Dog.prototype = Object.create(Phaser.Sprite.prototype);  
Dog.prototype.constructor = Dog;

Dog.prototype.update = function() {

  if (!this.isKilled) {
    this.patroling();
  }

},


Dog.prototype.patrolLeft = function() {

     this.patrolingLeft = true;
}

Dog.prototype.patrolRight = function() {

     
     if (!this.patrolingLeft) {
        this.dogFacing = 'right';
        this.game.time.events.add(Phaser.Timer.SECOND * this.dogPatrolTime, this.patrolLeft, this);
        this.walkRight(); 
     }
     

},

Dog.prototype.patroling = function() {


  if (this.patrolingLeft) {
        this.dogFacing = 'left';
        this.walkLeft();
        this.game.time.events.add(Phaser.Timer.SECOND * this.dogPatrolTime, this.patrolRight, this);
        this.patrolingLeft = false;
  }

  //console.log(this.sawPlayer);
  
/* if (this.sawPlayer == 'left') {
    this.creepFacing = 'left';
    this.shootLeft();
  }  else if (this.sawPlayer == 'right') {
    this.creepFacing = 'right';
    this.shootRight();
  }
  */

},

Dog.prototype.walkLeft = function() {
  
  this.body.velocity.x = -this.speedX;
  this.animations.play('walkLeft');

},
  

Dog.prototype.walkRight = function() {
  
  this.body.velocity.x = this.speedX;
  this.animations.play('walkRight');

},

Dog.prototype.killIt = function() {
  
  this.isKilled = true;
  this.animations.stop();
  this.loadTexture('explosions', 0);
  this.animations.add('explode', [35,36,37,38,39,40,41,42], 28, false);
  this.animations.play('explode');
  this.game.time.events.add(Phaser.Timer.SECOND * 0.4, this.destroyIt, this);
},

Dog.prototype.destroyIt = function() {
  // make sprite invisible
  this.kill();
  // clear RAM
  this.destroy();
}