import * as dat from "https://cdn.skypack.dev/dat.gui";
import { DEFAULT_GALAXY } from '../config/defaultSettings.js';

let gui;
let numStarsController, orbitSpeedController, starMinSizeController, starMaxSizeController, cloudMinSizeController, cloudMaxSizeController,
    cloudOpacityController;


export function setupGalaxyGUI(galaxyConfig, regenerateGalaxy) {
    // Initialize the dat.GUI instance only once
    if (!gui) {
        gui = new dat.GUI();
    }

    // If an existing folder is present, remove its DOM elements manually
    const previousFolder = document.querySelector('.dg .c[title="Galaxy Settings"]');
    if (previousFolder) {
        previousFolder.parentNode.removeChild(previousFolder);
    }

    // Add generation mode selector
    gui.add(galaxyConfig, 'generationMode', {Spiral: 'gaussian', Irregular: 'noise'}).name('Generation Mode').onFinishChange(() => {
        regenerateGalaxy();
        refreshGalaxySettings(galaxyFolder, galaxyConfig, regenerateGalaxy);
    });
     numStarsController = gui.add(galaxyConfig, 'numStars', 1000, 20000).name('Number of Stars').onFinishChange(() => regenerateGalaxy());
     orbitSpeedController = gui.add(galaxyConfig, 'orbitSpeed', 0.01, 1.0).name('Orbit Speed').onFinishChange(() => regenerateGalaxy());
     starMinSizeController = gui.add(galaxyConfig.starsConfig, 'starMinSize', 0.01, 2.5).name('Min Star Size').onFinishChange(() => regenerateGalaxy());
     starMaxSizeController = gui.add(galaxyConfig.starsConfig, 'starMaxSize', 2.5, 10).name('Max Star Size').onFinishChange(() => regenerateGalaxy());
     cloudMinSizeController = gui.add(galaxyConfig.cloudConfig, 'cloudMinSize', 10.0, 30.0).name('Min Cloud Size').onFinishChange(() => regenerateGalaxy());
     cloudMaxSizeController = gui.add(galaxyConfig.cloudConfig, 'cloudMaxSize', 30.0, 100.0).name('Max Cloud Size').onFinishChange(() => regenerateGalaxy());
     cloudOpacityController = gui.add(galaxyConfig.cloudConfig, 'cloudOpacity', 0.0, 1.0).name('Cloud Opacity').onFinishChange(() => regenerateGalaxy());




    // Create a new folder for galaxy settings
    const galaxyFolder = gui.addFolder('Galaxy Settings');


    // Load initial settings
    refreshGalaxySettings(galaxyFolder, galaxyConfig, regenerateGalaxy);
    galaxyFolder.open();
}

function refreshGlobalSettings(regenerateGalaxy)
{
    starMinSizeController.setValue(DEFAULT_GALAXY.starsConfig.starMinSize);
    starMaxSizeController.setValue(DEFAULT_GALAXY.starsConfig.starMaxSize);
    cloudMinSizeController.setValue(DEFAULT_GALAXY.cloudConfig.cloudMinSize);
    cloudMaxSizeController.setValue(DEFAULT_GALAXY.cloudConfig.cloudMaxSize);
    cloudOpacityController.setValue(DEFAULT_GALAXY.cloudConfig.cloudOpacity);


    orbitSpeedController.updateDisplay();
    starMinSizeController.updateDisplay();
    starMaxSizeController.updateDisplay();
    cloudMinSizeController.updateDisplay();
    cloudMaxSizeController.updateDisplay();
    cloudOpacityController.updateDisplay();


    regenerateGalaxy();
}
function refreshGalaxySettings(galaxyFolder, galaxyConfig, regenerateGalaxy) {
    // Remove all current controllers manually
    const controllers = [...galaxyFolder.__controllers];
    controllers.forEach((controller) => galaxyFolder.remove(controller));

    if (galaxyConfig.generationMode === 'noise') {
        // Simplex Noise settings controller
        const radiusScaleController = galaxyFolder.add(galaxyConfig, 'radiusScale', 0, 2000).name('Radius Scale').onFinishChange(() => regenerateGalaxy());
        const radiusXSpreadController = galaxyFolder.add(galaxyConfig, 'radiusXSpread', 0.1, 10).name('Radius X Spread').onFinishChange(() => regenerateGalaxy());
        const radiusYSpreadController = galaxyFolder.add(galaxyConfig, 'radiusYSpread', 0.1, 10).name('Radius Y Spread').onFinishChange(() => regenerateGalaxy());
        const heightScaleController = galaxyFolder.add(galaxyConfig, 'heightScale', 0, 2000).name('Height Scale').onFinishChange(() => regenerateGalaxy());
        const heightXSpreadController = galaxyFolder.add(galaxyConfig, 'heightXSpread', 0.1, 10).name('Height X Spread').onFinishChange(() => regenerateGalaxy());
        const heightYSpreadController = galaxyFolder.add(galaxyConfig, 'heightYSpread', 0.1, 10).name('Height Y Spread').onFinishChange(() => regenerateGalaxy());
        const orbitController = galaxyFolder.add(galaxyConfig, 'uniqueOrbits').name('Unique Orbits').onFinishChange(() => regenerateGalaxy());

        // Add reset functionality
        galaxyFolder.add({
            reset: () => {
                Object.assign(galaxyConfig, DEFAULT_GALAXY);

                radiusScaleController.updateDisplay();
                radiusXSpreadController.updateDisplay();
                radiusYSpreadController.updateDisplay();
                heightScaleController.updateDisplay();
                heightXSpreadController.updateDisplay();
                heightYSpreadController.updateDisplay();
                orbitController.updateDisplay();

                refreshGlobalSettings(regenerateGalaxy);
            }
        }, 'reset').name('Reset Galaxy');
    } else {
        // Gaussian-specific settings
        const thicknessController = galaxyFolder.add(galaxyConfig, 'thickness', 1, 100).name('Thickness').onFinishChange(() => regenerateGalaxy());
        const innerCoreRadiusController = galaxyFolder.add(galaxyConfig, 'innerCoreRadius', 1, 1000).name('Inner Core Radius').onFinishChange(() => {
            galaxyConfig.setInnerCoreRadius(galaxyConfig.innerCoreRadius);
            regenerateGalaxy();
        });
        const outerCoreRadiusController = galaxyFolder.add(galaxyConfig, 'outerCoreRadius', 1, 1000).name('Outer Core Radius').onFinishChange(() => {
            galaxyConfig.setOuterCoreRadius(galaxyConfig.outerCoreRadius);
            regenerateGalaxy();
        });
        const spiralController = galaxyFolder.add(galaxyConfig, 'spiral', 1, 10).name('Spiral Modifier').onFinishChange(() => regenerateGalaxy());
        const numArmsController = galaxyFolder.add(galaxyConfig, 'numArms', 1, 10).name('Spiral Arms').onFinishChange(() => regenerateGalaxy());

        // Add reset functionality
        galaxyFolder.add({
            reset: () => {
                Object.assign(galaxyConfig, DEFAULT_GALAXY);

                galaxyConfig.generationMode = 'gaussian';
                numStarsController.updateDisplay();
                thicknessController.updateDisplay();
                innerCoreRadiusController.updateDisplay();
                outerCoreRadiusController.updateDisplay();
                spiralController.updateDisplay();
                numArmsController.updateDisplay();

                refreshGlobalSettings(regenerateGalaxy);
            }
        }, 'reset').name('Reset Galaxy');
    }
}
