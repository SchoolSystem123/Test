<template>
  <div :class="`login-page-${this.$store.state.mood}`">
    <div class="cont">
      <!-- sid bar component  -->
      <SidBarComponentVue />
      <!-- Nav bar component  -->
      <NavComponentVue />
      <!-- Error Form component  -->
      <ErrorComponentVue />
      <!-- Loading component  -->
      <LoadingComponentVue />
      <div class="login-form">
        <!-- logo  -->
        <img src="../assets/logo.png" alt="" />
        <!-- title  -->
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.login.title
              : this.$store.state.Arabic.login.title
          }}
        </h3>
        <!-- info component  -->
        <InfoComponentVue />
        <!-- email label  -->
        <label for="email">{{
          this.$store.state.language == "English"
            ? this.$store.state.English.login.label.label_one
            : this.$store.state.Arabic.login.label.label_one
        }}</label>

        <!-- email input  -->
        <input
          type="email"
          id="email"
          v-model="this.email"
          :placeholder="`${
            this.$store.state.language == 'English'
              ? this.$store.state.English.login.placeholder.email
              : this.$store.state.Arabic.login.placeholder.email
          }`"
        />

        <!-- password label  -->
        <label for="password">{{
          this.$store.state.language == "English"
            ? this.$store.state.English.login.label.label_tow
            : this.$store.state.Arabic.login.label.label_tow
        }}</label>

        <!-- password container -->
        <div class="password">
          <input
            :type="this.inputType"
            id="password"
            v-model="this.password"
            :placeholder="`${
              this.$store.state.language == 'English'
                ? this.$store.state.English.login.placeholder.password
                : this.$store.state.Arabic.login.placeholder.password
            }`"
          />
          <icon
            icon="eye"
            :id="`${this.inputType}-eye`"
            @click="changeInoutType"
          />
        </div>

        <!-- log n button  -->
        <button :class="`theme-${this.$store.state.theme}`" @click="Login">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.login.button
              : this.$store.state.Arabic.login.button
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import NavComponentVue from "@/components/global/NavComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import InfoComponentVue from "@/components/global/InfoComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import axios from "axios";

export default {
  name: "login-page",
  data() {
    return {
      inputType: "password",
      email: "",
      password: "",
      api: "",
      user_type: "",
    };
  },
  components: {
    SidBarComponentVue,
    NavComponentVue,
    ErrorComponentVue,
    InfoComponentVue,
    LoadingComponentVue,
  },
  methods: {
    changeInoutType() {
      this.inputType = this.inputType == "password" ? "text" : "password";
    },

    // select the api
    SelectApi() {
      if (this.email.startsWith("A")) {
        this.api = this.$store.state.APIs.login.Admin;
        this.user_type = "admin";
      } else if (this.email.startsWith("T")) {
        this.api = this.$store.state.APIs.login.Teacher;
        this.user_type = "teacher";
      } else if (this.email.startsWith("S")) {
        this.api = this.$store.state.APIs.login.Student;
        this.user_type = "student";
      } else if (this.email.startsWith("SA")) {
        this.api = this.$store.state.APIs.login.admin;
        this.user_type = "super";
      } else if (this.email.startsWith("P")) {
        this.api = this.$store.state.APIs.login.Parent;
        this.user_type = "parent";
      }
    },

    // log in method
    Login() {
      // to select the api
      this.SelectApi();

      // to start the loading animation
      this.$store.state.loading = "open";

      console.log(this.api);
      axios
        .post(this.api, {
          // delete the fisrt Char from email ( this fisrt char is for select the whitch api use to login )
          email: this.email.slice(2),
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          // svae user's data in localStorage
          window.localStorage.setItem(
            "Ss-user",
            JSON.stringify({
              user: response.data.user_data,
              token: response.data.token,
              user_type: this.user_type,
            })
          );

          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the inputs values
          this.email = "";
          this.password = "";

          // move to home page
          window.location = "/";
        })
        .catch((error) => {
          // emptying the inputs values
          this.email = "";
          this.password = "";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
