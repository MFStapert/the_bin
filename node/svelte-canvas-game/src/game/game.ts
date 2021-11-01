export enum Entity {
  Player = "player",
  Obstacle = "obstacle",
  Enemy = "enemy",
  Cloud = "cloud",
  Particle = "particle",
}

export interface Wave {
  x: number;
  y: number;
  type: Entity;
}

export class Game {
  // Game
  public started = false;
  public score = 0;
  public highScore = 0;

  private gameSpeed = 0;
  // Base accelaration of player used for speed of movement and dashing
  private baseAccelaration = 120;

  private amountOfLanes = 4;
  private laneSize: number;

  // Player
  public alive = true;
  public playerDash = false;

  public posY = 0;
  public posX = 80;

  private flyPosition = 0;
  private velX = 0;

  // Obstacles
  public waves: Wave[][] = [];

  public gameLoop;

  public disableInput = false;

  constructor(
    private width: number,
    private height: number,
    private playerBasePosX: number,
    private audioAssets: Map<string, HTMLAudioElement>
  ) {
    this.laneSize = this.height / this.amountOfLanes;
  }

  reset(): void {
    if (this.score > this.highScore) {
      this.highScore = this.score;
    }
    this.score = 0;
    this.velX = 0;
    this.gameSpeed = 12; // Arbitrary number that happens to work with this update speed
    this.posY = 0;
    this.posX = this.playerBasePosX;
    this.started = true;
    this.alive = true;
    this.playerDash = false;
    this.waves = [];
  }

  loop(): void {
    try {
      if (this.started && this.alive) {
        this.checkCollision();
        if (this.velX > 0) {
          this.velX -= this.baseAccelaration * 0.125;
        }
        if (this.alive) {
          this.score++;
          if (this.score % 100 === 0) {
            this.gameSpeed += 0.2; // Gamespeed go brrrrr
          }
        }
        this.setPos();
      }
    } catch (e) {
      clearInterval(this.gameLoop);
      console.error(e);
    }
  }

  dash(): void {
    if (!this.playerDash && this.alive) {
      this.audioAssets.get("dash")!.play();
      this.velX += this.baseAccelaration * 1.4;
      this.playerDash = true;
    }
  }

  up(): void {
    // Canavas top of Y starts at 0 for no reason
    if (this.flyPosition > 0) {
      this.flyPosition -= this.laneSize;
    }
  }

  down(): void {
    if (
      this.flyPosition < this.height &&
      this.flyPosition + this.laneSize < this.height
    ) {
      this.flyPosition += this.laneSize;
    }
  }

  // Update position of every object in game also spawn new waves
  setPos(): void {
    this.setPlayerPos();
    this.spawnWaves();
    this.waves = this.waves
      .map((wave) =>
        wave
          .map((o) => {
            o.x = o.x - this.gameSpeed;
            return o;
          })
          .filter((o) => o.x > -300)
      )
      .filter((wave) => wave.length !== 0);
  }

  setPlayerPos(): void {
    // Set Y position
    if (this.posY > this.flyPosition) {
      this.posY = this.posY - this.baseAccelaration * 0.4; // Arbitrary number that feels good
      if (this.posY < this.flyPosition) {
        this.posY = this.flyPosition; // Snap player to fly position if he exceeds height
      }
    } else if (this.posY < this.flyPosition) {
      this.posY = this.posY + this.baseAccelaration * 0.4; // Arbitrary number that feels good
      if (this.posY > this.flyPosition) {
        this.posY = this.flyPosition; // Snap player to fly position if he exceeds height
      }
    }
    // Set X position and reset dash when at start position
    const offSetX = this.velX - this.baseAccelaration * 0.5; // Arbitrary number that feels good
    if (this.posX + offSetX < this.playerBasePosX) {
      this.posX = this.playerBasePosX;
      this.playerDash = false;
    } else {
      this.posX = this.posX + offSetX;
    }
  }

  spawnWaves(): void {
    // Start wave spawning after score > 100
    if (this.score > 100) {
      // If no waves or the first wave exceeds a certain threshold
      if (
        this.waves.length === 0 ||
        this.waves[this.waves.length - 1][0].x < this.width - this.laneSize * 8
      ) {
        // Do a die roll in order to determine if we should spawnExtraEnemy or extra Empty Space
        const spawnExtraEnemy = Math.ceil(Math.random() * 100) > 75;
        const spawnEmptySpace = Math.ceil(Math.random() * 100) > 75;

        const wave: Wave[] = [];
        for (let i = 0; i < this.amountOfLanes; i++) {
          // Offset xpos a bit so it doesnt look as generic
          const xOffSet =
            (Math.random() * this.laneSize) / 3 - this.laneSize / 2;
          wave.push({
            x: this.width + xOffSet,
            y: 0 + this.laneSize * i,
            type: Entity.Obstacle,
          });
        }

        // Spawn enemies after score 500
        if (this.score > 500) {
          let enemyIndex = Math.ceil(Math.random() * this.amountOfLanes) - 1;
          wave[enemyIndex] = {
            ...wave[enemyIndex],
            type: Entity.Enemy,
            x: wave[enemyIndex].x + 50,
          };
          if (spawnExtraEnemy) {
            enemyIndex = Math.ceil(Math.random() * this.amountOfLanes) - 1;
            wave[enemyIndex] = {
              ...wave[enemyIndex],
              type: Entity.Enemy,
              x: wave[enemyIndex].x + 50,
            };
          }
        }
        // Chance to spawn an empty wave untill score 3000
        if (spawnEmptySpace && this.score < 3000) {
          wave.splice(Math.ceil(Math.random() * this.amountOfLanes) - 1, 1);
        }
        // Always an empty space untill score 5000
        if (this.score < 5000) {
          wave.splice(Math.ceil(Math.random() * this.amountOfLanes) - 1, 1);
        }
        this.waves.push(wave);
      }
    }
  }

  checkCollision(): void {
    // Hack because Array.flat didnt work
    for (const obstacle of [].concat.apply([], ...this.waves)) {
      // This is a standard box collision function
      // The magic numbers here are based on the sprite size, if you use different sprite sizes you need to change these
      if (
        this.posX < obstacle.x + 50 &&
        this.posX + 136 > obstacle.x &&
        this.posY < obstacle.y + 90 &&
        this.posY + 75 > obstacle.y
      ) {
        if (this.playerDash && obstacle.type === Entity.Enemy) {
          this.audioAssets.get("pickup")!.play();
          obstacle.type = Entity.Particle;
          this.score += 100;
        }
        if (
          obstacle.type === Entity.Enemy ||
          obstacle.type === Entity.Obstacle
        ) {
          this.disableInput = true;
          this.audioAssets.get("game")!.play();
          this.alive = false;
        }
      }
    }
  }
}
