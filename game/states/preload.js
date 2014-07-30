 'use strict';
  function Preload() {
  }

  Preload.prototype = {

    preload: function() {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

      // Load tilemaps, images, fonts, etc

    },

    create: function() {
      // this.asset.cropEnabled = false;
    },

    update: function() {
    },

    onLoadComplete: function() {
        this.game.state.start('menu');
    }

  };