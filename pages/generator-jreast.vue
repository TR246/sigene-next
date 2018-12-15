<template>
    <SignGenerator>
        <GeneratorJREastSign slot="sign"/>
        <v-flex
            v-for="(component, i) in cards"
            :key="i"
            xs12
            md6>
            <component :is="component"/>
        </v-flex>
    </SignGenerator>
</template>

<script>
import SignGenerator from "~/components/SignGenerator.vue";
import GeneratorJREastSign from "~/components/GeneratorJREastSign.vue";
import GeneratorJREastHousing from "~/components/GeneratorJREastHousing.vue";
import GeneratorJREastGeneral from "~/components/GeneratorJREastGeneral.vue";
import GeneratorJREastStationName from "~/components/GeneratorJREastStationName.vue";

export default {
    components: { SignGenerator, GeneratorJREastSign },
    data: () => ({
        cards: [
            GeneratorJREastHousing,
            GeneratorJREastGeneral,
            GeneratorJREastStationName
        ]
    })
};
</script>
