import constants from "~/assets/GeneratorJREastConstants.json";
const images = {
    "ro-ene": require("~/assets/GeneratorJREast/ro-ene.png"),
    "emo-train-kankyo-led": require("~/assets/GeneratorJREast/emo-train-kankyo-led.png"),
    "kankyo-led": require("~/assets/GeneratorJREast/kankyo-led.png"),
    "shin-insha": require("~/assets/GeneratorJREast/shin-insha.png")
};

const getPanelArea = state => {
    const { width, height } = state.housing;
    switch (state.housing.type) {
        case "se-led":
            return {
                x: state.housing.padding,
                y: 80,
                width: width - state.housing.padding * 2,
                height: height - 110
            };
        case "b-fl":
            return {
                x: 30,
                y: 20,
                width: width - 60,
                height: height - 50
            };
        case "non-light":
            return {
                x: 15,
                y: 15,
                width: width - 30,
                height: height - 30
            };
        default:
            return {
                x: 0,
                y: 0,
                width: state.housing.width,
                height: state.housing.height
            };
    }
};

export default function*(state) {
    const {
            housing,
            leftStation1,
            leftStation2,
            rightStation1,
            rightStation2
        } = state,
        panelArea = getPanelArea(state),
        constHousing = constants.housing[housing.type],
        vw = v => panelArea.width * (v / 100),
        vh = v => panelArea.height * (v / 100);

    let light = null;

    // SE型のみ
    if (housing.type === "se-led") {
        // 枠
        yield* [
            {
                type: "rect",
                x: 0,
                y: 0,
                width: housing.width,
                height: housing.height,
                fill: constHousing.frameColor
            },
            {
                type: "path",
                d: [
                    { x: 4, y: housing.height },
                    { y: 4 },
                    { x: housing.width - 4 },
                    { y: housing.height }
                ],
                "stroke-width": 4,
                stroke: constHousing.frameDarkColor
            },
            {
                type: "rect",
                x: 4,
                y: 15,
                width: 1,
                height: 65,
                fill: constHousing.frameColor
            },
            {
                type: "rect",
                x: housing.width - 4,
                y: 15,
                width: 1,
                height: 65,
                fill: constHousing.frameColor
            },
            {
                type: "rect",
                x: 6,
                y: 78,
                width: housing.width - 12,
                height: 2,
                fill: constHousing.frameDarkColor,
                opacity: 0.5
            },
            {
                type: "rect",
                x: 6,
                y: 80,
                width: housing.width - 12,
                height: 2,
                fill: constHousing.frameLightColor,
                opacity: 0.5
            },
            {
                type: "rect",
                x: 6,
                y: housing.height - 32,
                width: housing.width - 12,
                height: 2,
                fill: constHousing.frameDarkColor,
                opacity: 0.5
            },
            {
                type: "rect",
                x: 6,
                y: housing.height - 30,
                width: housing.width - 12,
                height: 2,
                fill: constHousing.frameLightColor,
                opacity: 0.5
            },
            {
                type: "rect",
                x: 10,
                y: housing.height - 10,
                width: housing.width - 20,
                height: 2,
                fill: constHousing.frameDarkColor,
                opacity: 0.3
            },
            {
                type: "rect",
                x: 10,
                y: housing.height - 8,
                width: housing.width - 20,
                height: 2,
                fill: constHousing.frameLightColor,
                opacity: 0.3
            },
            {
                type: "path",
                d: [
                    { x: 10, y: housing.height },
                    { y: housing.height - 15 },
                    { x: housing.width - 10 },
                    { y: housing.height }
                ],
                "stroke-width": 3,
                stroke: constHousing.frameDarkColor,
                opacity: 0.5
            }
        ];

        // 筐体ステッカー
        if (housing.stickers.includes("shin-insha"))
            yield {
                type: "image",
                image: images["shin-insha"],
                x: panelArea.x + panelArea.width - 35,
                y: panelArea.y + panelArea.height + 2,
                height: 10,
                opacity: 0.8
            };
        if (housing.stickers.includes("ro-ene"))
            yield {
                type: "image",
                image: images["ro-ene"],
                x: panelArea.x + panelArea.width - 25,
                y: 8,
                height: 65,
                opacity: 0.8
            };
        if (housing.stickers.includes("kankyo-led")) {
            const emo = housing.stickers.includes("emo-train");
            yield {
                type: "image",
                x: panelArea.x,
                y: 10,
                height: 60,
                image: images[emo ? "emo-train-kankyo-led" : "kankyo-led"],
                opacity: 0.8
            };
        }

        // パネル
        yield {
            type: "rect",
            ...panelArea,
            fill: constHousing.panelBackground
        };
    }
    /*if (housing.type === "se-led") {
        // 枠
        yield {
            type: "rect",
            x: 0,
            y: 0,
            width: housing.width,
            height: housing.height,
            fill: constHousing.frameColor
        };
        yield {
            type: "rect",
            x: 5,
            y: 5,
            width: housing.width - 10,
            height: housing.height - 10,
            "stroke-width": 3,
            stroke: constHousing.frameDarkColor
        };
        yield {
            type: "rect",
            x: 5,
            y: 20,
            width: housing.width - 10,
            height: 60,
            fill: constHousing.frameColor
        };
        yield {
            type: "rect",
            x: 5,
            y: 79,
            width: housing.width - 10,
            height: 6,
            fill: {
                type: "linearGradient",
                from: { x: 0, y: 79 },
                to: { x: 0, y: 85 },
                stops: [
                    {
                        offset: 0.2,
                        color: constHousing.frameDarkColor,
                        opacity: 0.8
                    },
                    {
                        offset: 1,
                        color: constHousing.frameDarkColor,
                        opacity: 0
                    }
                ]
            }
        };
        yield {
            type: "rect",
            x: 5,
            y: housing.height - 35,
            width: housing.width - 10,
            height: 6,
            fill: {
                type: "linearGradient",
                from: { x: 0, y: housing.height - 35 },
                to: { x: 0, y: housing.height - 29 },
                stops: [
                    {
                        offset: 0,
                        color: constHousing.frameDarkColor,
                        opacity: 0
                    },
                    {
                        offset: 0.8,
                        color: constHousing.frameDarkColor,
                        opacity: 0.8
                    }
                ]
            }
        };
        yield {
            type: "rect",
            x: 8,
            y: housing.height - 16,
            width: housing.width - 16,
            height: 8,
            fill: constHousing.frameDarkColor
        };

        // ステッカー
        const stickers = housing.stickers.split(",");
        if (stickers.includes("ro-ene"))
            yield {
                type: "image",
                x: panelArea.x + panelArea.width - 25,
                y: 6,
                width: 25,
                height: 70,
                image: images["ro-ene"],
                opacity: 0.8
            };
        if (stickers.includes("emo-train-kankyo-led"))
            yield {
                type: "image",
                x: panelArea.x,
                y: 10,
                width: 305,
                height: 65,
                image: images["emo-train-kankyo-led"],
                opacity: 0.8
            };
        if (stickers.includes("kankyo-led"))
            yield {
                type: "image",
                x: panelArea.x,
                y: 8,
                width: 250,
                height: 65,
                image: images["kankyo-led"],
                opacity: 0.8
            };
        if (stickers.includes("shin-insha"))
            yield {
                type: "image",
                x: panelArea.x + panelArea.width - 35,
                y: panelArea.y + panelArea.height + 2,
                width: 35,
                height: 10,
                image: images["shin-insha"],
                opacity: 0.8
            };

        // 表示パネル
        yield {
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: housing.lighting ? "#999" : constHousing.panelBackground
        };

        // 点灯状態の光
        if (housing.lighting) {
            light = yield {
                type: "g",
                children: [
                    {
                        type: "rect",
                        x: panelArea.x + 10,
                        y: panelArea.y + 10,
                        width: panelArea.width - 20,
                        height: panelArea.height - 20,
                        fill: "#F0F0FF",
                        opacity: 0.6,
                        blur: 10
                    },
                    {
                        type: "rect",
                        x: panelArea.x + 10,
                        y: panelArea.y + 10,
                        width: panelArea.width - 20,
                        height: panelArea.height - 20,
                        fill: {
                            type: "linearGradient",
                            from: { x: 0, y: panelArea.y + 10 },
                            to: {
                                x: 0,
                                y: panelArea.y + panelArea.height - 10
                            },
                            stops: [
                                {
                                    offset: 0.5,
                                    color: "#F0F0FF",
                                    opacity: 0.8
                                },
                                {
                                    offset: 1,
                                    color: "#F0F0FF",
                                    opacity: 0
                                }
                            ]
                        },
                        blur: 10
                    },
                    {
                        type: "path",
                        d: [
                            { x: panelArea.x + 20, y: panelArea.y + 20 },
                            {
                                x: panelArea.x + 300,
                                y: panelArea.y + panelArea.height * 0.8
                            },
                            {
                                x: panelArea.x + panelArea.width - 300,
                                y: panelArea.y + panelArea.height * 0.8
                            },
                            {
                                x: panelArea.x + panelArea.width - 20,
                                y: panelArea.y + 20
                            },
                            { close: true }
                        ],
                        fill: "#F0F0FF",
                        opacity: 0.5,
                        blur: 20
                    }
                ]
            };
        }
    }*/

    // B形のみ
    else if (housing.type === "b-fl") {
        // 枠
        yield {
            type: "path",
            d: [
                { x: 10, y: 2 },
                { x: 10, y: housing.height - 30 },
                { x: 40, y: housing.height - 2 },
                { x: housing.width - 40, y: housing.height - 2 },
                { x: housing.width - 10, y: housing.height - 30 },
                { x: housing.width - 10, y: 2 },
                { close: true }
            ],
            fill: constHousing.frameDarkColor
        };

        // 表示パネル
        const panelFill = {
            type: "linearGradient",
            gradientUnits: "userSpaceOnUse",
            from: { x: 0, y: housing.height - 30 },
            to: { x: 0, y: housing.height - 24 },
            stops: [
                {
                    offset: 0,
                    color: housing.lighting
                        ? "#AAA"
                        : constHousing.panelBackground
                },
                {
                    offset: 0.5,
                    color: housing.lighting ? "#CCC" : "#EEE"
                },
                {
                    offset: 1,
                    color: housing.lighting ? "#999" : "#C0C0C0"
                }
            ]
        };
        yield {
            type: "path",
            d: [
                { x: panelArea.x, y: panelArea.y },
                { x: panelArea.x, y: panelArea.y + panelArea.height },
                {
                    x: panelArea.x + 10,
                    y: panelArea.y + panelArea.height + 20
                },
                {
                    x: panelArea.x + panelArea.width - 10,
                    y: panelArea.y + panelArea.height + 20
                },
                {
                    x: panelArea.x + panelArea.width,
                    y: panelArea.y + panelArea.height
                },
                { x: panelArea.x + panelArea.width, y: panelArea.y },
                { close: true }
            ],
            fill: panelFill
        };

        // 枠
        const frameFill = {
            type: "linearGradient",
            gradientUnits: "userSpaceOnUse",
            from: { x: 0, y: housing.height - 33 },
            to: { x: 0, y: housing.height - 27 },
            stops: [
                {
                    offset: 0,
                    color: constHousing.frameColor
                },
                { offset: 0.5, color: "#AAA" },
                {
                    offset: 1,
                    color: constHousing.frameColor
                }
            ]
        };
        yield {
            type: "path",
            d: [
                { x: 0, y: 0 },
                { x: 30 },
                { y: housing.height - 30 },
                { x: 45, y: housing.height },
                { x: 15, y: housing.height },
                { x: 0, y: housing.height - 30 },
                { close: true }
            ],
            fill: frameFill
        };
        yield {
            type: "path",
            d: [
                { x: housing.width, y: 0 },
                { x: housing.width - 30 },
                { y: housing.height - 30 },
                { x: housing.width - 45, y: housing.height },
                { x: housing.width - 15, y: housing.height },
                { x: housing.width, y: housing.height - 30 },
                { close: true }
            ],
            fill: frameFill
        };

        // 点灯状態
        if (housing.lighting) {
            light = yield {
                type: "rect",
                x: panelArea.x + 50,
                y: panelArea.y + 30,
                width: panelArea.width - 100,
                height: panelArea.height - 30,
                fill: "#FFFFF0",
                blur: 30
            };
        }
    }

    // 非電照型のみ
    else if (housing.type === "non-light") {
        yield {
            type: "rect",
            x: 0,
            y: 0,
            width: housing.width,
            height: housing.height,
            fill: constHousing.frameColor
        };
        yield {
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: constHousing.panelBackground
        };
    }

    // none
    else {
        yield {
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: constHousing.panelBackground
        };
    }

    // 内容
    if (state.useNumbering) {
        /*yield {
            type: "image",
            image: require("~/assets/sign_jre.png"),
            x: 0,
            y: 0,
            width: housing.width,
            height: housing.height
        };*/
    }

    // 左帯
    /*if (leftStation2.enable) {
        // 分岐
    } else {
        // 直線
        yield {
            type: "path",
            d: leftStation1.go
                ? // 尖る
                  [
                      { x: vw(50), y: vh(56) },
                      { x: 65 + vh(20) },
                      { x: 65, y: vh(66) },
                      { x: 65 + vh(20), y: vh(76) },
                      { x: vw(50) },
                      { close: true }
                  ]
                : // 尖らない
                  [
                      { x: vw(50), y: vh(56) },
                      { x: 0 },
                      { y: vh(76) },
                      { x: vw(50) },
                      { close: true }
                  ],
            transform: `translate(${panelArea.x} ${panelArea.y})`,
            fill: leftStation1.directionColor
        };
    }*/
}
