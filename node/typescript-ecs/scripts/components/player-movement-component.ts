import { Component } from './component';
import { Player } from '../entities/player-entity';
import { LocationComponent } from './location-component';

export class PlayerMovementComponent extends Component {
    private movespeed = 3;

    constructor(parent: Player) {
        super(parent);
        document.onkeydown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                case 'ArrowDown':
                case 'ArrowRight':
                case 'ArrowLeft':
                    console.log('a');
                    this.move(event.key);
                    break;
            }
        };
    }

    public move(
        direction: 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft'
    ): void {
        let locationComponent = this.parent.getComponent<LocationComponent>(
            LocationComponent
        );
        switch (direction) {
            case 'ArrowUp':
                locationComponent.updateLocation({
                    y: locationComponent.getLocation().y - this.movespeed
                });
                break;
            case 'ArrowDown':
                locationComponent.updateLocation({
                    y: locationComponent.getLocation().y + this.movespeed
                });
                break;
            case 'ArrowRight':
                locationComponent.updateLocation({
                    x: locationComponent.getLocation().x + this.movespeed
                });
                break;
            case 'ArrowLeft':
                locationComponent.updateLocation({
                    x: locationComponent.getLocation().x - this.movespeed
                });
                break;
        }
    }
}
