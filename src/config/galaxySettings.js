
import {StarSettings } from './starSettings.js'
import { CloudSettings, DustSettings } from "./cloudSettings.js";

export class GalaxySettings {

    constructor() {
        this.numStars = 5000;
        this.orbitSpeed = 0.1;

        // SPIRAL
        this.thickness = 25;

        this.innerCoreXDist = 25;
        this.innerCoreYDist = 25;

        this.outerCoreXDist = 100;
        this.outerCoreYDist = 100;

        this.innerCoreRadius = 25;
        this.outerCoreRadius = 100

        this.armXDist = 100;
        this.armYDist = 50;
        this.armXMean = 200;
        this.armYMean = 100;

        this.spiral = 3.0
        this.numArms = 2;

        // SIMPLEX
        this.radiusScale = 500;
        this.radiusXSpread = 5;
        this.radiusYSpread = 5;
        this.heightScale = 500;
        this.heightXSpread = 5;
        this.heightYSpread = 5;

        this.hazeRatio = 0.9;
        this.generationMode = 'noise';
        this.uniqueOrbits = true;

        this.starsConfig = new StarSettings();
        this.cloudConfig = new CloudSettings();
        this.dustConfig = new DustSettings();
    }

    setNumStars(num) {
        this.numStars = num;
    }

    setInnerCoreXDist(value) {
        this.innerCoreXDist = value;
    }

    setInnerCoreYDist(value) {
        this.innerCoreYDist = value;
    }

    setOuterCoreXDist(value) {
        this.outerCoreXDist = value;
    }

    setOuterCoreYDist(value) {
        this.outerCoreYDist = value;
    }

    setArmXDist(value) {
        this.armXDist = value;
    }

    setArmYDist(value) {
        this.setArmYDist = value;
    }

    setArmXMean(value) {
        this.armXMean = value;
    }

    setArmYMean(value) {
        this.setArmYMean = value;
    }

    setSpiral(value) {
        this.spiral = value;
    }

    setNumArms(value) {
        this.numArms = value;
    }

    setInnerCoreRadius(value) {
        this.innerCoreRadius = value;
        this.innerCoreXDist = value;
        this.innerCoreYDist = value;
    }

    setOuterCoreRadius(value) {
        this.outerCoreRadius = value;
        this.outerCoreXDist = value;
        this.outerCoreYDist = value;
    }

    setNoiseScale(value) {
        this.noiseScale = value;
    }

    setNoiseSpread(value) {
        this.noiseSpread = value;
    }

}
export class cloudSettings {
    constructor () {
        this.cloudMinSize = 20.0;
        this.cloudMaxSize = 50.0;
        this.cloudOpacity = 0.2;
    }
}
