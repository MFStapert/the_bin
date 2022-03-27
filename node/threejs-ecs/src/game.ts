import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { World } from './entities/world';
import { Entity } from './entities/entity';
import { Skybox } from './entities/skybox';
import { Player } from './entities/player';

export class Game {
    private renderer: WebGLRenderer;
    private camera: PerspectiveCamera;
    private scene: Scene;
    private entities: Entity[] = [];

    public static tickrate = 1000;
    private timePassed = 0;

    constructor() {
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            45,
            30000
        );

        this.scene = new Scene();
        new Skybox(this.scene);

        const world = new World(this.scene);
        const player = new Player(this.scene, this.camera, this.renderer);
        this.entities.push(world, player);

        this.update();
    }

    public update() {
        requestAnimationFrame(() => {
            // Not sure if this is a smart way to go about keeping track of  time
            // it might be better to do this in a seperate loop
            this.timePassed++;
            this.entities.forEach((e) => e.update(this.timePassed));
            this.renderer.render(this.scene, this.camera);
            this.update();
        });
    }
}
