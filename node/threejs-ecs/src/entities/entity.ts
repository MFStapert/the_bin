import { Game } from '../game';

export abstract class Component {
    protected lastTick = 0;
    private tickrate = Game.tickrate;
    protected parent: Entity;

    constructor(parent: Entity) {
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

export abstract class Entity {
    private components: Component[] = [];

    public update(timePassed: number): void {
        this.components.forEach((e) => e.update(timePassed));
    }

    public getComponent<T extends Component>(
        componentType: typeof Component
    ): T {
        const component = this.components.find(
            (e) => e instanceof componentType
        );
        if (!component) {
            throw Error(`Componenttype ${componentType} not found`);
        }
        return component as T;
    }

    public addComponent(...entity: Component[]): void {
        this.components.push(...entity);
    }
}
