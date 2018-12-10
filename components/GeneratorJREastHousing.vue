<template>
    <v-card>
        <v-card-title primary-title>
            <h2>筐体設定</h2>
        </v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs12>
                    <v-select
                        :items="housingTypes"
                        :value="housing.type"
                        @change="change('type', $event)"/>
                </v-flex>
                <v-flex xs12>
                    <v-window v-model="housing.type">
                        <v-window-item value="se-led">SE</v-window-item>
                        <v-window-item value="b-fl">B</v-window-item>
                        <v-window-item value="non-light">非電照</v-window-item>
                    </v-window>
                </v-flex>
            </v-layout>
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
            { text: "非電照型", value: "non-light" }
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
            "SE-1",
            "SE-2",
            "SE-3",
            "SE-4",
            "SE-5",
            "SE-6",
            "SE-7",
            "SE-8"
        ]
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
        }
    }
};
</script>
