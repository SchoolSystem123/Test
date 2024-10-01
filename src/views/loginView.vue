<template>
  <div
    :class="`login-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
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
      if (this.email.startsWith("A:")) {
        this.api = this.$store.state.APIs.login.Admin;
        this.user_type = "admin";
      } else if (this.email.startsWith("T:")) {
        this.api = this.$store.state.APIs.login.Teacher;
        this.user_type = "teacher";
      } else if (this.email.startsWith("S:")) {
        this.api = this.$store.state.APIs.login.Student;
        this.user_type = "student";
      } else if (this.email.startsWith("SA:")) {
        this.api = this.$store.state.APIs.login.Super;
        this.user_type = "super";
      } else if (this.email.startsWith("P:")) {
        this.api = this.$store.state.APIs.login.Parent;
        this.user_type = "parent";
      }
    },

    // log in method
    async Login() {
      // to select the api
      this.SelectApi();

      // check if the user added the email
      if (this.email == "") {
        // to set the reqeust's error message to error message var in store
        this.$store.state.error_message = {
          english: "Sorry, you must enter your email address ...",
          arabic: "... عذرال, يجب ان تكتب الإيميل الخاص بك",
        };

        // to open the error form
        this.$store.state.error_form_status = "open";

        // stop the code
        return;
      }

      // check if the user added the password
      if (this.password == "") {
        // to set the reqeust's error message to error message var in store
        this.$store.state.error_message = {
          english: "Sorry, you must enter your password ...",
          arabic: "... عذرال, يجب ان تكتب كلمة المرور الخاصة بك",
        };

        // to open the error form
        this.$store.state.error_form_status = "open";

        // stop the code
        return;
      }

      // check if the email start's with any key char
      if (!this.email.includes(":")) {
        // to set the reqeust's error message to error message var in store
        this.$store.state.error_message = {
          english:
            "Sorry, you must identify yourself by adding keywords before the email ...",
          arabic:
            "عذرا يجب تحديد هويتك من خلال اضافة أحرف مفتاحية قبل الإيميل ...",
        };

        // to open the error form
        this.$store.state.error_form_status = "open";

        return;
      }

      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .post(this.api, {
          // delete the fisrt Chars from email ( this fisrt chars is for select the whitch api use to login )
          email: this.email.split(":")[1],
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

<style lang="scss">
@import "../Sass/varibels/variables";
// darckand light English style
.login-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;

  .cont {
    width: 50%;
    margin: auto;
    overflow: hidden;
    padding: 10px;
    @media (max-width: $phone) {
      width: 100%;
    }

    @media (min-width: $phone) and (max-width: $tablet) {
      width: 80%;
    }

    @media (min-width: $laptop) {
      width: 50%;
    }

    .login-form {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      direction: ltr;

      @media (min-width: $phone) {
        margin-top: 5%;
      }

      @media (max-width: $phone) {
        width: 100%;
      }

      img {
        width: 100px;
        height: 100px;
        margin-top: 100px;
      }

      h3 {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
        margin: 10px 0px;
      }

      label {
        width: 100%;
        height: auto;
        color: $font-light;
        margin: 20px 0px 5px 0px;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        padding: 0px 10px;
        outline: none;
        background-color: $light-input;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      .password {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: $light-input;

        input {
          width: 92%;
          background-color: $light-input;
        }

        svg {
          transition-duration: 0.5s;
          cursor: pointer;
          @media (min-width: $tablet) {
            margin-left: 20px;
          }
        }

        svg:hover {
          color: $blue;
        }

        #text-eye {
          color: $blue;
        }
      }

      // log in button style
      .theme-blue {
        padding: 10px 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: linear-gradient(to top, $first-blue, $second-blue);
        color: $font-light;
        margin: 20px 0px;
        cursor: pointer;
      }

      .theme-pink {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      .theme-orange {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      .theme-green {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }
    }
  }
}

.login-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;

  .cont {
    width: 50%;
    margin: auto;
    overflow: hidden;
    padding: 10px;
    @media (max-width: $phone) {
      width: 100%;
    }

    @media (min-width: $phone) and (max-width: $tablet) {
      width: 80%;
    }

    @media (min-width: $laptop) {
      width: 50%;
    }

    .login-form {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      direction: ltr;

      @media (min-width: $phone) {
        margin-top: 5%;
      }

      @media (max-width: $phone) {
        width: 100%;
      }

      img {
        width: 100px;
        height: 100px;
        margin-top: 100px;
      }

      h3 {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
        margin: 10px 0px;
      }

      label {
        width: 100%;
        height: auto;
        color: $font-darck;
        margin: 20px 0px 5px 0px;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 0px 10px;
        background-color: $light-input;
      }

      .password {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: $light-input;

        input {
          width: 92%;
          background-color: $light-input;
        }

        svg {
          transition-duration: 0.5s;
          cursor: pointer;
          @media (min-width: $tablet) {
            margin-left: 20px;
          }
        }

        svg:hover {
          color: $blue;
        }

        #text-eye {
          color: $blue;
        }
      }

      // log in button style
      .theme-blue {
        padding: 10px 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: linear-gradient(to top, $first-blue, $second-blue);
        color: $font-light;
        margin: 20px 0px;
        cursor: pointer;
      }

      .theme-pink {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      .theme-orange {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      .theme-green {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }
    }
  }
}
// darckand light English style

// darckand light Arabic style
.login-page-darck-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;

  .cont {
    width: 50%;
    margin: auto;
    overflow: hidden;
    padding: 10px;
    @media (max-width: $phone) {
      width: 100%;
    }

    @media (min-width: $phone) and (max-width: $tablet) {
      width: 80%;
    }

    @media (min-width: $laptop) {
      width: 50%;
    }

    .login-form {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      direction: rtl;

      @media (min-width: $phone) {
        margin-top: 5%;
      }

      @media (max-width: $phone) {
        width: 100%;
      }

      img {
        width: 100px;
        height: 100px;
        margin-top: 100px;
      }

      h3 {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-light;
        margin: 10px 0px;
      }

      label {
        width: 100%;
        height: auto;
        color: $font-light;
        margin: 20px 0px 5px 0px;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-light transparent;
      }

      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 0px 10px;
        background-color: $light-input;
      }

      .password {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: $light-input;

        input {
          width: 92%;
          background-color: $light-input;
        }

        svg {
          transition-duration: 0.5s;
          cursor: pointer;
          @media (min-width: $tablet) {
            margin-left: 20px;
          }
        }

        svg:hover {
          color: $blue;
        }

        #text-eye {
          color: $blue;
        }
      }

      // log in button style
      .theme-blue {
        padding: 10px 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: linear-gradient(to top, $first-blue, $second-blue);
        color: $font-light;
        margin: 20px 0px;
        cursor: pointer;
      }

      .theme-pink {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      .theme-orange {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      .theme-green {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }
    }
  }
}

.login-page-light-Arabic {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;

  .cont {
    width: 50%;
    margin: auto;
    overflow: hidden;
    padding: 10px;
    @media (max-width: $phone) {
      width: 100%;
    }

    @media (min-width: $phone) and (max-width: $tablet) {
      width: 80%;
    }

    @media (min-width: $laptop) {
      width: 50%;
    }

    .login-form {
      width: 100%;
      height: auto;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      position: relative;
      direction: rtl;

      @media (min-width: $phone) {
        margin-top: 5%;
      }

      @media (max-width: $phone) {
        width: 100%;
      }

      img {
        width: 100px;
        height: 100px;
        margin-top: 100px;
      }

      h3 {
        width: 100%;
        height: auto;
        text-align: center;
        color: $font-darck;
        margin: 10px 0px;
      }

      label {
        width: 100%;
        height: auto;
        color: $font-darck;
        margin: 20px 0px 5px 0px;
        padding: 5px 0px;
        border: 1px solid;
        border-color: transparent transparent $border-darck transparent;
      }

      input {
        width: 100%;
        height: 40px;
        border-radius: 5px;
        border: none;
        outline: none;
        padding: 0px 10px;
        background-color: $light-input;
      }

      .password {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        border-radius: 5px;
        background-color: $light-input;

        input {
          width: 92%;
          background-color: $light-input;
        }

        svg {
          transition-duration: 0.5s;
          cursor: pointer;
          @media (min-width: $tablet) {
            margin-left: 20px;
          }
        }

        svg:hover {
          color: $blue;
        }

        #text-eye {
          color: $blue;
        }
      }

      // log in button style
      .theme-blue {
        padding: 10px 20px;
        border: none;
        outline: none;
        border-radius: 5px;
        background: linear-gradient(to top, $first-blue, $second-blue);
        color: $font-light;
        margin: 20px 0px;
        cursor: pointer;
      }

      .theme-pink {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-pink, $second-pink);
      }

      .theme-orange {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-orange, $second-orange);
      }

      .theme-green {
        @extend .theme-blue;
        background: linear-gradient(to top, $first-green, $second-green);
      }
    }
  }
}
// darckand light Arabic style
</style>
