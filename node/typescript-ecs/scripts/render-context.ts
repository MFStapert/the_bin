export class RenderContext {
    public static instance: RenderContext;
    public static framerate = 60;
    public context: CanvasRenderingContext2D;

    constructor() {
        this.context = (document.getElementById(
            'canvas'
        ) as HTMLCanvasElement).getContext('2d')!;
    }

    static getInstance(): RenderContext {
        if (!RenderContext.instance) {
            RenderContext.instance = new RenderContext();
        }
        return this.instance;
    }
}
