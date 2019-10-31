<template>
  <v-form
    ref="form"
    v-model="valid"
    :lazy-validation="lazy"
    class="mt-5"
    @submit.prevent="registerUser"
  >
    <p v-if="error" class="error--text caption">{{ error }}</p>
    <div class="ml-1">
      <v-text-field
        v-model="form.name"
        :rules="nameRules"
        required
        placeholder="your name goes here"
        color="secondary"
        dark
        class="mb-4 caption white--text"
      >
        <template v-slot:label>
          <span class="font-weight-medium text-uppercase white--text"
            >Fullname</span
          >
        </template>
      </v-text-field>

      <v-text-field
        v-model="form.email"
        :rules="emailRules"
        label="E-mail"
        type="email"
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

    <div class="d-flex justify-start align-start mb-4 ml-1">
      <span class="caption white--text">
        By clicking on SignUp, you agree on our
        <router-link
          class="white--text caption"
          @click.prevent
          :to="{ name: 'signup' }"
        >
          <strong>Terms and services</strong>
        </router-link>
      </span>
    </div>

    <v-btn
      :disabled="!valid"
      rounded
      depressed
      color="white"
      class="caption mr-3 text-capitalize font-weight-bold primary--text"
      @click.prevent="registerUser"
      type="submit"
      :loading="loading"
      >Sign Up</v-btn
    >
    <v-btn
      rounded
      outlined
      dark
      class="caption text-capitalize font-weight-bold"
      :to="{ name: 'signin' }"
      >I'am already a member</v-btn
    >
  </v-form>
</template>
<script>
import { mapActions } from "vuex";
import {
  nameRules,
  passwordRules,
  emailRules
} from "@/helpers/validation-rules";

const registerForm = {
  name: "",
  email: "",
  password: ""
};

export default {
  data: () => ({
    valid: false,
    form: Object.assign({}, registerForm),
    passwordRules,
    nameRules,
    emailRules,
    lazy: false,
    loading: false,
    error: null
  }),
  methods: {
    registerUser() {
      this.loading = true;
      this.register(this.form)
        .then(() => {
          this.loading = false;
          this.form = Object.assign({}, registerForm);
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
    ...mapActions("auth", ["register"])
  }
};
</script>
