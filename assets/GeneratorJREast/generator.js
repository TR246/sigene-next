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

    // SE型のみ
    if (housing.type === "se-led") {
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
            type: "path",
            d: [
                { x: 4, y: housing.height },
                { y: 4 },
                { x: housing.width - 4 },
                { y: housing.height }
            ],
            "stroke-width": 4,
            stroke: constHousing.frameDarkColor
        };
        yield {
            type: "rect",
            x: 4,
            y: 15,
            width: 1,
            height: 65,
            fill: constHousing.frameColor
        };
        yield {
            type: "rect",
            x: housing.width - 4,
            y: 15,
            width: 1,
            height: 65,
            fill: constHousing.frameColor
        };
        yield {
            type: "rect",
            x: 6,
            y: 78,
            width: housing.width - 12,
            height: 2,
            fill: constHousing.frameDarkColor,
            opacity: 0.5
        };
        yield {
            type: "rect",
            x: 6,
            y: 80,
            width: housing.width - 12,
            height: 2,
            fill: constHousing.frameLightColor,
            opacity: 0.5
        };
        yield {
            type: "rect",
            x: 6,
            y: housing.height - 32,
            width: housing.width - 12,
            height: 2,
            fill: constHousing.frameDarkColor,
            opacity: 0.5
        };
        yield {
            type: "rect",
            x: 6,
            y: housing.height - 30,
            width: housing.width - 12,
            height: 2,
            fill: constHousing.frameLightColor,
            opacity: 0.5
        };
        yield {
            type: "rect",
            x: 10,
            y: housing.height - 10,
            width: housing.width - 20,
            height: 2,
            fill: constHousing.frameDarkColor,
            opacity: 0.3
        };
        yield {
            type: "rect",
            x: 10,
            y: housing.height - 8,
            width: housing.width - 20,
            height: 2,
            fill: constHousing.frameLightColor,
            opacity: 0.3
        };
        yield {
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
        };

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
            fill:
                constHousing[
                    housing.lighting
                        ? "panelLightBackground"
                        : "panelBackground"
                ]
        };
    }

    // B型のみ
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
                    color:
                        constHousing[
                            housing.lighting
                                ? "panelLightBackground"
                                : "panelBackground"
                        ]
                },
                {
                    offset: 0.5,
                    color:
                        constHousing[
                            housing.lighting
                                ? "panelLightLusterBackground"
                                : "panelLusterBackground"
                        ]
                },
                {
                    offset: 1,
                    color:
                        constHousing[
                            housing.lighting
                                ? "panelLightShadowBackground"
                                : "panelShadowBackground"
                        ]
                }
            ]
        };
        yield {
            type: "path",
            d: [
                { x: panelArea.x, y: panelArea.y },
                { y: panelArea.y + panelArea.height },
                {
                    x: panelArea.x + 10,
                    y: panelArea.y + panelArea.height + 20
                },
                { x: panelArea.x + panelArea.width - 10 },
                {
                    x: panelArea.x + panelArea.width,
                    y: panelArea.y + panelArea.height
                },
                { y: panelArea.y },
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

    // パネル内容
    /*yield {
        type: "image",
        image: require("~/assets/sjk.png"),
        x: 0,
        y: 0,
        width: housing.width,
        height: housing.height,
        opacity: 0.5
    };*/

    // 帯
    // 左帯のクリップパス
    const beltLeftClip = yield {
        type: "clipPath",
        children: [
            {
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
                      ]
            }
        ]
    };
    yield {
        type: "g",
        transform: `translate(${panelArea.x} ${panelArea.y})`,
        children: [
            {
                type: "rect",
                x: 0,
                y: vh(55),
                width: vw(50),
                height: vh(22),
                fill: leftStation1.directionColor,
                "clip-path": beltLeftClip
            }
        ]
    };

    // 光
    if (!housing.lighting) return;
    if (housing.type === "se-led") {
        yield {
            type: "rect",
            ...panelArea,
            "stroke-width": 15,
            stroke: "#808080",
            opacity: 0.7,
            blur: 15
        };
        yield {
            type: "rect",
            ...panelArea,
            fill: {
                type: "radialGradient",
                gradientUnits: "objectBoundingBox",
                center: { x: 0.5, y: 0 },
                radius: 1,
                stops: [
                    { offset: 0.3, color: "#000", opacity: 0 },
                    { offset: 1, color: "#000", opacity: 0.2 }
                ]
            }
        };
        yield {
            type: "rect",
            ...panelArea,
            fill: {
                type: "linearGradient",
                gradientUnits: "objectBoundingBox",
                from: { x: 0, y: 0 },
                to: { x: 0, y: 0 },
                stops: [
                    { offset: 0, color: "#000", opacity: 0 },
                    { offset: 1, color: "#000", opacity: 0.1 }
                ]
            }
        };
    } else if (housing.type === "b-fl") {
        yield {
            type: "path",
            d: [
                { x: panelArea.x, y: panelArea.y },
                { y: panelArea.y + panelArea.height },
                {
                    x: panelArea.x + 10,
                    y: panelArea.y + panelArea.height + 20
                },
                { x: panelArea.x + panelArea.width - 10 },
                {
                    x: panelArea.x + panelArea.width,
                    y: panelArea.y + panelArea.height
                },
                { y: panelArea.y },
                { close: true }
            ],
            fill: {
                type: "linearGradient",
                gradientUnits: "objectBoundingBox",
                from: { x: 0, y: 0 },
                to: { x: 0, y: 1 },
                stops: [
                    { offset: 0, color: "#000", opacity: 0.2 },
                    { offset: 0.15, color: "#000", opacity: 0 },
                    { offset: 0.35, color: "#000", opacity: 0 },
                    { offset: 0.5, color: "#000", opacity: 0.05 },
                    { offset: 0.65, color: "#000", opacity: 0 },
                    { offset: 0.75, color: "#000", opacity: 0 },
                    { offset: 1, color: "#000", opacity: 0.2 }
                ]
            }
        };
        yield {
            type: "path",
            d: [
                { x: panelArea.x, y: panelArea.y },
                { x: panelArea.height / 2 },
                { y: panelArea.y + panelArea.height + 20 },
                { x: panelArea.x + 10 },
                { x: panelArea.x, y: panelArea.y + panelArea.height },
                { close: true }
            ],
            fill: {
                type: "radialGradient",
                gradientUnits: "objectBoundingBox",
                center: { x: 1, y: 0.5 },
                radius: 1,
                stops: [
                    { offset: 0.5, color: "#000", opacity: 0 },
                    { offset: 1, color: "#000", opacity: 0.3 }
                ]
            },
            mask: [
                {
                    type: "rect",
                    x: panelArea.x,
                    y: panelArea.y,
                    width: panelArea.height / 2,
                    height: panelArea.height + 20,
                    fill: {
                        type: "linearGradient",
                        gradientUnits: "objectBoundingBox",
                        from: { x: 0, y: 0 },
                        to: { x: 1, y: 0 },
                        stops: [
                            { offset: 0, color: "#FFF", opacity: 1 },
                            { offset: 0.9, color: "#FFF", opacity: 0 }
                        ]
                    }
                }
            ]
        };
        yield {
            type: "path",
            d: [
                { x: panelArea.x + panelArea.width, y: panelArea.y },
                { x: panelArea.x + panelArea.width - panelArea.height / 2 },
                { y: panelArea.y + panelArea.height + 20 },
                { x: panelArea.x + panelArea.width - 10 },
                {
                    x: panelArea.x + panelArea.width,
                    y: panelArea.y + panelArea.height
                },
                { close: true }
            ],
            fill: {
                type: "radialGradient",
                gradientUnits: "objectBoundingBox",
                center: { x: 0, y: 0.5 },
                radius: 1,
                stops: [
                    { offset: 0.5, color: "#000", opacity: 0 },
                    { offset: 1, color: "#000", opacity: 0.3 }
                ]
            },
            mask: [
                {
                    type: "rect",
                    x: panelArea.x + panelArea.width - panelArea.height / 2,
                    y: panelArea.y,
                    width: panelArea.height / 2,
                    height: panelArea.height + 20,
                    fill: {
                        type: "linearGradient",
                        gradientUnits: "objectBoundingBox",
                        from: { x: 1, y: 0 },
                        to: { x: 0, y: 0 },
                        stops: [
                            { offset: 0, color: "#FFF", opacity: 1 },
                            { offset: 0.9, color: "#FFF", opacity: 0 }
                        ]
                    }
                }
            ]
        };
    }
}
