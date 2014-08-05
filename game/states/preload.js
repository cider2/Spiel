 'use strict';
  function Preload() {
  }

  Preload.prototype = {

    preload: function() {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      // Load tilemaps, images, fonts, etc
      this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('tileset', "assets/tileset.png");
      this.load.image('teddy', "assets/sprite.png");
      this.game.load.spritesheet("teddy", "assets/teddy_100x100.png", 100,100,1);

     // this.game.load.tilemap('testmap', 'assets/test-map.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('laddermap', 'assets/laddertest.json', null, Phaser.Tilemap.TILED_JSON);
      //this.load.image('test_tileset', "assets/test_tiles.png");

    },

    create: function() {
      // this.asset.cropEnabled = false;
    },

    update: function() {
    },

    onLoadComplete: function() {
        this.game.state.start('play');
    }

  };