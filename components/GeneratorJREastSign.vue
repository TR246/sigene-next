<script>
import generator from "~/assets/GeneratorJREast/generator.js";
import generatorParser from "~/assets/generatorParser.js";

export default {
    name: "GeneratorJREastSign",
    render(createElement) {
        const store = this.$store.state.GeneratorJREast;
        return generatorParser(createElement, generator(store), store.housing);
    }
};
</script>

<style lang="scss" scoped>
svg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 20px rgba(#fff, 0.3));
}
</style>
