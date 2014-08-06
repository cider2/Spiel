
function Projectile(game, x, y, frame) {  

Phaser.Sprite.call(this, game, x, y, 'projectile', frame);


this.game.physics.enable(this, Phaser.Physics.ARCADE);

this.body.collideWorldBounds = true;

this.body.height = 10;
this.body.width = 20;
this.speedX = 200;
this.speedY = 200;

}


Projectile.prototype = Object.create(Phaser.Sprite.prototype);  
Projectile.prototype.constructor = Projectile;

Projectile.prototype.update = function() {




};