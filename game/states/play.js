'use strict';

var isLadder = false;
var firstTimeLadder = true;
var isFalling = false;
var isShooting = false;
var firstTimeShooting = true;
var justFired = true;
var bulletTime = 100;
var bullet;
var currentTeddyProjectile;
var player;

function Play() {
}


Play.prototype = {

  preload: function() {
   
  },

  create: function() {

      this.tilemap = this.game.add.tilemap('level1');
      //this.tilemap = this.game.add.tilemap('tutorial');
      this.tilemap.addTilesetImage("tileset");
     
      //this.tilemap.setTileIndexCallback(8, this.hitFinishingLine, this);
      
      this.layer = this.tilemap.createLayer('worldlayer');
  //    this.ladderLayer = this.tilemap.createLayer('ladderlayer');
      this.layer.resizeWorld();
 //     this.secretLayer = this.tilemap.createLayer('secretlayer');
//      this.ladderLayer.resizeWorld();

      
      this.tilemap.setCollisionByExclusion([530,531,557,558,584,585],true,this.layer);

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

  	  this.player = new Teddy(this.game, 500, 1000, 100);
      player = this.player;
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);
      this.game.camera.deadzone = new Phaser.Rectangle(600,400,1,1);
      this.player.body.fixedRotation = true;

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      this.ctrl = this.input.keyboard.addKey(Phaser.Keyboard.CONTROL);

      this.p1 = new Projectile(this.game, 0,0, 1,'projectile1');
      this.p2 = new Projectile(this.game, 0,0, 2,'projectile2');
      this.p3 = new Projectile(this.game, 0,0, 3,'projectile3');
      this.p4 = new Projectile(this.game, 0,0, 4,'projectile4');

      //this.game.add.existing(this.p3);      


      this.loadTeddyBullets(this.p4);

      this.addEnemies();
      this.enemies;

  },

  update: function() {
      this.game.physics.arcade.collide(this.layer,this.player);
      for (var i=0; i<this.enemies.length; i++) {
          this.enemy = this.enemies[i];
          this.game.physics.arcade.collide(this.layer,this.enemy);
      } 
      this.checkKeys();
      if (!this.player.body.onFloor()) {
         this.player.speed = 160;
      }
      else {
        this.player.speed = 200;
      }
      //this.game.physics.arcade.collide(this.ladderLayer,this.player,changeGravity());
      this.tilemap.currentLayer = this.tilemap.getLayer(this.ladderLayer);
      try { 

        if (  this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 530 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 531 ||
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 532 ||
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 533 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 557 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 558 ||
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 559 ||
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 560 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 584 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 585 
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 586 ||
              //this.tilemap.getTileWorldXY(this.player.x,this.player.y).indsex == 587

           ) {

            this.game.physics.arcade.gravity.y = 0;
            isLadder = true;
            this.player.speedX = 50;
            
         }

     /*    if (this.player.body.onFloor() || !isLadder) {
              isFalling = false;
            } else {
              isFalling = true;
         } 
         */

      } catch (err) {
            this.game.physics.arcade.gravity.y = 500;
          /*  if (isLadder) {
              this.player.doNothing();
            } */
            isLadder = false;
            this.player.speedX = 200;
      }

      if (!this.player.body.onFloor() && this.player.body.velocity.y > 0 && !isLadder) {
         isFalling = true;
      } else {
         isFalling = false;
      }
      if (this.player.body.onFloor()) {
        facing = shootFacing;
      }

      this.activateEnemies();

  },


  checkKeys: function() {

    //Tastaturereignisse abfragen und entsprechende Funktion aufrufen
      
       if (this.cursors.right.isDown) {
          this.player.goRight();
       }
       else if (this.cursors.left.isDown) {
          this.player.goLeft();
       }
             
       else if (this.cursors.up.isDown) {
          if (this.player.body.onFloor()) { 
            this.player.doNothing();
          }
          if (isLadder) {
            this.player.climbUp();
          } else {
            this.player.doNothing();
          }
       } 

       else if (this.cursors.down.isDown) { 
          if (this.player.body.onFloor()) {
              this.player.crouch();
          }
          if (isLadder) {
              this.player.climbDown();
          } else if (isFalling) {
              this.player.doNothing();
          }
       } 
     
       if (!(this.cursors.up.isDown || this.cursors.down.isDown || this.cursors.right.isDown || this.cursors.left.isDown)) {
          this.player.doNothing();
       }

       if (this.spacebar.isDown) {
          if (hasWeapon) {
              isShooting = true;
              if (shootFacing == 'right') {
                  if (!this.player.justShot) {
                      if (this.game.time.now > bulletTime)
                      {
                      this.player.shootRight(); 
                      //  Grab the first bullet we can from the pool
                      bullet = this.bullets.getFirstExists(false);

                        if (bullet)
                        {
                          //  And fire it
                          bullet.reset(this.player.x+84, this.player.y + 10);
                          bullet.body.velocity.x = this.currentTeddyProjectile.speed;
                          bulletTime = this.game.time.now + 200;
                        }
                      }
                  }
              } else if (shootFacing == 'left') {
                  if (!this.player.justShot) {
                     if (this.game.time.now > bulletTime) {
                       this.player.shootLeft();
                      //  Grab the first bullet we can from the pool
                        bullet = this.bullets.getFirstExists(false);

                        if (bullet)
                        {
                          //  And fire it
                          bullet.reset(this.player.x-84, this.player.y + 10);
                          bullet.body.velocity.x = -this.currentTeddyProjectile.speed;
                          bulletTime = this.game.time.now + 200;
                        }
                      }
                  }
              }
          } 
        }
       else {
          this.player.justShot = false;
          if (firstTimeShooting) {
            this.game.time.events.add(Phaser.Timer.SECOND * 1.5, this.stopShooting, this);
            firstTimeShooting = false;
          }
       }

       if (this.ctrl.isDown) {
          this.player.jump();
       }


  },  

  stopShooting: function() {
          isShooting = false;
          firstTimeShooting = true;
  },

  loadTeddyBullets: function(p) {

      this.currentTeddyProjectile = p;

      this.bullets = this.game.add.group();
      this.bullets.enableBody = true;
      this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
      this.bullets.createMultiple(30, p.getSprite());
      this.bullets.setAll('scale.x', p.scale.x);
      this.bullets.setAll('scale.y', p.scale.y);
      this.bullets.setAll('anchor.x', 0.5);
      this.bullets.setAll('anchor.y', 1);
      this.bullets.setAll('outOfBoundsKill', true);
      this.bullets.setAll('checkWorldBounds', true);
  },


  addEnemies: function() {

      // Create enemies
      this.deathplant1 = new Deathplant(this.game, 700,1000, this.p3, 'down', 1000);
      this.deathplant2 = new Deathplant(this.game, 900,1000, this.p3, 'up', 500);   
//      this.deathplant3 = new Deathplant(this.game, 1200,200, this.p3, 'up', 1000);
      //this.deathplant4 = new Deathplant(this.game, 1400,200, this.p3, 'down', 200);

      this.creep1 = new Creep(this.game, 600,1000, this.p3, 'left', 3, 500, 30);  
                                      //Parameter: Projektil, Ausrichtung, PatrolTime (Zeit bis zum Wechseln der Laufrichtung), Schussgeschwindigkeit, Leben

      this.dog1 = new Dog(this.game, 800,1000, 'left', 1, 500, 10);
                                    //Parameter: Ausrichtung, PatrolTime, Laufgeschwindigkeit, Leben

      this.squatch1 = new Squatch(this.game, 300,1000, this.p3, 'right', 2000, 40);
                                    //Parameter: Projektil, Ausrichtung, Schussgeschwindigkeit, Leben

      this.boss = new Boss(this.game, 900, 1000, this.p3, 2000, 400);

      // Add enemies to game
      this.game.add.existing(this.deathplant1);   
      this.game.add.existing(this.deathplant2);   
   //   this.game.add.existing(this.deathplant3);   
   //   this.game.add.existing(this.deathplant4);   
      this.game.add.existing(this.creep1);   
      this.game.add.existing(this.dog1);   
      this.game.add.existing(this.squatch1);   
      this.game.add.existing(this.boss);   

      // Put all enemies in array for collision-check in update method
      this.enemies = []; 
      this.enemies.push(this.deathplant1);
      this.enemies.push(this.deathplant2);
   //   this.enemies.push(this.deathplant3);
   //   this.enemies.push(this.deathplant4);
      this.enemies.push(this.creep1);
      this.enemies.push(this.dog1);
      this.enemies.push(this.squatch1);
      this.enemies.push(this.boss);


      // Create stars
      this.star1 = new Starsmall(this.game, 500, 1000);
      this.star2 = new Starsmall(this.game, 550, 700);
      this.star3 = new Starsmall(this.game, 600, 700);
      this.star4 = new Starsmall(this.game, 650, 700);
      this.starBig1 = new Starbig(this.game, 700, 600);

      // Add stars to game
      this.game.add.existing(this.star1); 
      this.game.add.existing(this.star2); 
      this.game.add.existing(this.star3); 
      this.game.add.existing(this.star4); 
      this.game.add.existing(this.starBig1); 
  },

  activateEnemies: function() {
   // this.deathplant1.shootRight(this.deathplantBullets,this.p3);
  }

};