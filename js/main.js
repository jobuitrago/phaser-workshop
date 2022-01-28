import Level from './level.js';

class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
    this.velocity = 5;
    this.rotationAngle = 20;
    this.score = 0;
  }
  preload() {
    this.load.image('bg', 'assets/bg.png');
    this.load.image('ball', 'assets/ball.png');
    this.load.image('brick', 'assets/brick.png');
    this.load.image('coin', 'assets/coin.png');
    this.load.image('skull', 'assets/skull.png');
  }
  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.background = this.add.image(300, 260, 'bg');
    this.scoreText = this.add.text(30, 0, 'Score: ' + this.score, {
      font: '24px Courier',
      fill: '#acacac',
    });
    this.walls = this.add.group();
    this.coins = this.add.group();
    this.skulls = this.add.group();
    this.ball = this.physics.add.sprite(40, 0, 'ball');
    this.ball.body.gravity.y = 1000;
    this.ball.body.maxVelocity.y = 500;
    this.ball.scale = 0.025;
    this.level = new Level(this);
    this.level.create();
  }
  update() {
    this.physics.add.collider(this.ball, this.walls);
    this.physics.add.overlap(this.ball, this.coins, this.takeCoin, null, this);
    this.physics.add.overlap(this.ball, this.skulls, this.restart, null, this);

    if (this.cursors.left.isDown) {
      this.ball.setVelocityX(-300);
      this.ball.angle -= this.rotationAngle;
    } else if (this.cursors.right.isDown) {
      this.ball.setVelocityX(300);
      this.ball.angle += this.rotationAngle;
    } else {
      this.ball.setVelocityX(0);
    }

    if (this.cursors.up.isDown && this.ball.body.touching.down) {
      this.ball.setVelocityY(-350);
    }
  }
  restart() {
    this.score = 0;
    this.scene.restart();
  }
  takeCoin(ball, coin) {
    this.score += 1;
    this.scoreText.setText('Score: ' + this.score);
    coin.destroy();
    if (this.coins.getLength() === 0) {
      this.score = 0;
      this.scene.restart();
      alert('Buen trabajo :)');
    }
  }
}

const game = new Phaser.Game({
  width: 1000,
  height: 224,
  physics: {
    default: 'arcade',
  },
  scene: [MainScene],
});
