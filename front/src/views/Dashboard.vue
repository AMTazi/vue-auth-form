<template>
  <v-content>
    <v-container fill-height>
      <v-row>
        <v-col class="text-center">
          Congrat!! now you can
          <v-btn @click="logoutUser" color="primary" depressed rounded
            >Logout</v-btn
          >
        </v-col>
      </v-row>
    </v-container>
  </v-content>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("auth", ["loggedIn"])
  },
  methods: {
    logoutUser() {
      this.logout().then(() => {
        this.$router.push({ name: "signin" });
      });
    },
    ...mapActions("auth", ["logout"])
  }
};
</script>
