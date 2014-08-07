var game = new Phaser.Game(1000, 500, Phaser.AUTO, 'starGame');

// Game States
game.state.add('boot', Boot);
game.state.add('menu', Menu);
game.state.add('play', Play);
game.state.add('preload', Preload);


game.state.start('boot');