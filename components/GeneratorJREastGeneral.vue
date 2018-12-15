<template>
    <v-card>
        <v-card-title primary-title>
            <h2>全般設定</h2>
        </v-card-title>
        <v-card-text>
            <v-layout wrap>
                <!-- ナンバリングと多言語表記 -->
                <v-flex xs12>
                    <v-switch
                        :input-value="store.useNumbering"
                        :true-value="true"
                        :false-value="false"
                        color="primary"
                        label="駅ナンバリング・多言語表記"
                        @change="change('useNumbering', $event)"/>
                </v-flex>
                <!-- 日本語フォント -->
                <v-flex>
                    <v-text-field
                        :value="store.fonts.japanese"
                        label="日本語フォント"
                        @input="change('fonts.janapese', $event)"/>
                </v-flex>
                <v-flex shrink>
                    <v-btn
                        depressed
                        color="primary">
                        推奨フォントをロード
                    </v-btn>
                </v-flex>
                <!-- 英語フォント -->
                <v-flex xs12>
                    <v-text-field
                        :value="store.fonts.english"
                        label="英語フォント"
                        @input="change('fonts.english', $event)"/>
                </v-flex>
                <!-- 中国語フォント -->
                <v-flex>
                    <v-text-field
                        :value="store.fonts.chinese"
                        label="中国語フォント"
                        @input="change('fonts.chinese', $event)"/>
                </v-flex>
                <v-flex shrink>
                    <v-btn
                        depressed
                        color="primary">
                        推奨フォントをロード
                    </v-btn>
                </v-flex>
                <!-- 韓国語フォント -->
                <v-flex>
                    <v-text-field
                        :value="store.fonts.korean"
                        label="韓国語フォント"
                        @input="change('fonts.korean', $event)"/>
                </v-flex>
                <v-flex shrink>
                    <v-btn
                        depressed
                        color="primary">
                        推奨フォントをロード
                    </v-btn>
                </v-flex>
                <!-- フォント指定方法のリンク -->
                <v-flex shrink>
                    <v-btn
                        flat
                        color="primary">
                        フォントの指定方法について
                    </v-btn>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "GeneratorJREastGeneral",
    computed: {
        store() {
            return this.$store.state.GeneratorJREast;
        }
    },
    methods: {
        change(key, value) {
            this.$store.commit("GeneratorJREast/change", { key, value });
        }
    }
};
</script>
