<template>
    <SVGWrapper
        :width="store.housing.width"
        :height="store.housing.height"
        :contents="contents"/>
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
                { constants } = this;

            // SE型のみ
            if (housing.type === "se-led") {
                // 枠
                svgArray.push({
                    type: "rect",
                    x: 0,
                    y: 0,
                    width: housing.width,
                    height: housing.height,
                    fill: constants.housing.frameColor
                });
                svgArray.push({
                    type: "rect",
                    x: 5,
                    y: 5,
                    width: housing.width - 10,
                    height: housing.height - 10,
                    fill: "none",
                    stroke: constants.housing.frameDarkColor,
                    strokeWidth: 2
                });
                svgArray.push({
                    type: "rect",
                    x: 5,
                    y: 80,
                    width: housing.width - 10,
                    height: 5,
                    fill: {
                        type: "linearGradient",
                        from: { x: 0, y: 0 },
                        to: { x: 0, y: 1 },
                        stops: [
                            {
                                offset: 0.2,
                                color: constants.housing.frameDarkColor,
                                opacity: 0.8
                            },
                            {
                                offset: 1,
                                color: constants.housing.frameDarkColor,
                                opacity: 0
                            }
                        ]
                    }
                });

                // 表示パネル
                svgArray.push({
                    type: "rect",
                    x: housing.padding,
                    y: 80,
                    width: housing.width - housing.padding * 2,
                    height: housing.height - 110,
                    fill: constants.housing.panelBackground
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
