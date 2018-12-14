<template>
    <v-card>
        <v-card-title primary-title>
            <h2>当駅名</h2>
        </v-card-title>
        <v-card-text>
            <v-layout wrap>
                <v-flex xs12>
                    <v-text-field
                        label="駅名(漢字)"/>
                    <v-text-field
                        label="駅名(ローマ字)"/>
                    <v-text-field
                        label="駅名(ひらがな)"/>
                </v-flex>
            </v-layout>
        </v-card-text>
    </v-card>
</template>
