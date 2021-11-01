import { Entity } from "./game.ts";

export interface Asset {
  imgUrl: string;
  imgLoaded: boolean;
  img?: HTMLImageElement;
  frameSize: number;
}

export class AssetLoader {
  public assets: Map<string, Asset> = new Map();
  public audioAssets: Map<string, HTMLAudioElement> = new Map();

  loadAssets(cb: Function): void {
    this.init();
    for (const asset of this.assets.values()) {
      // Canvas needs images in this format in order to paint them and ensure they are loaded
      const image = new Image();
      image.src = asset.imgUrl;
      image.onload = () => {
        asset.imgLoaded = true;
        if (this.loadComplete()) {
          // Callback for our canvas start function
          cb();
        }
      };
      asset.img = image;
    }
  }

  init(): void {
    this.assets.set(Entity.Player, {
      imgUrl: "/assets/toucan.png",
      imgLoaded: false,
      frameSize: 75,
    });
    this.assets.set(Entity.Enemy, {
      imgUrl: "/assets/bird.png",
      imgLoaded: false,
      frameSize: 75,
    });
    this.assets.set(Entity.Obstacle, {
      imgUrl: "/assets/obstacle.png",
      imgLoaded: false,
      frameSize: 90,
    });

    this.assets.set("cloud", {
      imgUrl: "/assets/cloud.png",
      imgLoaded: false,
      frameSize: 120,
    });
    this.assets.set("ground", {
      imgUrl: "/assets/ground.png",
      imgLoaded: false,
      frameSize: 30,
    });
    this.audioAssets.set(
      "dash",
      <HTMLAudioElement>document.getElementById("adash")
    );
    this.audioAssets.set(
      "pickup",
      <HTMLAudioElement>document.getElementById("apickup")
    );
    this.audioAssets.set(
      "game",
      <HTMLAudioElement>document.getElementById("agame")
    );
  }

  loadComplete(): boolean {
    for (const asset of this.assets.values()) {
      if (!asset.imgLoaded) {
        return false;
      }
    }
    return true;
  }
}
