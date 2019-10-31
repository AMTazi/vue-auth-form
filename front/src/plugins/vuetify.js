import Vue from "vue";
import Vuetify from "vuetify/lib";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    // dark: true,
    themes: {
      light: {
        primary: colors.lightBlue.base, //"#3ab2ff",
        secondary: colors.shades.white,
        accent: colors.lightBlue.darken4
      },
      dark: {
        // primary: colors.lightBlue.darken4, //"#5294e2"
        // secondary: colors.grey.darken3, // "#383b4a"
        // accent: colors.lightBlue.base // "#7d818c"
        primary: "#5294e2", //"#5294e2"
        secondary: "#383b4a", // "#383b4a"
        accent: "#2d7c9d", // "#7d818c"
        beige: "#cccccc"
      }
    }
  },
  icons: {
    iconfont: "mdi"
  }
});
