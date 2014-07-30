'use strict';
  function Menu() {}

  Menu.prototype = {
    preload: function() {

    },
    create: function() {
       // add the background sprite
      this.background = this.game.add.sprite(0, 0, 'background');

      // add the ground sprite as a tile

      /** STEP 1 **/
      // create a group to put the title assets in 
      // so they can be manipulated as a whole

      /** STEP 2 **/
      // create the title sprite
      // and add it to the group

      /** STEP 3 **/
      // create the bird sprite 
      // and add it to the title group

      /** STEP 4 **/
      // add an animation to the bird
      // and begin the animation

      /** STEP 5 **/
      // Set the originating location of the group

      /** STEP 6 **/
      // create an oscillating animation tween for the group

      //A start button

    },
    
    update: function() {
    },

    startClick: function() {  
      this.game.state.start('play');
    }
  };
