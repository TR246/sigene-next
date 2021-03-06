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
                                                <v-flex>
                                                    <v-text-field
                                                        :value="pngImage.width"
                                                        type="number"
                                                        label="画像の幅"
                                                        @input="updatePNGSize('width', $event)"/>
                                                </v-flex>
                                                <v-flex
                                                    shrink
                                                    align-self-center
                                                    justify-self-center>
                                                    <v-btn
                                                        :depressed="pngLink"
                                                        :flat="!pngLink"
                                                        icon
                                                        color="primary"
                                                        @click="pngLink = !pngLink">
                                                        <v-icon>link</v-icon>
                                                    </v-btn>
                                                </v-flex>
                                                <v-flex>
                                                    <v-text-field
                                                        :value="pngImage.height"
                                                        type="number"
                                                        label="画像の高さ"
                                                        @input="updatePNGSize('height', $event)"/>
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
                                                :loading="pngSaving"
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
import replaceAsync from "~/assets/replaceAsync.js";

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
        pngSaving: false,
        pngDialog: false,
        pngLink: true,
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
        updatePNGSize(key, value) {
            value = parseInt(value, 10);
            const { pngImage } = this,
                { housing } = this.$store.state[this.name],
                beforeValue = pngImage[key],
                oppoiste = key === "width" ? "height" : "width";
            pngImage[key] = value;
            if (this.pngLink)
                pngImage[oppoiste] = Math.round(
                    (housing[oppoiste] / housing[key]) * value
                );
        },
        async saveAsPNG() {
            this.pngSaving = true;
            const { width, height } = this.pngImage,
                img = document.createElement("img"),
                replacer = (match, href) => {
                    const img = document.createElement("img"),
                        canvas = document.createElement("canvas"),
                        p = new Promise(resolve =>
                            img.addEventListener("load", () => {
                                canvas.width = img.width;
                                canvas.height = img.height;
                                canvas.getContext("2d").drawImage(img, 0, 0);
                                resolve(
                                    `xlink:href="${canvas.toDataURL(
                                        "image/png"
                                    )}"`
                                );
                            })
                        );
                    img.src = href;
                    return p;
                },
                svg = await Promise.resolve(
                    new XMLSerializer().serializeToString(
                        this.$slots.sign[0].componentInstance.$el
                    )
                ).then(
                    async svg =>
                        await replaceAsync(svg, /xlink:href="(.*?)"/g, replacer)
                );
            img.addEventListener("load", () => {
                const canvas = document.createElement("canvas"),
                    a = document.createElement("a"),
                    mouseEvent = document.createEvent("MouseEvents");
                canvas.width = width;
                canvas.height = height;
                canvas.getContext("2d").drawImage(img, 0, 0, width, height);
                a.download = "駅名標";
                a.href = canvas.toDataURL("image/png");
                mouseEvent.initMouseEvent(
                    "click",
                    true,
                    true,
                    window,
                    0,
                    0,
                    0,
                    0,
                    0,
                    false,
                    false,
                    false,
                    false,
                    0,
                    a
                );
                a.dispatchEvent(mouseEvent);
                this.pngSaving = false;
                this.pngDialog = false;
            });
            img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
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
}
</style>
