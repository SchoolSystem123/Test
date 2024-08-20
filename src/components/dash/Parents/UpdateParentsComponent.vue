<template>
  <div
    :class="`up-parent-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <AvatarFormComponentVue />
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.title
            : this.$store.state.Arabic.update_parent.title
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
          ? this.$store.state.English.update_parent.name
          : this.$store.state.Arabic.update_parent.name
      }}</label>

      <input type="text" placeholder="name" v-model="this.name" id="name" />
      <!-- name  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_parent.password
          : this.$store.state.Arabic.update_parent.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.update_parent.password_placeholder
              : this.$store.state.Arabic.update_parent.password_placeholder
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
            ? this.$store.state.English.update_parent.phone_number
            : this.$store.state.Arabic.update_parent.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_parent.phone_placeholder
            : this.$store.state.Arabic.update_parent.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.gender
            : this.$store.state.Arabic.update_parent.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_parent.male
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

      <label for="select-children">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.children_title
            : this.$store.state.Arabic.update_parent.children_title
        }}
      </label>

      <div class="children">
        <icon icon="plus" @click="this.$store.commit('ChooseChildren')" />
        <div
          class="students-cont"
          v-if="this.$store.state.choosed_children.length > 0"
        >
          <div
            class="student"
            v-for="(student_data, index) in this.$store.state.choosed_children"
            :key="index"
          >
            <img
              :src="student_data.avatar"
              alt="avatar"
              @click="GetStudent(student_data._id)"
            />
            <div class="info" @click="GetStudent(student_data._id)">
              <h3>{{ student_data.name }}</h3>
            </div>

            <button @click="RemoveChild(student_data._id)">
              {{
                this.$store.state.language == "English"
                  ? this.$store.state.English.update_parent.remove_button
                  : this.$store.state.Arabic.update_parent.remove_button
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- update button  -->
      <button @click="UpdateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_parent.button
            : this.$store.state.Arabic.update_parent.button
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
  name: "update-student-component",
  data() {
    return {
      status: "close",
      // name
      name: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.name
        : "",
      // password
      password: "",
      // phone number
      phone_number: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.phone_number
        : "",
      // gender
      gender: this.$store.state.parent_for_update
        ? this.$store.state.parent_for_update.gender
        : "",
      // delete avatar
      delete_avatar: "",
      // password input type
      password_type: "password",
      // default avatar
      avatar: this.$store.state.parent_for_update.avatar,
      // form data
      formData: "",
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
    // update student method
    async UpdateStudent() {
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // check who want update the teacher account
      if (this.$store.state.user.user_type == "super") {
        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      }

      // add the parent id to formData
      this.formData.append(
        "parent_id",
        this.$store.state.parent_for_update._id
      );

      // add the name to form data
      if (this.name != this.$store.state.parent_for_update.name) {
        this.formData.append("name", this.name);
      }

      // add the phone number to form data
      if (
        this.phone_number != this.$store.state.parent_for_update.phone_number
      ) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender != this.$store.state.parent_for_update.gender) {
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

      // add the children array
      this.formData.append(
        "children",
        JSON.stringify(this.$store.state.choosed_children)
      );

      // add the delete avatar filed
      if (
        this.$store.state.delete_avatar == "true" ||
        this.$store.state.selectd_images.length > 0
      ) {
        // add the delete avatar state from store to formData
        this.formData.append("delete_avatar", this.$store.state.delete_avatar);
      }

      await axios
        .put(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.parents.super.update
            : this.$store.state.APIs.parents.admin.update,
          this.formData,
          {
            headers,
          }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_student array in store
          this.$store.state.geted_student = "";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the parent for update in store
          this.$store.state.parent_for_update = "";

          // open the parents component
          this.$store.state.active_component_in_dash = "parents";
        })
        .catch((error) => {
          // to emptying the geted_student array in store
          this.$store.state.geted_student = "";

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

    // remove the child
    RemoveChild(id) {
      // find and check to exists studnet in array
      const existingStudent = this.$store.state.choosed_children.find(
        (student) => student._id === id
      );

      if (existingStudent) {
        // Use filter to create a new array without the matching student
        const filteredChildren = this.$store.state.choosed_children.filter(
          (student) => student._id !== existingStudent._id
        );

        // Update the state with the filtered array
        this.$store.state.choosed_children = filteredChildren;
      }
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

    // get to student
    GetStudent(id) {
      window.location = `/student/${id}`;
    },
  },
};
</script>
