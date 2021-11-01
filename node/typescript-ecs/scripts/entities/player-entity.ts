import { Component } from '../components/component';
import { DrawableComponent } from '../components/drawable-component';
import { LocationComponent } from '../components/location-component';
import { PlayerMovementComponent } from '../components/player-movement-component';
import { Entity } from './entity';

export class Player extends Entity {
    constructor() {
        super();
        this.addComponent(
            new LocationComponent(this, 400, 300),
            new DrawableComponent(this, 'red'),
            new PlayerComponent(this),
            new PlayerMovementComponent(this)
        );
    }
}

class PlayerComponent extends Component {
    constructor(parent: Player) {
        super(parent);
    }
}
