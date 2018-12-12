<template>
    <v-content class="content">
        <div class="sign">
            <img src="~/assets/sign_jre.png">
        </div>
        <div class="scroll">
            <v-container grid-list-xl>
                <v-layout wrap>
                    <v-flex
                        xs12
                        md6>
                        <GeneratorJREastHousing/>
                    </v-flex>
                    <v-flex
                        v-for="i in 10"
                        :key="i"
                        xs12
                        md6>
                        <v-card>
                            <v-card-title>ほげ</v-card-title>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </div>
    </v-content>
</template>

<script>
import GeneratorJREastHousing from "~/components/GeneratorJREastHousing.vue";

export default {
    components: { GeneratorJREastHousing }
};
</script>

<style lang="scss" scoped>
.content {
    position: relative;
    padding: 0;
    background: #424242;
}
.sign {
    position: fixed;
    height: 60vh;
    padding: 40px;

    & img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        filter: drop-shadow(0 0 20px rgba(#fff, 0.3));
    }
}
.scroll {
    position: relative;
    width: 100%;
    margin-top: 60vh;
    padding-top: 10vh;
    background: linear-gradient(
        to bottom,
        rgba(#000, 0),
        rgba(#000, 0.5) 30vh,
        rgba(#000, 0.5)
    );
}
</style>
