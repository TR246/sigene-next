<template>
    <v-layout wrap>
        <v-flex
            xs12>
            <v-img src="~/assets/sign_jre.png"/>
        </v-flex>
        <v-flex
            xs12
            md6>
            <v-card>
                <v-card-title primary-title>
                    <h2>筐体設定</h2>
                </v-card-title>
                <v-card-text>
                    <v-select
                        v-model="housing.type"
                        :items="[
                            {text: 'SE形(LED)', value: 'se'},
                            {text: 'B形(蛍光灯)', value: 'b'},
                            {text: '非電照型', value: 'non-lighting'}
                        ]"
                        label="筐体タイプ"/>
                    <!-- 筐体幅 -->
                    <v-tooltip bottom>
                        <v-layout slot="activator">
                            <v-flex>
                                <v-slider
                                    v-model="housing.width"
                                    color="secondary"
                                    max="3700"
                                    min="680"
                                    label="幅(mm)"/>
                            </v-flex>
                            <v-flex
                                style="width: 100px"
                                shrink>
                                <v-text-field
                                    v-model="housing.width"
                                    max="3700"
                                    min="680"
                                    type="number"/>
                            </v-flex>
                        </v-layout>
                        <span>通常は1900または2480にしてください</span>
                    </v-tooltip>
                    <!-- 筐体高さ -->
                    <v-tooltip bottom>
                        <v-layout slot="activator">
                            <v-flex>
                                <v-slider
                                    v-model="housing.height"
                                    color="secondary"
                                    max="600"
                                    min="450"
                                    label="高さ(mm)"/>
                            </v-flex>
                            <v-flex
                                style="width: 100px"
                                shrink>
                                <v-text-field
                                    v-model="housing.height"
                                    max="600"
                                    min="450"
                                    type="number"/>
                            </v-flex>
                        </v-layout>
                        <span>通常は400または600にしてください</span>
                    </v-tooltip>
                </v-card-text>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data: () => ({
        housing: {
            type: "se",
            width: 1900,
            height: 600
        }
    })
};
</script>
