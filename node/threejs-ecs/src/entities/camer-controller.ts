import { Entity, Component } from './entity';
import { PerspectiveCamera, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WorldComponent } from './world';

export class CameraController extends Component {
    private camera: PerspectiveCamera;
    private renderer: WebGLRenderer;

    constructor(
        parent: Entity,
        camera: PerspectiveCamera,
        renderer: WebGLRenderer
    ) {
        super(parent);
        this.camera = camera;
        camera.position.x = 0;
        camera.position.y = WorldComponent.worldSize;
        camera.position.z = WorldComponent.worldSize * 1.5;

        this.renderer = renderer;

        this.setControls(camera, renderer);

        window.addEventListener(
            'resize',
            this.onWindowResize.bind(this),
            false
        );
    }

    private setControls(
        camera: PerspectiveCamera,
        renderer: WebGLRenderer
    ): void {
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enabled = true;
        controls.minDistance = 700;
        controls.maxDistance = 3500;
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
