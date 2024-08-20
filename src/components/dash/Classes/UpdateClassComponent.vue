<template>
  <div
    :class="`up-class-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <CoverFormComponent />
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_class.page_title
            : this.$store.state.Arabic.update_class.page_title
        }}
      </h3>
    </div>

    <div class="form">
      <!-- cover container  -->
      <div
        :class="`cover-cont`"
        @click="this.$store.commit('Change_cover_form_status')"
      >
        <img
          :src="
            this.$store.state.selected_cover ? this.readerFile() : this.cover
          "
          alt=""
        />
      </div>
      <!-- cover container  -->

      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_class.title
          : this.$store.state.Arabic.update_class.title
      }}</label>

      <input
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_class.title_placeholder
            : this.$store.state.Arabic.update_class.title_placeholder
        "
      />
      <!-- title  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_class.note
          : this.$store.state.Arabic.update_class.note
      }}</label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.update_class.note_placeholder
            : this.$store.state.Arabic.update_class.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- subject  -->
      <label for="subject">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_class.subject
          : this.$store.state.Arabic.update_class.subject
      }}</label>

      <select name="" id="subject" v-model="this.subject">
        <option
          v-for="(subject, index) in this.$store.state.subjects_list"
          :key="index"
          :value="subject.English"
        >
          {{
            this.$store.state.language == "English"
              ? subject.English
              : subject.Arabic
          }}
        </option>
      </select>
      <!-- subject  -->

      <!-- class level  -->
      <label for="class_level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.update_class.class_level
          : this.$store.state.Arabic.update_class.class_level
      }}</label>

      <select name="" id="class_level" v-model="this.class_level">
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

      <!-- teacher  -->
      <label for="">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_class.teachers_section_title
            : this.$store.state.Arabic.update_class.teachers_section_title
        }}</label
      >

      <!-- choosed teacher container -->
      <div class="teacher-cont">
        <icon icon="plus" @click="this.$store.commit(`ChooseTeacher`)" />
        <div class="teacher" v-if="this.$store.state.choosed_teacher">
          <!-- avatar  -->
          <img :src="this.$store.state.choosed_teacher.avatar" alt="Image" />
          <!-- avatar  -->

          <!-- info cont  -->

          <div class="info">
            <h3>{{ this.$store.state.choosed_teacher.name }}</h3>

            <p>
              ⚧️ : {{ this.$store.state.choosed_teacher.gender }}
              {{
                this.$store.state.choosed_teacher.gender == "male" ? "🚹" : "🚺"
              }}
            </p>

            <p v-if="this.$store.state.choosed_teacher.classes">
              🏛️ : {{ this.$store.state.choosed_teacher.classes.length }}
            </p>

            <p>{{ this.$store.state.choosed_teacher.gender }}</p>

            <p v-if="this.$store.state.choosed_teacher.editor" class="editor">
              {{ this.$store.state.choosed_teacher.editor ? "editor" : null }}
            </p>

            <p>⭐ : {{ this.$store.state.choosed_teacher.rate }}</p>

            <p>📚📖📑 : {{ this.$store.state.choosed_teacher.subject }}</p>

            <p>🏫🪜🎚️ : {{ this.$store.state.choosed_teacher.class_level }}</p>
          </div>
          <!-- info cont  -->

          <!-- remove the choosed teacher  -->
          <button @click="RemoveTeacher">
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.update_class.remove_button
                : this.$store.state.Arabic.update_class.remove_button
            }}
          </button>
          <!-- remove the choosed teacher  -->
        </div>
      </div>
      <!-- choosed teacher container -->
      <!-- teacher  -->

      <button>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_class.button
            : this.$store.state.Arabic.update_class.button
        }}
      </button>
    </div>
  </div>
</template>

<script>
import CoverFormComponent from "@/components/global/forms/dash/class/CoverFormComponent.vue";
import axios from "axios";
export default {
  name: "update-class-component",
  data() {
    return {
      status: "close",
      // title
      title: this.$store.state.class_for_update
        ? this.$store.state.class_for_update.title
        : "",
      // note
      note: this.$store.state.class_for_update.note,
      // class level
      class_level: this.$store.state.class_for_update.class_level,
      // subject
      subject: this.$store.state.class_for_update.subject,
      // teacher
      teacher: this.$store.state.class_for_update.teacher,
      // cover
      cover: this.$store.state.class_for_update.cover,
      // form data
      formData: new FormData(),
    };
  },
  components: {
    CoverFormComponent,
  },
  mounted() {
    // to open the page smooth
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

      reader.readAsDataURL(this.$store.state.selected_cover[0]);

      // return the avatar to use the ass a path in avatar image
      return this.avatar;
    },

    // remove the choosed teacher method
    RemoveTeacher() {
      this.$store.state.choosed_teacher = "";
    },
  },
};
</script>
