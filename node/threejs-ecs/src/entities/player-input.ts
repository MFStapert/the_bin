import { Entity, Component } from './entity';

export class PlayerInputComponent extends Component {
    private direction: 'left' | 'right' | 'center' = 'center';

    constructor(parent: Entity) {
        super(parent);
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    public getDirection(): 'left' | 'right' | 'center' {
        return this.direction;
    }

    private handleKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowLeft':
                this.direction = 'left';
                break;
            case 'ArrowRight':
                this.direction = 'right';
                break;
        }
    }

    private handleKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case 'ArrowLeft':
                this.direction = 'center';
                break;
            case 'ArrowRight':
                this.direction = 'center';
                break;
        }
    }
}
