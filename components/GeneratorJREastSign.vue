<template>
    <SVGWrapper
        :width="housing.width"
        :height="housing.height"
        :contents="contents"
        class="svg"/>
</template>

<script>
import SVGWrapper from "~/components/SVGWrapper.js";

export default {
    name: "GeneratorJREastSign",
    components: { SVGWrapper },
    computed: {
        contents() {
            return this.$store.getters["GeneratorJREast/contents"];
        },
        housing() {
            return this.$store.state.GeneratorJREast.housing;
        }
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
