<template>
    <v-card>
        <v-card-title primary-title>
            <h2>筐体設定</h2>
        </v-card-title>
        <v-card-text>
            <v-select
                :items="housingTypes"
                :value="housing.type"
                label="筐体タイプ"
                @change="change('type', $event)"/>
            <v-window v-model="housing.type">
                <v-window-item
                    v-for="{value: type} in housingTypes"
                    :key="type"
                    :value="type">
                    <v-layout wrap>
                        <!-- 筐体幅 -->
                        <v-flex xs10>
                            <v-slider
                                :value="housing.width"
                                label="筐体幅(mm)"
                                min="680"
                                max="4900"
                                @input="change('width', $event)"/>
                        </v-flex>
                        <v-flex xs2>
                            <v-text-field
                                :value="housing.width"
                                type="number"
                                min="680"
                                max="4900"
                                @input="change('width', $event)"/>
                        </v-flex>
                        <!-- 筐体高 -->
                        <v-flex xs10>
                            <v-slider
                                :value="housing.height"
                                label="筐体高(mm)"
                                min="450"
                                max="600"
                                @input="change('height', $event)"/>
                        </v-flex>
                        <v-flex xs2>
                            <v-text-field
                                :value="housing.height"
                                type="number"
                                min="450"
                                max="600"
                                @input="change('height', $event)"/>
                        </v-flex>
                        <!-- SE型のみ -->
                        <template v-if="type === 'se-led'">
                            <!-- 筐体左右余白 -->
                            <v-flex xs10>
                                <v-slider
                                    :value="housing.padding"
                                    label="筐体左右余白(mm)"
                                    min="35"
                                    max="40"
                                    @input="change('padding', $event)"/>
                            </v-flex>
                            <v-flex xs2>
                                <v-text-field
                                    :value="housing.padding"
                                    type="number"
                                    min="35"
                                    max="40"
                                    @input="change('padding', $event)"/>
                            </v-flex>
                            <!-- プリセット -->
                            <v-flex xs7>
                                <v-select
                                    :items="housingPresetsSE"
                                    v-model="preset"
                                    label="筐体プリセット"/>
                            </v-flex>
                            <v-flex xs5>
                                <v-btn
                                    color="primary"
                                    flat
                                    @click="applyPreset">
                                    プリセットを適用
                                </v-btn>
                            </v-flex>
                        </template>
                        <!-- 点灯の有無 -->
                        <v-flex
                            v-if="type === 'se-led' || type === 'b-fl'"
                            xs12>
                            <v-tooltip top>
                                <v-switch
                                    slot="activator"
                                    :input-value="housing.lighting"
                                    :true-value="true"
                                    :false-value="false"
                                    color="primary"
                                    label="照明点灯"
                                    @change="change('lighting', $event)"/>
                                <span>質感はよくなりますが処理が重くなることがあります</span>
                            </v-tooltip>
                        </v-flex>
                    </v-layout>
                </v-window-item>
            </v-window>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "GeneratorJREastHousing",
    data: () => ({
        housingTypes: [
            { text: "SE型(LED)", value: "se-led" },
            { text: "B型(蛍光灯)", value: "b-fl" },
            { text: "非電照型", value: "non-light" },
            { text: "枠なし", value: "none" }
        ],
        housingSizesSE: {
            "SE-1": { width: 680, height: 450, padding: 35 },
            "SE-2": { width: 1280, height: 450, padding: 35 },
            "SE-3": { width: 2480, height: 450, padding: 35 },
            "SE-4": { width: 3700, height: 450, padding: 40 },
            "SE-5": { width: 4900, height: 450, padding: 40 },
            "SE-6": { width: 1900, height: 600, padding: 35 },
            "SE-7": { width: 2480, height: 600, padding: 35 },
            "SE-8": { width: 3700, height: 600, padding: 40 }
        },
        housingPresetsSE: [
            { text: "SE-1型 (サイン用: 極小)", value: "SE-1" },
            { text: "SE-2型 (サイン用: 小型)", value: "SE-2" },
            { text: "SE-3型 (サイン用: 中型)", value: "SE-3" },
            { text: "SE-4型 (サイン用: 大型)", value: "SE-4" },
            { text: "SE-5型 (サイン用: 幅広)", value: "SE-5" },
            { text: "SE-6型 (駅名標用: 通常)", value: "SE-6" },
            { text: "SE-7型 (駅名標用: 幅広)", value: "SE-7" },
            { text: "SE-8型 (サイン用: 特大)", value: "SE-8" }
        ],
        preset: "SE-6"
    }),
    computed: {
        housing() {
            return this.$store.state.GeneratorJREast.housing;
        }
    },
    methods: {
        change(key, value) {
            this.$store.commit("GeneratorJREast/change", {
                key: `housing.${key}`,
                value
            });
        },
        applyPreset() {
            const { width, height, padding } = this.housingSizesSE[this.preset];
            this.change("width", width);
            this.change("height", height);
            this.change("padding", padding);
        }
    }
};
</script>
