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
                    <v-flex xs12>
                        <v-card>
                            <v-card-actions>
                                <v-dialog
                                    v-model="pngDialog"
                                    width="500">
                                    <v-btn
                                        slot="activator"
                                        color="primary"
                                        depressed
                                        @click="setPNGImageDefault">
                                        PNG画像で保存
                                    </v-btn>
                                    <v-card>
                                        <v-card-text>
                                            <v-layout>
                                                <v-flex xs5>
                                                    <v-text-field
                                                        :value="pngImage.width"
                                                        type="number"
                                                        label="画像の幅"
                                                        @input="updatePNG('width', $event)"/>
                                                </v-flex>
                                                <v-spacer/>
                                                <v-flex xs5>
                                                    <v-text-field
                                                        :value="pngImage.height"
                                                        type="number"
                                                        label="画像の高さ"
                                                        @input="updatePNG('height', $event)"/>
                                                </v-flex>
                                            </v-layout>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer/>
                                            <v-btn
                                                color="secondary"
                                                flat
                                                @click="pngDialog = false">
                                                キャンセル
                                            </v-btn>
                                            <v-btn
                                                color="primary"
                                                depressed
                                                @click="saveAsPNG">
                                                PNG画像で保存
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-dialog>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                    <slot/>
                </v-layout>
            </v-container>
        </div>
    </v-content>
</template>

<script>
import pngSaver from "~/assets/pngSaver.js";

export default {
    name: "SignGenerator",
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data: () => ({
        scroll: 0,
        pngDialog: false,
        pngImage: {
            width: 0,
            height: 0
        }
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
        },
        setPNGImageDefault() {
            const { width, height } = this.$store.state[this.name].housing;
            this.pngImage.width = width;
            this.pngImage.height = height;
        },
        updatePNG(key, value) {
            value = parseInt(value, 10);
            const { pngImage } = this,
                { housing } = this.$store.state[this.name],
                beforeValue = pngImage[key],
                isWidth = key === "width";
            pngImage[key] = value;
            pngImage[isWidth ? "height" : "width"] = Math.round(
                (value * housing[isWidth ? "height" : "width"]) /
                    housing[isWidth ? "width" : "height"]
            );
        },
        saveAsPNG() {
            pngSaver(this.$store.getters[`${this.name}/contents`]);
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
