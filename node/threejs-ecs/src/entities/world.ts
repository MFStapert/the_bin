import { Entity, Component } from './entity';
import { MeshBasicMaterial, Scene, TextureLoader } from 'three';
import { SphereGeometry, Mesh } from 'three';

export class World extends Entity {
    constructor(scene: Scene) {
        super();
        this.addComponent(new WorldComponent(this, scene));
    }
}

export class WorldComponent extends Component {
    public static worldSize = 1500;
    private texture =
        'https://blenderartists.org/uploads/default/original/4X/4/e/3/4e31caa0f5acc386e4a504eab2269ebdb47f0307.jpg';

    constructor(parent: World, scene: Scene) {
        super(parent);
        const loader = new TextureLoader();
        loader.load(this.texture, (texture) => {
            const geometry = new SphereGeometry(
                WorldComponent.worldSize,
                64,
                32
            );
            const material = new MeshBasicMaterial({ map: texture });
            const mesh = new Mesh(geometry, material);
            scene.add(mesh);
        });
    }
}
