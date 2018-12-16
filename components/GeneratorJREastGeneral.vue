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
                <v-flex xs12>
                    <!-- 日本語フォント -->
                    <v-text-field
                        :value="store.fonts.japanese"
                        label="日本語フォント"
                        @input="change('fonts.janapese', $event)"/>
                    <!-- 英語フォント -->
                    <v-text-field
                        :value="store.fonts.english"
                        label="英語フォント"
                        @input="change('fonts.english', $event)"/>
                    <!-- 中国語フォント -->
                    <v-text-field
                        :value="store.fonts.chinese"
                        label="中国語フォント"
                        @input="change('fonts.chinese', $event)"/>
                    <!-- 韓国語フォント -->
                    <v-text-field
                        :value="store.fonts.korean"
                        label="韓国語フォント"
                        @input="change('fonts.korean', $event)"/>
                </v-flex>
                <v-flex shrink>
                    <v-dialog
                        v-model="recommendFontDialog"
                        width="500">
                        <v-btn
                            slot="activator"
                            depressed
                            block
                            color="primary">
                            推奨フォントをロード
                        </v-btn>
                        <v-card>
                            <v-card-text>
                                <v-list>
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-checkbox
                                                v-model="recommendFonts.japanese"
                                                color="primary"/>
                                        </v-list-tile-action>
                                        <v-list-tile-content @click="recommendFonts.japanese = !recommendFonts.japanese">
                                            <v-list-tile-title>日本語フォント (M+ 1c)</v-list-tile-title>
                                            <v-list-tile-sub-title>0MB</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-checkbox
                                                v-model="recommendFonts.chinese"
                                                color="primary"/>
                                        </v-list-tile-action>
                                        <v-list-tile-content @click="recommendFonts.chinese = !recommendFonts.chinese">
                                            <v-list-tile-title>中国語フォント (Noto Sans CJK Chinese)</v-list-tile-title>
                                            <v-list-tile-sub-title>0MB</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                    <v-list-tile>
                                        <v-list-tile-action>
                                            <v-checkbox
                                                v-model="recommendFonts.korean"
                                                color="primary"/>
                                        </v-list-tile-action>
                                        <v-list-tile-content @click="recommendFonts.korean = !recommendFonts.korean">
                                            <v-list-tile-title>韓国語フォント (Noto Sans CJK Korean)</v-list-tile-title>
                                            <v-list-tile-sub-title>0MB</v-list-tile-sub-title>
                                        </v-list-tile-content>
                                    </v-list-tile>
                                </v-list>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer/>
                                <v-btn
                                    color="secondary"
                                    flat
                                    @click="recommendFontDialog = false">
                                    キャンセル
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    depressed>
                                    ダウンロード
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-flex>
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
    data: () => ({
        recommendFontDialog: false,
        recommendFonts: {
            japanese: false,
            chinese: false,
            korean: false
        }
    }),
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
