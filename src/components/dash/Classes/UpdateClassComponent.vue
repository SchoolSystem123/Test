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
          <img
            :src="this.$store.state.choosed_teacher.avatar"
            alt="Image"
            @click="GoTeacher(this.$store.state.choosed_teacher._id)"
          />
          <!-- avatar  -->

          <!-- info cont  -->

          <div
            class="info"
            @click="GoTeacher(this.$store.state.choosed_teacher._id)"
          >
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

      <button @click="UpdateClass">
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
      title: this.$store.state.class_for_update.title,
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
      // api
      api: "",
      // form data
      formData: "",
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
    // update class method
    async UpdateClass() {
      // create a new form data
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        // update the api
        this.api = this.$store.state.APIs.classes.super.update;

        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // update admin
        this.api = this.$store.state.APIs.classes.admin.update;

        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        // update api
        this.api = this.$store.state.APIs.classes.teacher.update;

        // add the teacher id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      }

      // add the class id to the form data
      this.formData.append("class_id", this.$store.state.class_for_update._id);

      // add the title to form data
      if (this.title != this.$store.state.class_for_update.title) {
        this.formData.append("title", this.title);
      }

      // add the note to form data
      if (this.note != this.$store.state.class_for_update.note) {
        this.formData.append("note", this.note);
      }

      // add the subject to form data
      if (this.subject != this.$store.state.class_for_update.subject) {
        this.formData.append("subject", this.subject);
      }

      // add the class level
      if (this.class_level != this.$store.state.class_for_update.class_level) {
        this.formData.append("class_level", this.class_level);
      }

      // add the teacher
      if (
        this.$store.state.choosed_teacher._id !=
        this.$store.state.class_for_update.teacher._id
      ) {
        this.formData.append(
          "teacher_id",
          this.$store.state.choosed_teacher._id
        );
      }

      // add the cover
      if (this.$store.state.selected_cover) {
        // create a new array from selected cover in store
        let cover = Array.from(this.$store.state.selected_cover);
        for (const file of cover) {
          this.formData.append("cover", file, file.name);
        }
      }

      // add the delete cover filed
      if (
        this.$store.state.delete_cover == "true" ||
        this.$store.state.selected_cover
      ) {
        // add the delete cover state from store to formData
        this.formData.append("delete_cover", this.$store.state.delete_cover);
      }

      await axios
        .put(this.api, this.formData, {
          headers,
        })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // emptying the selecetd cover from store
          this.$store.state.selected_cover = "";

          // emptying the choosed teacher
          this.$store.state.choosed_teacher = "";

          // emptying the admin for update in store
          this.$store.state.class_for_update = "";

          // open the admins component
          this.$store.state.active_component_in_dash = "classes";
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
        this.cover = e.target.result;
      };

      reader.readAsDataURL(this.$store.state.selected_cover[0]);

      // return the cover to use the ass a path in cover image
      return this.cover;
    },

    // remove the choosed teacher method
    RemoveTeacher() {
      this.$store.state.choosed_teacher = "";
    },

    // go to teacher metho
    GoTeacher(id) {
      window.location = `/teacher/${id}`;
    },
  },
};
</script>
