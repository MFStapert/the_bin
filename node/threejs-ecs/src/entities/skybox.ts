import { Scene } from 'three';
import {
    TextureLoader,
    MeshBasicMaterial,
    BackSide,
    BoxGeometry,
    Mesh,
    AmbientLight
} from 'three';

export class Skybox {
    constructor(scene: Scene) {
        const materialArray = this.createMaterialArray('purplenebula');
        const skyboxGeo = new BoxGeometry(10000, 10000, 10000);
        const skybox = new Mesh(skyboxGeo, materialArray);
        scene.add(skybox);

        const light = new AmbientLight(0x404040);
        scene.add(light);
    }

    private createMaterialArray(filename: string): MeshBasicMaterial[] {
        const skyboxImagepaths = this.createPathStrings(filename);
        const materialArray = skyboxImagepaths.map((image) => {
            let texture = new TextureLoader().load(image);
            return new MeshBasicMaterial({ map: texture, side: BackSide });
        });
        return materialArray;
    }

    private createPathStrings(filename: string): string[] {
        const basePath = `https://raw.githubusercontent.com/codypearce/some-skyboxes/master/skyboxes/${filename}/`;
        const baseFilename = basePath + filename;
        const fileType = filename == 'purplenebula' ? '.png' : '.jpg';
        const sides = ['ft', 'bk', 'up', 'dn', 'rt', 'lf'];
        return sides.map((side) => {
            return baseFilename + '_' + side + fileType;
        });
    }
}
