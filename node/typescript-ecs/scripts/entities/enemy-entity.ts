import { Component } from '../components/component';
import { DrawableComponent } from '../components/drawable-component';
import { LocationComponent } from '../components/location-component';
import { Entity } from './entity';

export class Enemy extends Entity {
    constructor() {
        super();
        this.addComponent(
            new LocationComponent(this),
            new DrawableComponent(this),
            new EnemyComponent(this)
        );
    }
}

class EnemyComponent extends Component {
    protected tick(): void {
        // this.parent
        //     .getComponent<LocationComponent>(LocationComponent)
        //     .updateLocation({
        //         x: Math.random() * 800,
        //         y: Math.random() * 600
        //     });
    }
}
