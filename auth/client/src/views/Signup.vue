<template>
  <section>
    <h1>Sign up</h1>
    <div v-if="signingUp">
      <img src="../assets/Dual Ring-1s-200px.svg" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form v-if="!signingUp" @submit.prevent="signup">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          type="text"
          class="form-control"
          id="username"
          aria-describedby="usernameHelp"
          placeholder="Enter username"
          required
        />
        <h5 id="usernameHelp" class="form-text text-muted">
          Username must be atleast three characters and can only contain
          alphanumeric char and underscore.
        </h5>
      </div>
      <div class="form-row">
        <div class="form-group col-md-6">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            type="password"
            class="form-control"
            id="password"
            placeholder="password"
            required
          />
          <h5 id="passwordHelp" class="form-text text-muted">
            Password must be 6 char long.
          </h5>
        </div>
        <div class="form-group col-md-6">
          <label for="ConfirmPassword">Confirm Password</label>
          <input
            v-model="user.confirmPassword"
            type="password"
            class="form-control"
            id="ConfirmPassword"
            placeholder="Password"
            required
          />
          <h5 id="ConfirmPasswordHelp" class="form-text text-muted">
            please confirm your password.
          </h5>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Sign up</button>
    </form>
  </section>
</template>
<script>
import Joi from "joi";
import loadingGif from "../assets/Dual Ring-1s-200px.svg";
const SIGNUP_URL = "http://localhost:5000/auth/signup";
const schema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9_.]{3,30}$"))
    .required(),
  password: Joi.string().trim().min(6).required(),
  confirmPassword: Joi.string().trim().min(6).required(),
});
export default {
  data: () => ({
    signingUp: false,
    errorMessage: "",
    user: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  }),
  watch: {
    user: {
      handler: function (val, oldVal) {
        this.errorMessage = "";
      },
      deep: true,
    },
  },
  methods: {
    signup() {
      this.errorMessage = "";
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        this.signingUp = true;
        fetch(SIGNUP_URL, {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            return response.json().then((error) => {
              throw new Error(error.message);
            });
          })
          .then((result) => {
            localStorage.token = result.token;
            setTimeout(() => {
              this.signingUp = false;
              this.$router.push("/dashboard");
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              this.signingUp = false;
              this.errorMessage = error.message;
            }, 1000);
          });
      }
    },
    validUser() {
      if (this.user.password != this.user.confirmPassword) {
        this.errorMessage = "Passwords must match";
        return false;
      }
      const { error, value } = schema.validate(this.user);
      if (error === undefined) return true;
      else {
        if (error.message.includes("username")) {
          this.errorMessage = "Username is invalid";
        } else {
          this.errorMessage = "Password is invalid";
        }
        return false;
      }
    },
  },
};
</script>
<style>
</style>
