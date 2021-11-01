import { Component } from '../components/component';

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
