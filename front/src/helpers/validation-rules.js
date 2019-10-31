export const passwordRules = [
  v => !!v || "Password is required",
  v => (v && v.length > 5) || "Password must be at least 5 characters"
];

export const emailRules = [
  v => !!v || "E-mail is required",
  v => /.+@.+\..+/.test(v) || "E-mail must be valid"
];

export const nameRules = [
  v => !!v || "Name is required",
  v => (v && v.length > 5) || "Name must be at least 5 characters"
];
