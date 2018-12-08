<template>
    <v-layout>
        <v-flex
            xs12
            md6>
            <v-card
                nuxt
                ripple
                to="/inspire">
                <v-img
                    :aspect-ratio="19 / 6"
                    src="~/assets/sign_jre.png"/>
                <v-card-title primary-title>
                    <h2>JR東日本<small>風</small></h2>
                </v-card-title>
            </v-card>
        </v-flex>
    </v-layout>
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
