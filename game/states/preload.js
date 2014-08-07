 'use strict';
  function Preload() {
  }

  Preload.prototype = {

    preload: function() {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      // Load tilemaps, images, fonts, etc
      this.game.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('tutorial', 'assets/tutorial.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('laddermap', 'assets/laddertest.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.image('tileset', "assets/tileset.png");
      this.load.image('projectile1', "assets/projectile_1.png");
      this.load.image('projectile2', "assets/projectile_2.png");
      this.load.image('projectile3', "assets/projectile_3.png");
      this.game.load.spritesheet("teddy", "assets/spritesheet_v10.png", 100,100);
      this.game.load.spritesheet("explosions", "assets/spritesheet_explosionen_edit.png", 64,64);
      this.game.load.spritesheet("deathplant", "assets/deathplant_3.png", 100,100);
      this.game.load.spritesheet("creep", "assets/creep.png", 100,100);
      this.game.load.spritesheet("squatch", "assets/squatch_2.png", 60,60);

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