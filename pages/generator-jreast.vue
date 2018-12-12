<template>
    <v-content class="content">
        <div
            v-scroll="onScroll"
            :style="{
                opacity: 1 - signInactiveLevel * 0.5,
                transform: `scale(${1 - signInactiveLevel * 0.1})`
            }"
            class="sign">
            <GeneratorJREastSign class="sign-media"/>
        </div>
        <div class="scroll">
            <v-container grid-list-xl>
                <v-layout wrap>
                    <v-flex
                        v-for="(component, i) in cards"
                        :key="i"
                        xs12
                        md6>
                        <component :is="component"/>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-content>
</template>

<script>
import GeneratorJREastSign from "~/components/GeneratorJREastSign.vue";
import GeneratorJREastHousing from "~/components/GeneratorJREastHousing.vue";

export default {
    components: { GeneratorJREastSign },
    data: () => ({
        scroll: 0,
        cards: [GeneratorJREastHousing]
    }),
    computed: {
        signInactiveLevel() {
            return Math.min(1, this.scroll / 300);
        }
    },
    methods: {
        onScroll() {
            this.scroll =
                window.pageYOffset || document.documentElement.scrollTop;
        }
    }
};
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    padding: 0;
    background: #424242;
}
.sign {
    position: fixed;
    width: 100%;
    height: 60vh;
    padding: 24px;

    & .sign-media {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(#fff, 0.3));
    }
}
.scroll {
    position: relative;
    width: 100%;
    margin-top: 60vh;
    padding-top: 10vh;
    background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.5) 30vh,
        rgba(#000, 0.5)
    );
}
</style>
