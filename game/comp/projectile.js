
function Projectile(game, x, y, projectileIndex,spriteImageParam,frame) {  

this.spriteImage = spriteImageParam;

Phaser.Sprite.call(this, game, x, y, this.spriteImage, frame);

this.game.physics.enable(this, Phaser.Physics.ARCADE);

this.anchor.setTo(0.5, 0.5);

if (projectileIndex == 1)  {
	this.damage = 10;
	this.scale.x = 0.3;
	this.scale.y = 0.3;
	this.body.height = 5;
	this.body.width = 5;
	this.speed = 1500;
}

else if (projectileIndex == 2)  {
	this.damage = 20;
	this.scale.x = 0.1;
	this.scale.y = 0.1;
	this.body.height = 5;
	this.body.width = 5;
	this.speed = 100;

} else if (projectileIndex == 3) {
	this.damage = 20;
	this.scale.x = 1;
	this.scale.y = 1;
	this.body.height = 5;
	this.body.width = 5;
	this.speed = 1000;

} else if (projectileIndex == 4) {
	this.damage = 20;
	this.scale.x = 0.5;
	this.scale.y = 0.5;
	this.body.height = 5;
	this.body.width = 5;
	this.speed = 1800;
	this.alpha = 1.0;
	//this.frame = 11;
}




}


Projectile.prototype = Object.create(Phaser.Sprite.prototype);  
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {

	this.animations.play('green');

},

Projectile.prototype.getSprite = function() {
	return this.spriteImage;

};