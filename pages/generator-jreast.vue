<template>
    <v-layout wrap>
        <v-flex xs12>
            <v-img src="~/assets/sign_jre.png"/>
        </v-flex>
        <v-flex
            xs12
            md6>
            <GeneratorJREastHousing/>
        </v-flex>
    </v-layout>
</template>

<script>
import GeneratorJREastHousing from "~/components/GeneratorJREastHousing.vue";

export default {
    components: { GeneratorJREastHousing }
};
</script>
