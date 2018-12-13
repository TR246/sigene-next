<template>
    <SVGWrapper
        :width="store.housing.width"
        :height="store.housing.height"
        :contents="contents"
        class="svg"/>
</template>

<script>
import SVGWrapper from "~/components/SVGWrapper.js";
import constants from "~/assets/GeneratorJREastConstants.json";

export default {
    name: "GeneratorJREastSign",
    components: { SVGWrapper },
    computed: {
        contents() {
            const svgArray = [],
                { housing } = this.store,
                panelArea = this.$store.getters["GeneratorJREast/panelArea"],
                { constants } = this;

            // SE型のみ
            if (housing.type === "se-led") {
                const constHousing = constants.housing["se-led"];

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
                        from: { x: 0, y: 0 },
                        to: { x: 0, y: 1 },
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
                        from: { x: 0, y: 0 },
                        to: { x: 0, y: 1 },
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

                // 表示パネル
                svgArray.push({
                    type: "rect",
                    x: panelArea.x,
                    y: panelArea.y,
                    width: panelArea.width,
                    height: panelArea.height,
                    fill: housing.lighting
                        ? "#999"
                        : constHousing.panelBackground
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
                            type: "radialGradient",
                            gradientUnits: "objectBoundingBox",
                            center: { x: 0.5, y: 0 },
                            focus: { x: 0.5, y: 0.2 },
                            radius: 1,
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
                }
            }

            // B形のみ
            if (housing.type === "b-fl") {
                const constHousing = constants.housing["b-fl"];

                // 枠
                svgArray.push({
                    type: "path",
                    d: [
                        { x: 10, y: 2 },
                        { x: 10, y: housing.height - 30 },
                        { x: 20, y: housing.height - 2 },
                        { x: housing.width - 20, y: housing.height - 2 },
                        { x: housing.width - 10, y: housing.height - 30 },
                        { x: housing.width - 10, y: 2 }
                    ],
                    fill: constHousing.frameDarkColor
                });
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
                        { x: 15 },
                        { y: housing.height - 30 },
                        { x: 30, y: housing.height },
                        { x: 15, y: housing.height },
                        { x: 0, y: housing.height - 30 }
                    ],
                    fill: frameFill
                });
                svgArray.push({
                    type: "path",
                    d: [
                        { x: housing.width, y: 0 },
                        { x: housing.width - 15 },
                        { y: housing.height - 30 },
                        { x: housing.width - 30, y: housing.height },
                        { x: housing.width - 15, y: housing.height },
                        { x: housing.width, y: housing.height - 30 }
                    ],
                    fill: frameFill
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
                                ? "#999"
                                : constHousing.panelBackground
                        },
                        { offset: 0.5, color: "#EEE" },
                        {
                            offset: 1,
                            color: housing.lighting ? "#888" : "#C0C0C0"
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
                        { x: panelArea.x + panelArea.width, y: panelArea.y }
                    ],
                    fill: panelFill
                });
            }

            return svgArray;
        },
        store() {
            return this.$store.state.GeneratorJREast;
        },
        constants: () => constants
    }
};
</script>

<style lang="scss" scoped>
.svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(#fff, 0.3));
}
</style>
