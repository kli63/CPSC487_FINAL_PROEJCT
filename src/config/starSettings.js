export class StarSettings {
    constructor() {
        this.starMinSize = 0.25;
        this.starMaxSize = 5.0;
        this.percentages = [70, 20, 5, 3, 1.5, 0.5];
        this.colors = [
            0xffdfbf,  // Cooler yellow-white
            0xfff4ea,  // Very pale (almost white) yellow
            0xf8f7ff,  // Hot white
            0xcad7ff,  // Blue white
            0x9bb0ff,  // Hot blue
            0x6b8ff7   // Deep blue
        ];
        this.sizes = [0.7, 0.9, 1.1, 1.3, 1.6, 2.0];
    }
}
