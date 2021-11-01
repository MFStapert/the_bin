<style>
main {
  text-align: center;
  padding: 1em;
  max-width: 800px;
  margin: 0 auto;
}

canvas {
  font-family: "Arcade";
  border: 1px solid black;
  display: block;
  width: 800px;
  margin: 120px auto -120px;
}
</style>

<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import { Entity, Game } from './game/game';
	import { Asset, AssetLoader } from './game/asset-loader';

	let canvas;
	let ctx: CanvasRenderingContext2D;
  let assetLoader = new AssetLoader();

	let height = 600;
	let width = 800;
	let frameRate = 60;
  $: menuSize = height * 0.1;

  let timeouts: any[] = [];

  let game: Game;
  // We need 2 ground sprites to create the illusion of moving ground
  let groundSpritesPos = [0, 0];
  let clouds: { x: number; y: number; speed: number; frame: number }[] = [];

  let ticker = 0;
  let animationCycle = 0;

	onMount(async () => {		
    ctx = canvas.getContext('2d')!;
		groundSpritesPos = [0, width];
		// HTML canavas tends to break when all assets aren't loaded at the start
		// So we delegate asset loading and bootstrap our game when loading is complete
		assetLoader.loadAssets(start.bind(this));
  });

	onDestroy(async () => {
		if (timeouts.length > 0) {
			timeouts.forEach(t => clearInterval(t));
		}
	});
  
  function handleKeydown(event: KeyboardEvent) {   
    console.log(event.code) 
    switch(event.code.toLowerCase()) {
      case "space":
        handleInput(game.dash.bind(game));
        break;
      case "arrowdown":
        handleInput(game.down.bind(game));
        break;
      case "arrowup":
        handleInput(game.up.bind(game));
        break;
    }
  }

	function start(): void {
		game = new Game(width, height - menuSize, width * 0.1, assetLoader.audioAssets);
		game.gameLoop = setInterval(game.loop.bind(game), 1000 / 60);
		timeouts.push(game.gameLoop);

		timeouts.push(setInterval(render.bind(this), 1000 / frameRate));
	}

	function render(): void {
		ticker++;
		// Sinus function for updating animationCycle, pulses between 0-2 every second
		// No clue how this actually works
		animationCycle = Math.floor(Math.sin((ticker * 2 * Math.PI) / 60) * (3 / 2) + 3 / 2);
		try {
			// Sequence of this matters, e.g. draw background first or it will overlap other objects
			drawBackground();
			drawClouds();
			drawSplash();
			drawScore();
			drawPlayer();
			drawEntities();
			if (game.started && !game.alive) {
				ctx.fillStyle = 'black';
				ctx.font = '40px Arcade';
				ctx.fillText('GAME OVER', width * 0.3, height / 2);
			}
		} catch (e) {
			timeouts.forEach(t => clearInterval(t));
			console.error(e);
		}
	}

	function drawBackground(): void {
		ctx.clearRect(0, 0, width, height);

		ctx.fillStyle = '#87CEEB';
		ctx.fillRect(0, 0, width, height);

		// Responsible for updating the scrolling ground
		if (game.alive) {
			for (let i = 0; i < groundSpritesPos.length; i++) {
				// Reduce groundsprite position untill it's out of viewport then reset it to default pos
				groundSpritesPos[i] -= 3;
				if (groundSpritesPos[i] * -1 > width) {
					groundSpritesPos[i] = width;
				}
			}
		}
		const ground = assetLoader.assets.get('ground')!;
		ctx.drawImage(ground.img!, groundSpritesPos[0], height - ground.img!.height, ground.img!.width, ground.img!.height);
		ctx.drawImage(ground.img!, groundSpritesPos[1], height - ground.img!.height, ground.img!.width, ground.img!.height);
	}

	function drawClouds(): void {
    if (game.alive) {
      if (clouds.length <= 8) {
        // Random die roll so clouds dont spawn all at once
        if (Math.ceil(Math.random() * 100) > 75) {
          // Bunch of random values that happen to work
          clouds.push({
            x: width,
            y: Math.ceil(Math.random() * 240),
            speed: Math.ceil(Math.random() * 4),
            frame: Math.ceil(Math.random() * 6)
          });
        }
      }
      // Move clouds and remove offscreen clouds
      clouds = clouds
        .map(c => {
          c.x = c.x - c.speed;
          return c;
        })
        .filter(c => c.x > -200);
    }
    clouds.forEach(cloud => drawEntity(Entity.Cloud, cloud.x, cloud.y, cloud.frame));
  }

  function drawSplash(): void {
    if (!game.started) {
      ctx.fillStyle = 'black';
      ctx.font = '24px Arcade';

      ctx.fillText(`Press up and down to fly`, width * 0.15, height * 0.3);
      ctx.fillText(`Press space to dash`, width * 0.2, height / 2);
      ctx.fillText(`through enemies`, width * 0.25, height * 0.6);
    }
  }

  function drawScore(): void {
    ctx.fillStyle = 'white';
    ctx.font = '16px Arcade';
    if (game.highScore > 0) {
      ctx.fillText(`Hi: ${game.highScore.toString()}`, width - 500, 25);
    }
    ctx.fillText(`Score: ${game.score.toString()}`, 50, 25);
  }

  function drawPlayer(): void {
    if (game.alive) {
      if (game.playerDash) {
        drawEntity(Entity.Player, game.posX, game.posY, 4); // 4 is the animation frame for dash (last one)
      } else {
        drawEntity(Entity.Player, game.posX, game.posY, animationCycle);
      }
    } else {
      // Death animation
      game.posY += 8;
      drawEntity(Entity.Player, game.posX, game.posY, 3); // 3 is the animation frame for death
    }
  }

  function drawEntities(): void {
    if (game.started && game.alive) {
      // Array.flat didn't work for some reason so this is a hack to flatten our multidimensional array
      const entities = [].concat.apply([], ...game.waves);
      entities.forEach(o => {
        if (o.type === Entity.Particle) {
          ctx.font = '18px Arcade';
          ctx.fillStyle = '#FFDD00';
          ctx.fillText(`+100`, o.x, o.y + menuSize);
        } else {
          drawEntity(o.type, o.x, o.y, animationCycle);
        }
      });
    }
  }

  function drawEntity(entity: Entity, x: number, y: number, frame: number): void {
    const asset: Asset = assetLoader.assets.get(entity)!;
    ctx.drawImage(
      asset.img!,
      0,
      frame * asset.frameSize,
      asset.img!.width,
      asset.frameSize,
      x,
      y + menuSize,
      asset.img!.width,
      asset.frameSize
    );
  }

  function handleInput(func: Function): void {
    if (!game.started || !game.alive) {
      // Input gets disabled on game over so player doesn't accidentaly restart the game
      if (game.disableInput) {
        game.disableInput = false;
      } else {
        // Reset the game after game over
        game.reset();
      }
    }
    func();
  }
</script>

<svelte:window on:keydown={handleKeydown}/>
<main>
  <canvas bind:this="{canvas}" id="myCanvas" width="{width}" height="{height}">
    No canvas supported
  </canvas>

  <!-- svelte-ignore a11y-media-has-caption -->
  <audio id="adash" src="/assets/dash.wav" type="audio/wav"></audio>
  <!-- svelte-ignore a11y-media-has-caption -->
  <audio id="apickup" src="/assets/pickup.wav" type="audio/wav"></audio>
  <!-- svelte-ignore a11y-media-has-caption -->
  <audio id="agame" src="/assets/game.wav" type="audio/wav"></audio>
</main>
