<template>
  <v-container fill-height class="pa-0">
    <v-sheet
      color="secondary"
      height="100%"
      width="100%"
      tile
      class="d-flex flex-column justify-end"
    >
      <v-row></v-row>
      <v-row class="ma-0 pt-5" align="center">
        <v-carousel
          v-model="activeSlide"
          :touchless="false"
          :show-arrows="false"
          hide-delimiters
          height="100%"
          class="primary--text"
        >
          <v-carousel-item v-for="(color, index) in items" :key="index">
            <v-sheet :color="color" height="100%" tile>
              <v-row class="fill-height" align="start" justify="center">
                <v-col cols="12" sm="10">
                  <div
                    class="display-1 text-center"
                    :class="{
                      'beige--text': $vuetify.theme.dark,
                      'grey--text text--darken-2': !$vuetify.theme.dark
                    }"
                  >
                    Plan your activities
                    <br />& controll your progress online
                  </div>
                </v-col>
                <v-col cols="12" sm="10">
                  <v-img
                    src="@/assets/bg-image.png"
                    aspect-ratio="1"
                    max-width="100%"
                    max-height="300"
                  ></v-img>
                </v-col>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-row>
      <v-row class="ma-0" align="center" justify="center">
        <v-radio-group v-model="activeSlide" row>
          <v-radio
            v-for="(item, index) in items"
            :key="index"
            :value="index"
          ></v-radio>
        </v-radio-group>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "carousel-container",
  inject: ["theme"],
  data: () => ({
    items: ["secondary", "secondary", "secondary", "secondary"],
    activeSlide: 0
  }),
  computed: {
    // themeColor() {
    // }
  }
};
</script>

<style></style>
