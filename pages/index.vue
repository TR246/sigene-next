<template>
    <v-content>
        <v-container grid-list-xl>
            <v-layout
                wrap>
                <v-flex
                    xs12
                    sm6>
                    <v-card
                        nuxt
                        ripple
                        to="/generator-jreast">
                        <v-img src="~/assets/sign_jre.png"/>
                        <v-card-title primary-title>
                            <h2>JR東日本<small>風</small></h2>
                        </v-card-title>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
    components: {
        Logo,
        VuetifyLogo
    }
};
</script>
