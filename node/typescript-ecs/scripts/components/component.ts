import { Game } from '../game';
import { Entity } from '../entities/entity';

export abstract class Component {
    protected lastTick = 0;
    private tickrate: number;
    protected parent: Entity;

    constructor(parent: Entity) {
        this.tickrate = Game.tickrate;
        this.parent = parent;
    }

    public update(timePassed: number): void {
        if (timePassed - this.lastTick > 1000 / this.tickrate) {
            this.lastTick = timePassed;
            this.tick();
        }
    }

    protected tick(): void {}

    public setTickrate(tickrate: number) {
        this.tickrate = tickrate;
    }
}
