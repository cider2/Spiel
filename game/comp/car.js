function Car(game, x, y, frame) {  
  
  Phaser.Sprite.call(this, game, x, y, 'car', frame);

  /// set the sprite's anchor to the center
  this.anchor.setTo(0.5, 0.5);
  
  this.isHandbrake = false;
  this.startPos = {
    x:900,
    y:320,
    rotation:0
  };
  this.DEGREE_TO_RADIANS = Math.PI/180.0;
  this.speed = 0;


  this.game.physics.arcade.enable(this);
  this.body.collideWorldBounds = true;

  this.body.maxVelocity.set(399);
  this.body.height = this.body.width = 40;

  this.resetStartPosition();

}

Car.prototype = Object.create(Phaser.Sprite.prototype);  
Car.prototype.constructor = Car;

Car.prototype.update = function() {

};  

Car.prototype.resetStartPosition = function() {
  console.log(this.startPos);
  this.x = this.startPos.x;
  this.y = this.startPos.y;
  this.rotation = this.myRotation = this.startPos.rotation;
}

  
Car.prototype.brake = function(){
  if (this.isHandbrake) 
     return;
  this.speed -= 20;
  if (this.speed < -this.body.maxVelocity.x)
      this.speed = -this.body.maxVelocity.x;
  
}

Car.prototype.steerLeft = function(){
    if (this.speed > 0) this.body.rotation = (this.body.rotation-5)%360;
    else if (this.speed < 0) this.body.rotation = (this.body.rotation+5)%360;
     //this.myRotation -= 0.1;
}

Car.prototype.steerRight = function(){
     if (this.speed > 0) this.body.rotation = (this.body.rotation+5)%360;
    else if (this.speed < 0) this.body.rotation = (this.body.rotation-5)%360;
  //this.myRotation += 0.1;
}

Car.prototype.accel = function(){
  if(this.isHandbrake)
    return;
  if (this.speed < 399) { 
      this.speed += 20;
  }


}

Car.prototype.drive = function(){
  

  if(!this.isHandbrake){
    this.myRotation = this.body.rotation;
  }else{
    this.slowDown = 11;
  }
  
  // if (Math.abs(this.speed) <= this.slowDown) this.speed = 0;
  this.slowDown = 8;



  if(this.speed>5) this.speed -= this.slowDown;
  if(this.speed<-5) this.speed += this.slowDown;
  if(Math.abs(this.speed)<=this.slowDown) this.speed = 0;

  //Wenn die absolute aktuelle Geschwindigkeit einen bestimmten Wert (z.B. SLOW_DOWN)
  //unterschreitet (also egal, ob vor- oder rückwärts), soll die aktuelle Geschwindigkeit
  //auf 0 gesetzt werden, ansonsten soll die Geschwindigkeit um einen kleinen Wert (slowDown)
  //verringert (vorwärts) bzw. erhöht (rückwärts) werden
  //...
  //...
  //...
  
  this.body.velocity.x = this.speed*Math.cos(this.myRotation*this.DEGREE_TO_RADIANS);
  this.body.velocity.y = this.speed*Math.sin(this.myRotation*this.DEGREE_TO_RADIANS);

} 

