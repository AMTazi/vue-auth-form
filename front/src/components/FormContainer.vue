<template>
  <v-container fill-height class="pa-0">
    <v-sheet class="px-5" height="100%" width="100%" color="primary" tile>
      <v-row class="ma-0 my-3" align="center">
        <v-spacer></v-spacer>
        <span
          class="caption font-weight-regular white--text text-capitalize mr-3"
          :class="{ 'font-weight-bold': !dark }"
          >light</span
        >
        <v-switch v-model="dark" inset flat dense></v-switch>
        <span
          class="caption font-weight-regular white--text text-capitalize"
          :class="{ 'font-weight-bold': dark }"
          >dark</span
        >
      </v-row>
      <v-row justify="center" class="ma-0">
        <v-col cols="12" md="8" sm="12" class="pa-0 pl-1 mb-5">
          <div class="d-flex justify-content-space-between align-end">
            <router-link
              :to="{ name: 'signup' }"
              class="headline font-weight-light mr-3 router-link"
              active-class="active"
              exact
            >
              <span class="first-word pb-2">Sign</span> Up
            </router-link>
            <span class="white--text">or</span>
            <router-link
              :to="{ name: 'signin' }"
              class="headline font-weight-light ml-3 router-link"
              active-class="active"
              exact
            >
              <span class="first-word pb-1">Sign</span> In
            </router-link>
          </div>
          <v-spacer></v-spacer>
        </v-col>
        <v-col cols="12" md="8" sm="12" class="pa-0 mt-5">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </v-col>
      </v-row>
      <v-row></v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  name: "form-container",
  inject: ["theme"],
  data: () => ({
    dark: false
  }),
  computed: {},
  watch: {
    dark(val) {
      this.$vuetify.theme.dark = val;
    }
  },
  mounted() {}
};
</script>

<style></style>
