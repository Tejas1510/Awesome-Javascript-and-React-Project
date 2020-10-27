!<template>
  <section>
    <h1>login</h1>
    <div v-if="logginIn">
      <img src="../assets/Dual Ring-1s-200px.svg" />
    </div>
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>
    <form @submit.prevent="login()" v-if="!logginIn">
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
          Enter username to login.
        </h5>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          type="password"
          class="form-control"
          id="password"
          aria-describedby="passwordhelp"
          placeholder="Enter password"
          required
        />
        <h5 id="passwordhelp" class="form-text text-muted">
          Enter password to login.
        </h5>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </section>
</template>

<script>
import Joi from "joi";
const LOGIN_URL = "http://localhost:5000/auth/login";
import loadingGif from "../assets/Dual Ring-1s-200px.svg";
const schema = Joi.object({
  username: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9_.]{3,30}$"))
    .required(),
  password: Joi.string().trim().min(6).required(),
});
export default {
  data: () => ({
    errorMessage: "",
    logginIn: false,
    user: {
      username: "",
      password: "",
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
    login() {
      this.logginIn = true;
      this.errorMessage = "";
      if (this.validUser()) {
        const body = {
          username: this.user.username,
          password: this.user.password,
        };
        fetch(LOGIN_URL, {
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
              this.logginIn = false;
              console.log(result);
              this.$router.push("/dashboard");
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              this.logginIn = false;
              this.errorMessage = "Unable to login";
            }, 1000);
          });
      }
    },
    validUser() {
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