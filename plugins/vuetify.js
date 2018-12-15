import Vue from "vue";
import Vuetify from "vuetify";
import colors from "vuetify/es5/util/colors";

Vue.use(Vuetify, {
    theme: {
        primary: colors.green.darken3, // a color that is not in the material colors palette
        accent: colors.grey.darken3,
        secondary: "#212121",
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: colors.red.accent4,
        success: colors.blue.accent3
    }
});
