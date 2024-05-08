import * as THREE from 'three';
import { Star } from './star.js';
import { Cloud } from './cloud.js';
import { DustLanes } from './dustLanes.js';
import { gaussianRandom, spiral, noiseStarPosition } from '../utils/utils_procedural.js';

export class Galaxy {
    constructor(scene, config) {
        this.scene = scene;
        this.config = config;
        this.stars = [];
        this.cloud = [];
        this.initialize();
    }

    initialize() {
        this.stars = this.generateStars(this.config.numStars);
        this.cloud = this.generateCloud(this.stars);
        this.dustLanes = this.generateDustLanes(this.stars);

        this.stars.forEach(star => star.toThreeObject(this.scene));
        this.cloud.forEach(cloud => cloud.toThreeObject(this.scene));
        this.dustLanes.forEach(dust => dust.toThreeObject(this.scene));
    }

    updateScale(camera) {
        this.stars.forEach((star) => star.updateScale(camera));
        this.cloud.forEach((cloud) => cloud.updateScale(camera));
        this.dustLanes.forEach((dustLane) => dustLane.updateScale(camera));
    }

    rotateStars() {
        if (this.config.generationMode === 'noise' && this.config.uniqueOrbits) {
            this.stars.forEach((star, index) => {
                star.axis = star.calculateIndividualAxis();
                star.updateRotation();
            });
        } else {
            this.stars.forEach(star => star.updateRotation());
        }

        this.cloud.forEach(cloud => cloud.updatePosition());
        this.dustLanes.forEach(dust => dust.updatePosition());
    }

    regenerate() {
        this.stars.forEach((star) => this.scene.remove(star.obj));
        this.cloud.forEach((cloud) => this.scene.remove(cloud.obj));
        this.initialize();
    }

    generateStars(numStars) {
        if (this.config.generationMode === 'gaussian') {
            return this.generateGaussianStars(numStars);
        } else if (this.config.generationMode === 'noise') {
            return this.generateNoiseStars(numStars);
        }
    }

    generateGaussianStars(numStars) {
        let stars = [];

        for (let i = 0; i < numStars; i++) {
            let pos = new THREE.Vector3(
                gaussianRandom(0, this.config.innerCoreXDist),
                gaussianRandom(0, this.config.innerCoreYDist),
                gaussianRandom(0, this.config.thickness)
            );
            let star = new Star(pos, this.config.starsConfig, this.config.orbitSpeed);
            stars.push(star);
        }

        for (let j = 0; j < this.config.numArms; j++) {
            for (let i = 0; i < numStars / 4; i++) {
                let angleOffset = j * 2 * Math.PI / this.config.numArms;
                let armVariation = Math.random() * 0.5 - 0.25; // Random variation for the arm angle
                let pos = spiral(
                    gaussianRandom(this.config.armXMean, this.config.armXDist),
                    gaussianRandom(this.config.armYMean, this.config.armYDist),
                    gaussianRandom(0, this.config.thickness),
                    angleOffset + armVariation, // Apply random variation to the spiral function
                    this.config
                );
                let star = new Star(pos, this.config.starsConfig, this.config.orbitSpeed);
                stars.push(star);
            }
        }

        return stars;
    }


    generateNoiseStars(numStars) {
        let stars = [];
        const scale = this.config.noiseScale || 1;
        const spread = this.config.noiseSpread || 1;

        for (let i = 0; i < numStars; i++) {
            let pos = noiseStarPosition(this.config);
            let star = new Star(pos, this.config.starsConfig, this.config.orbitSpeed);
            stars.push(star);
        }

        return stars;
    }

    generateCloud(stars) {
        let cloudObjects = [];
        for (let i = 0; i < stars.length - 1; i++) {
            let cloud = new Cloud(stars[i], stars[i + 1], this.config.cloudConfig);
            cloudObjects.push(cloud);
        }
        return cloudObjects;
    }

    generateDustLanes(stars) {
        let dustObjects = [];
        for (let i = 0; i < stars.length - 1; i++) {
            let dust = new DustLanes(stars[i], stars[i + 1], this.config.dustConfig);
            dustObjects.push(dust);
        }
        return dustObjects;
    }
}
