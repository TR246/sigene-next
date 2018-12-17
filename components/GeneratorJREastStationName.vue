<template>
    <v-card>
        <v-card-title primary-title>
            <h2>当駅名</h2>
        </v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs4>
                    <v-text-field
                        :value="store.japanese"
                        label="駅名(漢字)"
                        @input="change('japanese', $event)"/>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                        :value="store.english"
                        label="駅名(ローマ字)"
                        @input="change('english', $event)"/>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                        :value="store.kana"
                        label="駅名(ひらがな)"
                        @input="change('kana', $event)"/>
                </v-flex>
                <template v-if="$store.state.GeneratorJREast.useNumbering">
                    <v-flex xs4>
                        <v-text-field
                            :value="store.chinese"
                            label="駅名(中国語: 簡体字)"
                            @input="change('chinese', $event)"/>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field
                            :value="store.korean"
                            label="駅名(韓国語: ハングル)"
                            @input="change('korean', $event)"/>
                    </v-flex>
                    <v-flex xs4>
                        <v-text-field
                            :value="store.tlc"
                            label="スリーレターコード"
                            @input="change('tlc', $event)"/>
                    </v-flex>
                    <template
                        v-for="(numbering, i) in store.numberings">
                        <v-flex
                            :key="`${i}_${numbering.number}_color`"
                            shrink> 
                            <v-btn>色を選択</v-btn>
                        </v-flex>
                        <v-flex
                            :key="`${i}_${numbering.number}_number`">
                            <v-text-field
                                :value="numbering.number"
                                @input="change(`numberings.${i}.number`, $event)"/>
                        </v-flex>
                    </template>
                </template>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "GeneratorJREastStationName",
    computed: {
        store() {
            return this.$store.state.GeneratorJREast.stationName;
        }
    },
    methods: {
        change(key, value) {
            this.$store.commit("GeneratorJREast/change", {
                key: `stattionName.${key}`,
                value
            });
        }
    }
};
</script>
