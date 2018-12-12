<template>
    <SVGWrapper
        :width="store.housing.width"
        :height="store.housing.height"
        :content="content"/>
</template>

<script>
import SVGWrapper from "~/components/SVGWrapper.js";
import constants from "~/assets/GeneratorJREastConstants.json";

export default {
    name: "GeneratorJREastSign",
    components: { SVGWrapper },
    computed: {
        content() {
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
