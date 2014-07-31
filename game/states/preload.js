 'use strict';
  function Preload() {
  }

  Preload.prototype = {

    preload: function() {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      // Load tilemaps, images, fonts, etc
      this.game.load.tilemap('map', 'assets/map.json', null, Phaser.Tilemap.TILED_JSON);
      this.load.image('test_tiles', "assets/test_tiles.png");
      this.load.image('teddy', "assets/sprite.png");
      this.game.load.spritesheet("teddy", "assets/teddy_100x100.png", 100,100,1);

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