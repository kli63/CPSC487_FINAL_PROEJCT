import * as THREE from 'three';
import { BLOOM_LAYER } from '../config/renderSettings.js';
import { clamp } from '../utils/utils_procedural.js';

const texture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/kli63/CPSC487_FINAL_PROJECT/main/assets/star.png');

export class Star {
    constructor(position, config, baseSpeed) {
        this.config = config;
        this.materials = this.config.colors.map((color) => new THREE.SpriteMaterial({ map: texture, color }));
        this.position = position;
        this.starType = this.generateStarType();
        this.rotationSpeed = this.calculateRotationSpeed(baseSpeed);
        this.orbitalAxis = this.calculateCircularAxis();
        this.selfAxis = new THREE.Vector3(0, 1, 0); // Typically stars will rotate around their 'up' axis
        this.obj = null;
        this.selfRotationSpeed = 0.5;
    }

    generateStarType() {
        let num = Math.random() * 100.0;
        let pct = this.config.percentages;
        for (let i = 0; i < pct.length; i++) {
            num -= pct[i];
            if (num < 0) {
                return i;
            }
        }
        return 0;
    }

    calculateCircularAxis() {
        let z = Math.random() * (1.1 - 0.90) + 0.90;
        return new THREE.Vector3(0, 0, z);
    }
    calculateIndividualAxis() {
        let x = Math.random() * (1.1 - 0.90) + 0.90;
        let y = Math.random() * (1.1 - 0.90) + 0.90;
        let z = Math.random() * (1.1 - 0.90) + 0.90;
        return new THREE.Vector3(x, y, z);
    }

    calculateRotationSpeed(baseSpeed) {
        const randomFactor = 0.8 + Math.random() * 0.4;
        const distanceFromCenter = this.position.length();
        return Math.max(baseSpeed / distanceFromCenter, 0.001) * randomFactor;
    }

    updateScale(camera) {
        let dist = this.position.distanceTo(camera.position) / 250;
        let starSize = dist * this.config.sizes[this.starType];
        starSize = clamp(starSize, this.config.starMinSize, this.config.starMaxSize);
        this.obj?.scale.set(starSize, starSize, starSize);
    }

    updateRotation() {
        // Update orbital rotation
        const orbitalQuaternion = new THREE.Quaternion().setFromAxisAngle(this.orbitalAxis, this.rotationSpeed);
        this.position.applyQuaternion(orbitalQuaternion);

        // Update self-rotation
        if (this.obj) {
            const selfRotationQuaternion = new THREE.Quaternion().setFromAxisAngle(this.selfAxis, this.selfRotationSpeed);
            this.obj.quaternion.multiply(selfRotationQuaternion);
        }

        this.obj.position.copy(this.position);
    }

    toThreeObject(scene) {
        let sprite = new THREE.Sprite(this.materials[this.starType]);
        sprite.layers.set(BLOOM_LAYER);
        sprite.scale.multiplyScalar(this.config.sizes[this.starType]);
        sprite.position.copy(this.position);
        this.obj = sprite;
        scene.add(sprite);
    }
}
