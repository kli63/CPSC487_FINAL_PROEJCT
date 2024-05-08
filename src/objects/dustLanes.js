import { clamp } from '../utils/utils_procedural.js';
import * as THREE from 'three';
import { BASE_LAYER} from '../config/renderSettings.js';

const dustTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/kli63/CPSC487_FINAL_PROJECT/main/assets/cloud.png');



export class DustLanes {
    constructor(star1, star2, config) {
        this.config = config;
        this.star1 = star1;
        this.star2 = star2;
        this.sprites = [];
    }

    createDustMaterial() {
        return new THREE.SpriteMaterial({
            map: dustTexture,
            color: this.config.dustShades[0],
            opacity: this.config.dustOpacity
        });
    }

    initializeDustLanes(scene) {
        for (let i = 0; i < 0; i++) {
            let sprite = new THREE.Sprite(this.createDustMaterial());
            sprite.layers.set(BASE_LAYER);
            sprite.position.lerpVectors(this.star1.obj.position, this.star2.obj.position, i / 3);
            sprite.scale.multiplyScalar(clamp(this.config.dustMax * Math.random(), this.config.dustMinSize, this.config.dustMaxSize));
            this.sprites.push(sprite);
            scene.add(sprite);
        }
    }

    updatePosition() {
        this.sprites.forEach((sprite, index) => {
            sprite.position.lerpVectors(this.star1.obj.position, this.star2.obj.position, index / 1);
        });
    }

    updateScale(camera) {
        this.sprites.forEach(sprite => {
            let dist = sprite.position.distanceTo(camera.position);
            let scale = clamp(dist / 100, this.config.dustMinSize, this.config.dustMaxSize * 0.5);
            sprite.scale.setScalar(scale);
            sprite.material.opacity = clamp(this.config.dustOpacity * 0.5 * (1 - dist / 2000), 0.1, this.config.dustOpacity * 0.5);
            sprite.material.needsUpdate = true;
        });
    }

    toThreeObject(scene) {
        this.initializeDustLanes(scene);
    }
}
