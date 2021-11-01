import { Component } from './component';
import { Entity } from '../entities/entity';

export class LocationComponent extends Component {
    private x: number;
    private y: number;

    constructor(parent: Entity, x?: number, y?: number) {
        super(parent);
        this.x = x ?? 0;
        this.y = y ?? 0;
    }

    public getLocation(): { x: number; y: number } {
        return { x: this.x, y: this.y };
    }

    public updateLocation(location: { x?: number; y?: number }) {
        this.x = location.x ?? this.x;
        this.y = location.y ?? this.y;
    }
}
