<template>
  <v-form
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
    class="mt-5"
    @submit.prevent="loginUser"
  >
    <p v-if="error" class="error--text caption">{{ error }}</p>

    <div class="ml-1">
      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        required
        placeholder="your e-mail goes here"
        color="secondary"
        dark
        class="mb-4 caption white--text"
      >
        <template v-slot:label>
          <span class="font-weight-medium text-uppercase white--text"
            >E-mail</span
          >
        </template>
      </v-text-field>

      <v-text-field
        v-model="form.password"
        :rules="passwordRules"
        required
        placeholder="*****"
        color="secondary"
        dark
        class="mb-4 caption white--text"
        type="password"
      >
        <template v-slot:label>
          <span class="font-weight-medium text-uppercase white--text"
            >Password</span
          >
        </template>
      </v-text-field>
    </div>
    <v-btn
      :disabled="!valid"
      rounded
      depressed
      color="white"
      class="caption mr-3 text-capitalize font-weight-bold primary--text"
      :loading="loading"
      type="submit"
      @click="loginUser"
      >Sign In</v-btn
    >
    <v-btn
      rounded
      outlined
      dark
      class="caption text-capitalize font-weight-bold"
      :to="{ name: 'signup' }"
      exact
      >Create new account.</v-btn
    >
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
import { passwordRules, emailRules } from "@/helpers/validation-rules";
const loginForm = {
  email: "",
  password: ""
};

export default {
  data: () => ({
    valid: false,
    form: Object.assign({}, loginForm),
    lazy: false,
    loading: false,
    passwordRules,
    emailRules,
    error: null
  }),
  methods: {
    loginUser() {
      this.loading = true;
      this.login(this.form)
        .then(() => {
          this.loading = false;
          this.form = Object.assign({}, loginForm);
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          this.loading = false;
          if (err.response) {
            this.error = err.response.data.message;
          } else {
            this.error = "Nework Error.";
          }
        });
    },
    ...mapActions("auth", ["login"])
  }
};
</script>
