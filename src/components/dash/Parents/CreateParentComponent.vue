<template>
  <div
    :class="`create-parent-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_parent.title
            : this.$store.state.Arabic.create_parent.title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- admin avatar -->
      <div :class="`avatar-${this.$store.state.theme}`">
        <label for="avatar" id="avatar-label">
          <input
            type="file"
            id="avatar"
            ref="avatar"
            @change="onImageSelected"
          />
          <img
            :src="
              this.$store.state.selectd_images.length > 0
                ? this.readerFile()
                : this.avatar
            "
            alt=""
          />
        </label>
      </div>
      <!-- admin avatar -->

      <!-- name  -->
      <label for="name">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_parent.name
          : this.$store.state.Arabic.create_parent.name
      }}</label>

      <input type="text" placeholder="name" v-model="this.name" id="name" />
      <!-- name  -->

      <!-- email  -->
      <label for="email">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_parent.email
          : this.$store.state.Arabic.create_parent.email
      }}</label>

      <input
        type="email"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_parent.email_placeholder
            : this.$store.state.Arabic.create_parent.email_placeholder
        "
        v-model="this.email"
        id="email"
      />
      <!-- email  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_parent.password
          : this.$store.state.Arabic.create_parent.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.create_parent.password_placeholder
              : this.$store.state.Arabic.create_parent.password_placeholder
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
            ? this.$store.state.English.create_parent.phone_number
            : this.$store.state.Arabic.create_parent.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_parent.phone_placeholder
            : this.$store.state.Arabic.create_parent.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_parent.gender
            : this.$store.state.Arabic.create_parent.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_parent.male
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
            ? this.$store.state.English.create_parent.children_title
            : this.$store.state.Arabic.create_parent.children_title
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
                  ? this.$store.state.English.create_parent.remove_button
                  : this.$store.state.Arabic.create_parent.remove_button
              }}
            </button>
          </div>
        </div>
      </div>

      <!-- update button  -->
      <button @click="UpdateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_parent.button
            : this.$store.state.Arabic.create_parent.button
        }}
      </button>
      <!-- update button  -->
    </div>
  </div>
</template>

<script>
import Female_icon from "../../../assets/femal-default-icon.png";
import Male_icon from "../../../assets/male-default-icon.png";
import axios from "axios";
export default {
  name: "update-student-component",
  data() {
    return {
      status: "close",
      // name
      name: "",
      // password
      password: "",
      // email
      email: "",
      // phone number
      phone_number: "",
      // gender
      gender: "male",
      // password input type
      password_type: "password",
      // default avatar
      avatar: this.gender === "male" ? Female_icon : Male_icon,
      // form data
      formData: "",
    };
  },
  components: {},
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

      // add the name to form data
      if (this.name != this.$store.state.parent_for_update.name) {
        this.formData.append("name", this.name);
      }

      // add the email
      this.formData.append("email", this.email);

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

      await axios
        .post(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.parents.super.create
            : this.$store.state.APIs.parents.admin.create,
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

          // emptying the choosed children array
          this.$store.state.choosed_children = [];

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // open the parents component
          this.$store.state.active_component_in_dash = "parents";
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_student array in store
          this.$store.state.geted_student = "";

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

    // select the images
    onImageSelected(event) {
      // catch the selected image
      const file = event.target.files[0];

      // emptying the selected images array in store
      this.$store.state.selectd_images = [];

      // add the selected file to selectd_images array in store
      this.$store.state.selectd_images.push(file);
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
