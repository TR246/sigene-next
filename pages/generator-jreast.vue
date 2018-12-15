<template>
    <SignGenerator>
        <GeneratorJREastSign
            ref="sign"
            slot="sign"/>
        <v-flex xs12>
            <v-card>
                <v-card-actions>
                    <v-dialog width="500">
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
                        </v-card>
                    </v-dialog>
                </v-card-actions>
            </v-card>
        </v-flex>
        <v-flex
            v-for="(component, i) in cards"
            :key="i"
            xs12
            md6>
            <component :is="component"/>
        </v-flex>
    </SignGenerator>
</template>

<script>
import SignGenerator from "~/components/SignGenerator.vue";
import GeneratorJREastSign from "~/components/GeneratorJREastSign.vue";
import GeneratorJREastHousing from "~/components/GeneratorJREastHousing.vue";
import GeneratorJREastGeneral from "~/components/GeneratorJREastGeneral.vue";
import GeneratorJREastStationName from "~/components/GeneratorJREastStationName.vue";

export default {
    components: { SignGenerator, GeneratorJREastSign },
    data: () => ({
        cards: [
            GeneratorJREastHousing,
            GeneratorJREastGeneral,
            GeneratorJREastStationName
        ],
        pngImage: {
            width: 0,
            height: 0
        }
    }),
    methods: {
        setPNGImageDefault() {
            const { width, height } = this.$store.state.GeneratorJREast.housing;
            this.pngImage.width = width;
            this.pngImage.height = height;
        },
        updatePNG(key, value) {
            value = parseInt(value, 10);
            const { pngImage } = this,
                { housing } = this.$store.state.GeneratorJREast,
                beforeValue = pngImage[key],
                isWidth = key === "width";
            pngImage[key] = value;
            pngImage[isWidth ? "height" : "width"] = Math.round(
                (value * housing[isWidth ? "height" : "width"]) /
                    housing[isWidth ? "width" : "height"]
            );
        }
    }
};
</script>
