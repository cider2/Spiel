var game = new Phaser.Game(1200, 800, Phaser.AUTO, 'teddy');

// Game States
game.state.add('boot', Boot);
game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.add('preload', Preload);


game.state.start('boot');