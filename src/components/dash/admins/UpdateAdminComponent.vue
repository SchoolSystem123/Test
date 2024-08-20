<template>
  <div
    :class="`up-admin-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <AvatarFormComponentVue />
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.title
            : this.$store.state.Arabic.update_admin.title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- avatar container  -->
      <div
        :class="`avatar-cont-${this.$store.state.theme}`"
        @click="this.$store.commit('Change_avatar_form_status')"
      >
        <img
          :src="
            this.$store.state.selectd_images.length > 0
              ? this.readerFile()
              : this.avatar
          "
          alt=""
        />
      </div>
      <!-- avatar container  -->

      <!-- name  -->
      <label for="name">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_admin.name
          : this.$store.state.Arabic.update_admin.name
      }}</label>

      <input type="text" placeholder="name" v-model="this.name" id="name" />
      <!-- name  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_admin.password
          : this.$store.state.Arabic.update_admin.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.update_admin.password_placeholder
              : this.$store.state.Arabic.update_admin.password_placeholder
          "
          v-model="this.password"
          id="password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <!-- Phone Number  -->
      <label for="phone">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.phone_number
            : this.$store.state.Arabic.update_admin.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_admin.phone_placeholder
            : this.$store.state.Arabic.update_admin.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.gender
            : this.$store.state.Arabic.update_admin.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.male
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
            ? this.$store.state.English.update_admin.admin_access
            : this.$store.state.Arabic.update_admin.admin_access
        }}</label
      >

      <select name="" id="Permissions" v-model="Permissions">
        <option value="true">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.admin
              : this.$store.state.Arabic.update_admin.admin
          }}
        </option>
        <option value="false">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_admin.not_admin
              : this.$store.state.Arabic.update_admin.not_admin
          }}
        </option>
      </select>
      <!-- admin's Permissions  -->

      <!-- update button  -->
      <button @click="UpdateAdmin">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_admin.button
            : this.$store.state.Arabic.update_admin.button
        }}
      </button>
      <!-- update button  -->
    </div>
  </div>
</template>

<script>
import AvatarFormComponentVue from "@/components/global/forms/AvatarFormComponent.vue";
import axios from "axios";
export default {
  name: "update-admin-component",
  data() {
    return {
      status: "close",
      // name
      name: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.name
        : "",
      // password
      password: "",
      // phone number
      phone_number: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.phone_number
        : "",
      // gender
      gender: this.$store.state.admin_for_update
        ? this.$store.state.admin_for_update.gender
        : "",
      // delete avatar
      delete_avatar: "",
      // Permissions
      Permissions: this.$store.state.admin_for_update.is_admin ? true : false,
      // password input type
      password_type: "password",
      // default avatar
      avatar: this.$store.state.admin_for_update.avatar,
      // form data
      formData: new FormData(),
    };
  },
  components: {
    AvatarFormComponentVue,
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // update admin method
    async UpdateAdmin() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the super admin id to form data
      this.formData.append("super_admin_id", this.$store.state.user.user._id);

      // add the admin id to the form data
      this.formData.append("admin_id", this.$store.state.admin_for_update._id);

      // add the name to form data
      if (this.name != this.$store.state.admin_for_update.name) {
        this.formData.append("name", this.name);
      }

      // add the phone number to form data
      if (
        this.phone_number != this.$store.state.admin_for_update.phone_number
      ) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender != this.$store.state.admin_for_update.gender) {
        this.formData.append("gender", this.gender);
      }

      // add the password to form data
      if (this.password != "") {
        this.formData.append("password", this.password);
      }

      // add the the new avatar to form data
      if (this.$store.state.selectd_images.length > 0) {
        for (const file of this.$store.state.selectd_images) {
          this.formData.append("avatar", file, file.name);
        }
      }

      // add the admin's Permissions
      if (this.Permissions != this.$store.state.admin_for_update.is_admin) {
        this.formData.append("is_admin", this.Permissions);
      }

      // add the delete avatar filed
      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      await axios
        .put(this.$store.state.APIs.admins.super.update, this.formData, {
          headers,
        })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the admin for update in store
          this.$store.state.admin_for_update = "";

          // open the admins component
          this.$store.state.active_component_in_dash = "admins";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // change the input type on click the eye icon
    ChangeInputType() {
      this.password_type =
        this.password_type == "password" ? "text" : "password";
    },

    // reader selecetd image
    readerFile() {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.avatar = e.target.result;
      };

      reader.readAsDataURL(this.$store.state.selectd_images[0]);

      // return the avatar to use the ass a path in avatar image
      return this.avatar;
    },
  },
};
</script>
