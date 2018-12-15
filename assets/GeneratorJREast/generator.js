import constants from "~/assets/GeneratorJREastConstants.json";
const images = {
    "cho-ene": require("~/assets/GeneratorJREast/cho-ene.png"),
    "ego-train-kankyo-led": require("~/assets/GeneratorJREast/ego-train-kankyo-led.png"),
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

export default state => {
    const svgArray = [],
        { housing } = state,
        panelArea = getPanelArea(state),
        constHousing = constants.housing[housing.type];

    // SE型のみ
    if (housing.type === "se-led") {
        // 枠
        svgArray.push({
            type: "rect",
            x: 0,
            y: 0,
            width: housing.width,
            height: housing.height,
            fill: constHousing.frameColor
        });
        svgArray.push({
            type: "rect",
            x: 5,
            y: 5,
            width: housing.width - 10,
            height: housing.height - 10,
            "stroke-width": 3,
            stroke: constHousing.frameDarkColor
        });
        svgArray.push({
            type: "rect",
            x: 5,
            y: 20,
            width: housing.width - 10,
            height: 60,
            fill: constHousing.frameColor
        });
        svgArray.push({
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
        });
        svgArray.push({
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
        });
        svgArray.push({
            type: "rect",
            x: 8,
            y: housing.height - 16,
            width: housing.width - 16,
            height: 8,
            fill: constHousing.frameDarkColor
        });

        // ステッカー
        const stickers = housing.stickers.split(",");
        if (stickers.includes("cho-ene"))
            svgArray.push({
                type: "image",
                x: panelArea.x + panelArea.width - 25,
                y: 6,
                width: 25,
                height: 70,
                image: images["cho-ene"],
                opacity: 0.8
            });
        if (stickers.includes("ego-train-kankyo-led"))
            svgArray.push({
                type: "image",
                x: panelArea.x,
                y: 10,
                width: 305,
                height: 65,
                image: images["ego-train-kankyo-led"],
                opacity: 0.8
            });
        if (stickers.includes("kankyo-led"))
            svgArray.push({
                type: "image",
                x: panelArea.x,
                y: 8,
                width: 250,
                height: 65,
                image: images["kankyo-led"],
                opacity: 0.8
            });
        if (stickers.includes("shin-insha"))
            svgArray.push({
                type: "image",
                x: panelArea.x + panelArea.width - 35,
                y: panelArea.y + panelArea.height + 2,
                width: 35,
                height: 10,
                image: images["shin-insha"],
                opacity: 0.8
            });

        // 表示パネル
        svgArray.push({
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: housing.lighting ? "#999" : constHousing.panelBackground
        });

        // 点灯状態の光
        if (housing.lighting) {
            svgArray.push({
                type: "rect",
                x: panelArea.x + 10,
                y: panelArea.y + 10,
                width: panelArea.width - 20,
                height: panelArea.height - 20,
                fill: "#F0F0FF",
                opacity: 0.6,
                blur: 10
            });
            svgArray.push({
                type: "rect",
                x: panelArea.x + 10,
                y: panelArea.y + 10,
                width: panelArea.width - 20,
                height: panelArea.height - 20,
                fill: {
                    type: "linearGradient",
                    from: { x: 0, y: panelArea.y + 10 },
                    to: { x: 0, y: panelArea.y + panelArea.height - 10 },
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
            });
            svgArray.push({
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
                    }
                ],
                fill: "#F0F0FF",
                opacity: 0.5,
                blur: 20
            });
        }
    }

    // B形のみ
    else if (housing.type === "b-fl") {
        // 枠
        svgArray.push({
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
        });

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
        svgArray.push({
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
        });

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
        svgArray.push({
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
        });
        svgArray.push({
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
        });

        // 点灯状態
        if (housing.lighting) {
            svgArray.push({
                type: "rect",
                x: panelArea.x + 50,
                y: panelArea.y + 30,
                width: panelArea.width - 100,
                height: panelArea.height - 30,
                fill: "#FFFFF0",
                blur: 30
            });
        }
    }

    // 非電照型のみ
    else if (housing.type === "non-light") {
        svgArray.push({
            type: "rect",
            x: 0,
            y: 0,
            width: housing.width,
            height: housing.height,
            fill: constHousing.frameColor
        });
        svgArray.push({
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: constHousing.panelBackground
        });
    }

    // none
    else {
        svgArray.push({
            type: "rect",
            x: panelArea.x,
            y: panelArea.y,
            width: panelArea.width,
            height: panelArea.height,
            fill: constHousing.panelBackground
        });
    }

    return svgArray;
};
