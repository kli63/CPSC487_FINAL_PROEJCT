import * as THREE from 'three'
import { BASE_LAYER} from '../config/renderSettings.js'
import { clamp } from '../utils/utils_procedural.js'
import { CloudSettings} from "../config/cloudSettings.js";


const cloudTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/kli63/CPSC487_FINAL_PROJECT/main/assets/cloud.png')

export class Cloud {
    constructor(star1, star2, config) {
        this.config = config;
        this.star1 = star1;
        this.star2 = star2;
        this.obj = null
    }
    
    getCloudColor()
    {
        return this.config.cloudShades[Math.floor(Math.random() * this.config.cloudShades.length)];
    }

    createCloudMaterial() {
        return new THREE.SpriteMaterial({
            map: cloudTexture,
            color: this.getCloudColor(),
            opacity: this.config.cloudOpacity,
        })
    }

    updateScale(camera) {
        let dist = this.star1.position.distanceTo(camera.position) / 250
        this.obj.material.opacity = clamp(this.config.cloudOpacity * Math.pow(dist / 2.5, 2), 0, this.config.cloudOpacity * 0.3)
        this.obj.material.needsUpdate = true
    }

    updatePosition() {
        this.obj.position.lerpVectors(this.star1.obj.position, this.star2.obj.position, 0.5);
    }

    toThreeObject(scene) {
        let sprite = new THREE.Sprite(this.createCloudMaterial())
        sprite.layers.set(BASE_LAYER)
        sprite.position.lerpVectors(this.star1.obj.position, this.star2.obj.position, 0.5);

        sprite.scale.multiplyScalar(clamp(this.config.cloudMaxSize * Math.random(), this.config.cloudMinSize, this.config.cloudMaxSize))

        this.obj = sprite
        scene.add(sprite)
    }
}
