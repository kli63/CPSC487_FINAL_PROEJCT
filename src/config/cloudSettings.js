// export class CloudSettings {
//
//     constructor() {
//         this.cloudMaxSize = 50.0;
//         this.cloudMinSize = 20.0;
//         this.cloudOpacity = 0.5;
//         this.cloudShades = [
//             0xA6A6FF,
//             0x6CA6FF,
//             0x0099FF,
//             0x0077FF,
//             0x00FFFF,
//             0x80FFFF,
//             0xE0FFFF,
//             0xA4D3EE,
//             0x87CEEB,
//             0x4682B4,
//             0x708090
//         ];
//     }
// }

export class CloudSettings {

    constructor() {
        this.cloudMaxSize = 50.0;
        this.cloudMinSize = 20.0;
        this.cloudOpacity = 0.5;
        this.cloudShades = [
            0xA6A6FF,
            0xbeaa98,
            0x7a6d63,
            0x554f4b,
            0x616564,
            0x595a64,
            0xb74544,
            0x919ea0,
            0x848c9f,
            0x4682B4,
            0x708090
        ];
    }
}


export class DustSettings {

    constructor() {
        this.dustMaxSize = 50.0;
        this.dustMinSize = 20.0;
        this.dustOpacity = 0.1;
        this.dustShades = [
            0xA6A6FF, 0x6CA6FF, 0x0099FF, 0x0077FF, 0x00FFFF, 0x80FFFF, 0xE0FFFF,
            0xA4D3EE, 0x87CEEB, 0x4682B4, 0x708090
        ];
    }
}