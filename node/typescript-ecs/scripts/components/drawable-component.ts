import { Component } from './component';
import { Entity } from '../entities/entity';
import { LocationComponent } from './location-component';
import { RenderContext } from '../render-context';

export class DrawableComponent extends Component {
    private color: string;

    constructor(parent: Entity, color?: string) {
        super(parent);
        this.setTickrate(RenderContext.framerate);
        this.color = color ?? 'black';
    }

    protected tick() {
        const context = this.getRenderContext();
        const location = this.parent
            .getComponent<LocationComponent>(LocationComponent)
            .getLocation();
        context.fillStyle = this.color;
        context.beginPath();
        context.fillRect(location.x, location.y, 20, 20);
        context.stroke();
    }

    protected getRenderContext(): CanvasRenderingContext2D {
        return RenderContext.getInstance().context;
    }
}
