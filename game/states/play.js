'use strict';



function Play() {
}

Play.prototype = {

  preload: function() {
   
  },

  create: function() {

      this.tilemap = this.game.add.tilemap('level1');
      this.tilemap.addTilesetImage("tileset");
      //this.tilemap.setCollisionBetween(0,3000);

      //this.tilemap.setTileIndexCallback(8, this.hitFinishingLine, this);
      this.layer = this.tilemap.createLayer('tilelayer1');
      this.layer.resizeWorld();

      this.tilemap.setCollisionByExclusion([7],true);

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

  },


  checkKeys: function() {

    //Tastaturereignisse abfragen und ensprechende Funktion aufrufen
   
      
       if (this.cursors.up.isDown) {

       } 
       if (this.cursors.down.isDown) {
          this.player.crouch();
       }
       if (this.cursors.left.isDown) {
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


  }
   // this.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);
   // this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


};