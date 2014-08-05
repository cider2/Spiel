'use strict';

var isLadder = false;
var firstTimeLadder = true;

function Play() {
}


Play.prototype = {

  preload: function() {
   
  },

  create: function() {

      this.tilemap = this.game.add.tilemap('level1');
      //this.tilemap.addTilesetImage("tileset");
      //this.tilemap = this.game.add.tilemap('laddermap');
      this.tilemap.addTilesetImage("tileset");
      //this.tilemap.setCollision([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,619]);

      //this.laddermap = this.game.add.tilemap('laddermap');
      //this.laddermap.addTilesetImage("test_tileset");

      //this.tilemap.setTileIndexCallback(8, this.hitFinishingLine, this);
      this.layer = this.tilemap.createLayer('tilelayer1');
      this.ladderLayer = this.tilemap.createLayer('ladderlayer');
      this.layer.resizeWorld();
      this.ladderLayer.resizeWorld();
      
      


      this.tilemap.setCollisionByExclusion([592,593,619,620,646,647],true,this.layer);

      // P2 stuff
      //this.game.physics.startSystem(Phaser.Physics.P2JS);
      //this.game.physics.enable(this.player, Phaser.Physics.P2JS);
      //this.game.physics.p2.convertTilemap(this.tilemap, this.layer);
      //this.game.physics.p2.setBoundsToWorld(true, true, true, true, false);
      //this.game.physics.p2.gravity.y = 500;

      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.physics.enable(this, Phaser.Physics.ARCADE);
      this.game.physics.arcade.gravity.y = 500;

  	  this.player = new Teddy(this.game, 0,0);
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);
      this.game.camera.deadzone = new Phaser.Rectangle(700,400,1,1);
      //this.player.anchor.setTo(1.6, 0.45);
      this.player.body.fixedRotation = true;


     // this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
     // this.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();

      //this.layer.setCollisionGroup(this.worldCollisionGroup);
     // this.player.body.setCollisionGroup(this.playerCollisionGroup);


    //this.game.physics.enable(Teddy, Phaser.Physics.ARCADE);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },

  update: function() {
      this.game.physics.arcade.collide(this.layer,this.player);
      this.checkKeys();
      if (!this.player.body.onFloor()) {
         this.player.speed = 160;
      }
      else {
        this.player.speed = 200;
      }
      //this.game.physics.arcade.collide(this.ladderLayer,this.player,changeGravity());
      //this.tilemap.currentLayer = this.tilemap.getLayer(this.ladderLayer);
      try { 
        if (  this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 592 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 593 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 619 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 620 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 647 ||
              this.tilemap.getTileWorldXY(this.player.x,this.player.y).index == 647 
           ) {
            this.game.physics.arcade.gravity.y = 0;
          if (firstTimeLadder) {
            // this.player.body.velocity.x = 0;
            firstTimeLadder = false;
          }
            isLadder = true;
         }
      } catch (err) {
            this.game.physics.arcade.gravity.y = 500;
            isLadder = false;
            firstTimeLadder = true;
      }

      //console.log(this.game.physics.arcade.gravity.y);
      //console.log(this.tilemap.getTileWorldXY(this.player.x,this.player.y));
      //console.log(this.tilemap.getTileWorldXY(this.player.x,this.player.y));
      //console.log(this.tilemap.hasTile(1,1),this.ladderLayer);
  },


  checkKeys: function() {

    //Tastaturereignisse abfragen und entsprechende Funktion aufrufen
   
      
       if (this.cursors.up.isDown) {
          if (this.player.body.onFloor()) {
            this.player.body.velocity.x = 0;
          }
          if (isLadder) {
            //this.player.changeVelocity(-100);
            this.player.climbUp();
          }
       } 

       else if (this.cursors.down.isDown) {
          if (this.player.body.onFloor()) {
            this.player.body.velocity.x = 0;
          }
          if (isLadder) {
            this.player.climbDown();
            //this.player.changeVelocity(100);
            //this.player.body.velocity.y = 300;
          } else {
            this.player.crouch();
          }
       } 

       else if (this.cursors.left.isDown) {
          this.player.goLeft();
       }
       else if (this.cursors.right.isDown) {
          this.player.goRight();
       }
       else  {
          this.player.doNothing();
       }
       if (this.spacebar.isDown && this.player.body.onFloor()) {
          this.player.jump()
       }


  },


};