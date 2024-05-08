import * as THREE from 'three';
import { MapControls } from 'three/addons/controls/OrbitControls.js';
import { Galaxy } from './objects/galaxy.js';
import { GalaxySettings } from "./config/galaxySettings.js";
import { setupComposers, runRenderPipeline } from './utils/utils_render.js';
import { setupGalaxyGUI } from './utils/utils_gui.js';
import { globalSettings } from './config/defaultSettings.js';

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio
};

const canvas = document.querySelector('#canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xEBE2DB, 0.00003);

const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 5000000);
camera.position.set(0, 500, 500);
camera.up.set(0, 0, 1);
camera.lookAt(0, 0, 0);

const controls = new MapControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 16384;
controls.maxPolarAngle = (Math.PI / 2.0) - (Math.PI / 360.0);

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    logarithmicDepthBuffer: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(sizes.pixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.5;

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

const gal_config = new GalaxySettings();
let galaxy;

function regenerateGalaxy() {
    galaxy.regenerate();
}

setupComposers(renderer, scene, camera, sizes);
setupGalaxyGUI(gal_config, regenerateGalaxy);

function animate() {
    galaxy = new Galaxy(scene, gal_config);
    requestAnimationFrame(render);
}
function render() {

    controls.update();
    galaxy.updateScale(camera);
    galaxy.rotateStars();
    runRenderPipeline(camera);
    requestAnimationFrame(render);
}

animate();
