import { Entity, Component } from './entity';
import { Scene, Group } from 'three';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { CameraController } from './camer-controller';
import { PlayerInputComponent } from './player-input';

export class Player extends Entity {
    constructor(
        scene: Scene,
        camera: PerspectiveCamera,
        renderer: WebGLRenderer
    ) {
        super();
        const playerComponent = new PlayerComponent(this, scene);
        const cameraController = new CameraController(this, camera, renderer);
        const playerInputComponent = new PlayerInputComponent(this);
        this.addComponent(
            playerComponent,
            playerInputComponent,
            cameraController
        );
    }
}

// Probably want to split this component more up
class PlayerComponent extends Component {
    private model?: Group;
    private texture = 'assets/rocket/model.fbx';

    constructor(parent: Entity, scene: Scene) {
        super(parent);
        this.loadModel(scene);
    }

    private loadModel(scene: Scene): void {
        const loader = new FBXLoader();
        loader.load(
            this.texture,
            (model) => {
                this.model = model;
                scene.add(model);
                model.position.x = 0;
                model.position.y = 800;
                model.position.z = 1400;
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );
    }

    protected tick(): void {
        const direction = this.parent
            .getComponent<PlayerInputComponent>(PlayerInputComponent)
            .getDirection();

        switch (direction) {
            case 'right':
                this.handleRight();
                break;
            case 'left':
                this.handleLeft();
                break;
            case 'center':
                this.handleCenter();
                break;
        }
    }

    private handleCenter(): void {
        if (this.model) {
            // this.model.position.x -= 10;
            // this.model.position.y -= 10;
            // this.model.position.z = 10;
        }
    }

    private handleRight(): void {
        if (this.model) {
            this.model.position.x += 10;
            this.model.position.y += 10;
            this.model.position.z += 10;
        }
    }

    private handleLeft(): void {
        if (this.model) {
            this.model.position.x -= 10;
            this.model.position.y -= 10;
            this.model.position.z -= 10;
        }
    }
}
