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
      this.game.load.tilemap('smallMap_1', 'assets/smallMap_1.json', null, Phaser.Tilemap.TILED_JSON);
      this.game.load.tilemap('smallMap_2', 'assets/smallMap_2.json', null, Phaser.Tilemap.TILED_JSON);

      this.load.image('tileset', "assets/tileset.png");
      this.load.image('smallTileset', "assets/smallTileset.png");
      this.load.image('projectile1', "assets/projectile_1.png");
      this.load.image('projectile2', "assets/projectile_2.png");
      this.load.image('projectile3', "assets/projectile_3.png");
      this.load.image('projectile4', "assets/projectile_4.png");
      this.load.image('projectile5', "assets/projectile_5.png");
      this.load.image('projectile6', "assets/projectile_6.png");
      this.game.load.spritesheet("teddy", "assets/spritesheet_v10.png", 100,100);
      this.game.load.spritesheet("explosions", "assets/spritesheet_explosionen_v02.png", 64,64);
      this.game.load.spritesheet("deathplant", "assets/deathplant.png", 100,100);
      this.game.load.spritesheet("creep", "assets/creep.png", 100,100);
      this.game.load.spritesheet("squatch", "assets/squatch.png", 60,60);
      this.game.load.spritesheet("dog", "assets/dog.png", 60,60);
      this.game.load.spritesheet("starSmall", "assets/star_small.png", 32,32);
      this.game.load.spritesheet("starBig", "assets/star_big.png", 64,64);
      this.game.load.spritesheet("boss", "assets/boss.png", 400,400);

    },

    create: function() {
      // this.asset.cropEnabled = false;
    },

    update: function() {
    },

    onLoadComplete: function() {
        this.game.state.start('play_1');
    }

  };