<template>
  <div
    :class="`create-student-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.title
            : this.$store.state.Arabic.create_student.title
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
          ? this.$store.state.English.create_student.name
          : this.$store.state.Arabic.create_student.name
      }}</label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.name_placeholder
            : this.$store.state.Arabic.create_student.name_placeholder
        "
        v-model="this.name"
        id="name"
      />
      <!-- name  -->

      <!-- emaile  -->
      <label for="email">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.email
          : this.$store.state.Arabic.create_student.email
      }}</label>

      <input
        type="email"
        id="email"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_student.email_placeholder
            : this.$store.state.Arabic.update_student.email_placeholder
        "
        v-model="this.email"
      />
      <!-- emaile  -->

      <!-- password  -->
      <label for="password">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.password
          : this.$store.state.Arabic.create_student.password
      }}</label>

      <div class="password">
        <input
          :type="this.password_type"
          :placeholder="
            this.$store.state.language == 'English'
              ? this.$store.state.English.create_student.password_placeholder
              : this.$store.state.Arabic.create_student.password_placeholder
          "
          v-model="this.password"
          id="password"
        />
        <icon icon="eye" @click="ChangeInputType" />
      </div>
      <!-- password  -->

      <label for="about_me">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_student.about_me
          : this.$store.state.Arabic.create_student.about_me
      }}</label>

      <textarea
        v-model="this.about_me"
        id="about_me"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.about_me_placeholder
            : this.$store.state.Arabic.create_student.about_me_placeholder
        "
      ></textarea>

      <!-- birth date  -->
      <label for="birth_date">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.birth_date
            : this.$store.state.Arabic.create_student.birth_date
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.birth_date_placeholder
            : this.$store.state.Arabic.create_student.birth_date_placeholder
        "
        v-model="this.birth_date"
        id="birth_date"
      />
      <!-- birth date  -->

      <!-- Phone Number  -->
      <label for="phone">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.phone_number
            : this.$store.state.Arabic.create_student.phone_number
        }}
      </label>

      <input
        type="text"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_student.phone_placeholder
            : this.$store.state.Arabic.create_student.phone_placeholder
        "
        v-model="this.phone_number"
        id="phone"
      />
      <!-- Phone Number  -->

      <!-- class level  -->
      <label for="class_level">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.class_level
            : this.$store.state.Arabic.create_student.class_level
        }}</label
      >

      <select name="" id="class_level" v-model="class_level">
        <option
          v-for="(class_level, index) in this.$store.state.Classes_level_list"
          :key="index"
          :value="class_level.English"
        >
          {{
            this.$store.state.language == "English"
              ? class_level.English
              : class_level.Arabic
          }}
        </option>
      </select>
      <!-- class level  -->

      <!-- gender  -->
      <label for="gender">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.gender
            : this.$store.state.Arabic.create_student.gender
        }}</label
      >

      <select name="" id="gender" v-model="gender">
        <option value="male">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.create_student.male
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

      <!-- update button  -->
      <button @click="CreateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_student.button
            : this.$store.state.Arabic.create_student.button
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
      // phone number
      phone_number: "",
      // gender
      gender: "male",
      // about me
      about_me: "",
      // birth date
      birth_date: "",
      // password input type
      password_type: "password",
      // email
      email: "",
      // default avatar
      avatar: this.gender === "male" ? Female_icon : Male_icon,
      // class level
      class_level: this.$store.state.student_for_update.class_level,
      // form data
      formData: new FormData(),
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // create student method
    async CreateStudent() {
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
      if (this.name) {
        this.formData.append("name", this.name);
      }

      // add the email
      if (this.email) {
        this.formData.append("email", this.email);
      }

      // add the phone number to form data
      if (this.phone_number) {
        this.formData.append("phone_number", this.phone_number);
      }

      // add the gender to form data
      if (this.gender) {
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

      // add the class level
      if (this.class_level) {
        this.formData.append("class_level", this.class_level);
      }

      // add about me
      if (this.about_me) {
        this.formData.append("about_me", this.about_me);
      }

      // add birth date
      if (this.birth_date) {
        this.formData.append("birth_date", this.birth_date);
      }

      await axios
        .post(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.students.super.create
            : this.$store.state.APIs.students.admin.create,
          this.formData,
          {
            headers,
          }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the selecetd images array from store
          this.$store.state.selectd_images = [];

          // emptying the teacher for update in store
          this.$store.state.student_for_update = "";

          // open the teachers component
          this.$store.state.active_component_in_dash = "students";
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
  },
};
</script>
