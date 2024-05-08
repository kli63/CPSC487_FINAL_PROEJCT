import { Vector3 } from "three";
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise();

export function noiseStarPosition(config) {
    let angle = Math.random() * 2 * Math.PI;
    let radius = simplex.noise2D(Math.random() * config.radiusXSpread, Math.random() * config.radiusYSpread) * config.radiusScale;
    let height = simplex.noise2D(Math.random() * config.heightXSpread, Math.random() * config.heightYSpread) * config.heightScale / 2;

    let x = Math.cos(angle) * radius;
    let y = Math.sin(angle) * radius;
    let z = height;

    return new Vector3(x, y, z);
}

export function gaussianRandom(mean = 0, stdev = 1) {
    let u = 1 - Math.random();
    let v = Math.random();
    let z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

    return z * stdev + mean;
}

export function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
}

export function spiral(x, y, z, offset, config) {
    let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    let theta = offset;
    theta += x > 0 ? Math.atan(y / x) : Math.atan(y / x) + Math.PI;
    theta += (r / config.armXDist) * config.spiral;
    return new Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
}
