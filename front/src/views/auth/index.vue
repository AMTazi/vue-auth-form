<template>
  <v-content>
    <v-img
      :src="backgroundImage"
      :eager="true"
      aspect-ratio="1"
      height="100vh"
      width="100vw"
      cover
    >
      <v-container fill-height class="pa-0">
        <v-row dense justify="center" class="flex-wrap" :style="containerStyle">
          <v-col
            v-if="!$vuetify.breakpoint.smAndDown"
            cols="12"
            md="5"
            xs="12"
            class="pa-0"
          >
            <CarouselContainer />
          </v-col>

          <v-col cols="12" md="5" xs="12" class="pa-0">
            <FormContainer />
          </v-col>
        </v-row>
      </v-container>
    </v-img>
  </v-content>
</template>

<script>
import FormContainer from "@/components/FormContainer.vue";

const CarouselContainer = () => import("@/components/CarouselContainer.vue");

export default {
  name: "App",
  inject: ["theme"],
  components: {
    FormContainer,
    CarouselContainer
  },
  data: () => ({
    items: ["secondary", "secondary", "secondary", "secondary"],
    activeSlide: 0
  }),

  computed: {
    containerStyle() {
      return {
        "min-height": this.$vuetify.breakpoint.smAndDown ? "100vh" : "70vh",
        margin: 0
      };
    },
    backgroundImage() {
      return require(this.theme.isDark
        ? "@/assets/black-blue-computer-keyboard.jpg"
        : "@/assets/blank-coffee-beans-composition.jpg");
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;

  &.router-link {
    color: rgba(255, 255, 255, 0.7) !important;
  }

  &.active {
    color: #ffffff !important;

    & .first-word {
      position: relative;
      &::after {
        content: "";
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
      }
    }
  }
}
</style>
