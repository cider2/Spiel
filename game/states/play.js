'use strict';



function Play() {
}

Play.prototype = {

  preload: function() {
   
  },

  create: function() {

      this.tilemap = this.game.add.tilemap('map');
      this.tilemap.addTilesetImage("test_tiles");
      this.tilemap.setCollision([1,2,3],true,0);
      this.tilemap.setCollision(3);
      //this.tilemap.setTileIndexCallback(8, this.hitFinishingLine, this);
      this.layer = this.tilemap.createLayer('tilelayer1');
      this.layer.resizeWorld();


      this.game.physics.startSystem(Phaser.Physics.P2JS);
      this.game.physics.enable(this, Phaser.Physics.P2JS);
      this.game.physics.p2.gravity.y = 500;

      


  	  this.player = new Teddy(this.game, 0,0);
      this.game.physics.enable(this.player, Phaser.Physics.P2JS);
      this.game.add.existing(this.player);      
      this.game.camera.follow(this.player);
       this.game.camera.deadzone = new Phaser.Rectangle(500,400,1,1);
      //this.player.anchor.setTo(1.6, 0.45);

      this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.worldCollisionGroup = this.game.physics.p2.createCollisionGroup();

      //this.player.setCollisionGroup(this.worldCollisionGroup);
      //this.player.body.setCollisionGroup(this.playerCollisionGroup);


//      this.game.physics.enable(Teddy, Phaser.Physics.ARCADE);

      this.cursors = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  },

  update: function() {
     // this.game.physics.p2.collide(this.playerCollisionGroup,this.worldCollisionGroup);
      this.checkKeys();


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