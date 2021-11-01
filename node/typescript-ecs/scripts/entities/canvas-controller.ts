import { DrawableComponent } from '../components/drawable-component';
import { Entity } from './entity';

export class CanvasController extends Entity {
    constructor() {
        super();
        this.addComponent(new CanvasComponent(this));
    }
}

class CanvasComponent extends DrawableComponent {
    protected tick(): void {
        this.getRenderContext().clearRect(0, 0, 800, 600);
    }
}
