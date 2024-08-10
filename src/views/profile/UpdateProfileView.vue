<template>
  <div
    :class="`up-profil-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <LoadingComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <ScrollTopComponentVue />
    <AvatarFormComponentVue />
    <div :class="this.status ? 'open-cont' : 'close-cont'">
      <input type="file" id="avatar" />

      <!-- avatar section  -->
      <div class="avatar-section">
        <div :class="`avatar-cont-${this.$store.state.theme}`">
          <img
            v-if="this.$store.state.user"
            :src="this.$store.state.user.user.avatar"
            alt="avatar"
            @click="this.$store.commit('Changeavatar_form_status')"
          />
        </div>
      </div>
      <!-- avatar section  -->

      <div class="form">
        <!-- name label  -->
        <label for="name">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.name
              : this.$store.state.Arabic.update_profile.name
          }}
        </label>
        <!-- name label  -->

        <!-- name input  -->
        <input type="name" v-model="this.name" id="name" />
        <!-- name input  -->

        <!-- about_me label  -->
        <label
          for="about_me"
          v-if="
            this.$store.state.user.user_type != 'admin' &&
            this.$store.state.user.user_type != 'parent' &&
            this.$store.state.user.user_type != 'super'
          "
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.about_me
              : this.$store.state.Arabic.update_profile.about_me
          }}</label
        >
        <!-- about_me label  -->

        <!-- about me input  -->
        <textarea
          name=""
          v-if="
            this.$store.state.user.user_type != 'admin' &&
            this.$store.state.user.user_type != 'parent' &&
            this.$store.state.user.user_type != 'super'
          "
          id="about_me"
          :aria-valuemax="this.about_me"
          v-model="this.about_me"
        >
        </textarea>
        <!-- about me input  -->

        <!-- password label  -->
        <label for="password">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.password
              : this.$store.state.Arabic.update_profile.password
          }}</label
        >
        <!-- password label  -->

        <!-- password input  -->
        <input type="password" v-model="this.password" />
        <!-- password input  -->

        <!-- gender  -->
        <label for="gender">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_admin.gender
              : this.$store.state.Arabic.create_admin.gender
          }}</label
        >

        <select name="" id="gender" v-model="gender">
          <option value="male">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.create_admin.male
                : this.$store.state.Arabic.create_admin.male
            }}
          </option>
          <option value="female">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.create_admin.female
                : this.$store.state.Arabic.create_admin.female
            }}
          </option>
        </select>
        <!-- gender  -->

        <!-- admin's Permissions  -->
        <label for="Permissions">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_admin.admin_access
              : this.$store.state.Arabic.create_admin.admin_access
          }}</label
        >

        <select name="" id="Permissions" v-model="Permissions">
          <option value="true">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.create_admin.admin
                : this.$store.state.Arabic.create_admin.admin
            }}
          </option>
          <option value="false">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.create_admin.not_admin
                : this.$store.state.Arabic.create_admin.not_admin
            }}
          </option>
        </select>
        <!-- admin's Permissions  -->

        <!-- phone label  -->
        <label for="phone">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.phone
              : this.$store.state.Arabic.update_profile.phone
          }}</label
        >
        <!-- phone label  -->

        <!-- phone input  -->
        <input type="text" v-model="this.phone" />
        <!-- phone input  -->

        <!-- update button  -->
        <button
          :class="`${this.$store.state.theme}`"
          @click="UpdateProfileData"
        >
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.button
              : this.$store.state.Arabic.update_profile.button
          }}
        </button>
        <!-- update button  -->
      </div>
    </div>
  </div>
</template>

<script>
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import AvatarFormComponentVue from "@/components/global/forms/AvatarFormComponent.vue";
import axios from "axios";

export default {
  name: "update-profile",
  data() {
    return {
      status: false,
      // name
      name: this.$store.state.user.user.name,
      // about_me
      about_me: this.$store.state.user.user.about_me,
      // phone
      phone: this.$store.state.user.user.phone_number,
      // password
      password: "",
      // gender
      gender: this.$store.state.user.user.gender,
      // api
      api: "",
      // form data
      formData: new FormData(),
    };
  },
  components: {
    ErrorComponentVue,
    LoadingComponentVue,
    SmallNavComponentVue,
    SidBarComponentVue,
    ScrollTopComponentVue,
    AvatarFormComponentVue,
  },
  mounted() {
    setTimeout(() => {
      this.status = true;
    }, 500);

    // check if the user is loged in
    if (!this.$store.state.user.user) {
      //send the user to log in page
      window.location = "/login";
    }
  },
  methods: {
    // select the api
    SelectApi() {
      if (this.$store.state.user.user_type == "super") {
        this.api = this.$store.state.APIs.super.update;
        // add the user id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        this.api = this.$store.state.APIs.admins.update;
        // add the user id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        this.api = this.$store.state.APIs.teachers.update;
        // add the user id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "student") {
        this.api = this.$store.state.APIs.students.update;
        // add the user id to form data
        this.formData.append("student_id", this.$store.state.user.user._id);
      } else {
        this.api = this.$store.state.APIs.parents.update;
        // add the user id to form data
        this.formData.append("parent_id", this.$store.state.user.user._id);
      }
    },

    async UpdateProfileData() {
      // to start the loading
      this.$store.state.loading = "open";

      // call to select api method
      this.SelectApi();

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add name to form data
      if (this.name && this.name != this.$store.state.user.user.name) {
        this.formData.append("name", this.name);
      }

      // add about me to form data
      if (
        this.about_me &&
        this.about_me != this.$store.state.user.user.about_me
      ) {
        this.formData.append("about_me", this.about_me);
      }

      // add password to form data
      if (
        this.password &&
        this.password != this.$store.state.user.user.password
      ) {
        this.formData.append("password", this.password);
      }

      // add phone to form data
      if (
        this.phone &&
        this.phone != this.$store.state.user.user.phone_number
      ) {
        this.formData.append("phone_number", this.phone);
      }

      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      // check if the selected images array in stor has any image
      if (this.$store.state.selectd_images.length > 0) {
        // add all images as array in formData
        for (let file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      // send the request
      await axios
        .put(this.api, this.formData, { headers })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // getc to old user data from localStorage
          const oldData = JSON.parse(window.localStorage.getItem("Ss-user"));

          // update the user data
          oldData.user = response.data.user_data;

          // save the user data in localStorage
          window.localStorage.setItem("Ss-user", JSON.stringify(oldData));

          // reload the page
          window.location.reload();
        })
        .catch((error) => {
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
