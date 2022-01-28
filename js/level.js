class Level {
  constructor(scene) {
    this.scene = scene;
  }
  create() {
    let level = [
      'W                                      W',
      'W                                      W',
      'W                                      W',
      'W                                      W',
      'W                 C                    W',
      'W         C       S                  C W',
      'W       S W          W       S       S W',
      'W     C   W    W    CW   C             W',
      'WWWWWWWWWWW    W    WWWWWWWWWW   WWWWWWW',
    ];
    for (var i = 0; i < level.length; i++) {
      for (var j = 0; j < level[i].length; j++) {
        if (level[i][j] == 'W') {
          let wall = this.scene.physics.add.sprite(12 + 25 * j, 12 + 25 * i, 'brick');
          wall.body.immovable = true;
          wall.scale = 0.1;
          this.scene.walls.add(wall);
        }
        if (level[i][j] == 'C') {
          let coin = this.scene.physics.add.sprite(12 + 25 * j, 12 + 25 * i, 'coin');
          coin.body.immovable = true;
          coin.scale = 0.1;
          this.scene.coins.add(coin);
        }
        if (level[i][j] == 'S') {
          let skull = this.scene.physics.add.sprite(12 + 25 * j, 12 + 25 * i, 'skull');
          skull.body.immovable = true;
          skull.scale = 0.04;
          this.scene.skulls.add(skull);
        }
      }
    }
  }
}

export default Level;
