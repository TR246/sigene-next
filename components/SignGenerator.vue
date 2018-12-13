<template>
    <v-content class="content">
        <div
            v-scroll="onScroll"
            :style="{
                opacity: 1 - signInactiveLevel * 0.5,
                transform: `scale(${1 - signInactiveLevel * 0.1})`
            }"
            class="sign">
            <slot name="sign"/>
        </div>
        <div class="scroll">
            <v-container grid-list-xl>
                <v-layout wrap>
                    <slot/>
                </v-layout>
            </v-container>
        </div>
    </v-content>
</template>

<script>
export default {
    name: "SignGenerator",
    data: () => ({
        scroll: 0
    }),
    computed: {
        signInactiveLevel() {
            return Math.min(1, this.scroll / 500);
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
}
.scroll {
    position: relative;
    width: 100%;
    margin-top: 60vh;
    padding-top: 10vh;
}
</style>
