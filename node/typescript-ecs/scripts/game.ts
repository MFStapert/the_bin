import { CanvasController } from './entities/canvas-controller';
import { Entity } from './entities/entity';
import { Player } from './entities/player-entity';

export class Game {
    private static instance: Game;
    public static tickrate = 24;
    private entities: Entity[] = [];
    private timePassed = 0;

    constructor() {
        this.entities.push(new CanvasController(), new Player());
    }

    public static getInstance(): Game {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return this.instance;
    }

    public update(): void {
        this.timePassed++;
        this.entities.forEach((e) => e.update(this.timePassed));
    }
}
