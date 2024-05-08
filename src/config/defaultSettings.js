export const globalSettings = {
    animationSpeedMultiplier: 1.0
};

export const DEFAULT_GALAXY = {
    generationMode: 'noise',
    numStars: 5000,
    orbitSpeed : 0.1,

    starsConfig: {
        starMinSize : 0.25,
        starMaxSize : 5.0,
        percentages : [76.45, 12.1, 7.6, 3.0, 0.6, 0.13],
        colors : [0xffcc6f, 0xffd2a1, 0xfff4ea, 0xf8f7ff, 0xcad7ff, 0xaabfff],
        sizes : [0.7, 0.7, 1.15, 1.48, 2.0, 2.5, 3.5]
    },

    cloudConfig: {
        cloudMaxSize : 50.0,
        cloudMinSize : 20.0,
        cloudOpacity : 0.5,
        cloudShades : [
            0xA6A6FF, 0x6CA6FF, 0x0099FF, 0x0077FF, 0x00FFFF, 0x80FFFF, 0xE0FFFF,
            0xA4D3EE, 0x87CEEB, 0x4682B4, 0x708090
        ]
    },

    dustConfig: {
        dustMaxSize : 50.0,
        dustMinSize : 20.0,
        dustOpacity : 0.5,
        cloudShades : [
            0xA6A6FF, 0x6CA6FF, 0x0099FF, 0x0077FF, 0x00FFFF, 0x80FFFF, 0xE0FFFF,
            0xA4D3EE, 0x87CEEB, 0x4682B4, 0x708090
        ]
    },

    // GAUSSIAN
    thickness: 25,
    innerCoreXDist: 25,
    innerCoreYDist: 25,
    outerCoreXDist: 100,
    outerCoreYDist: 100,
    innerCoreRadius: 25,
    outerCoreRadius: 100,
    armXDist: 100,
    armYDist: 50,
    armXMean: 200,
    armYMean: 100,
    spiral: 3.0,
    numArms: 2,
    hazeRatio: 0.9,

    // SIMPLEX
    uniqueOrbits: true,
    radiusScale : 500,
    radiusXSpread : 5,
    radiusYSpread : 5,
    heightScale : 500,
    heightXSpread : 5,
    heightYSpread : 5,


};
