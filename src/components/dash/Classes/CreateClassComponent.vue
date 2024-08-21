<template>
  <div
    :class="`create-class-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header -->
    <div class="header">Create Class</div>
    <!-- header -->

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
          ? this.$store.state.English.create_class.title
          : this.$store.state.Arabic.create_class.title
      }}</label>

      <input
        id="title"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_class.title_placeholder
            : this.$store.state.Arabic.create_class.title_placeholder
        "
      />
      <!-- title  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_class.note
          : this.$store.state.Arabic.create_class.note
      }}</label>

      <textarea
        name=""
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_class.note_placeholder
            : this.$store.state.Arabic.create_class.note_placeholder
        "
      ></textarea>
      <!-- note  -->

      <!-- subject  -->
      <label for="subject">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_class.subject
          : this.$store.state.Arabic.create_class.subject
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
          ? this.$store.state.English.create_class.class_level
          : this.$store.state.Arabic.create_class.class_level
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
            ? this.$store.state.English.create_class.teachers_section_title
            : this.$store.state.Arabic.create_class.teachers_section_title
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
                ? this.$store.state.English.create_class.remove_button
                : this.$store.state.Arabic.create_class.remove_button
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
            ? this.$store.state.English.create_class.button
            : this.$store.state.Arabic.create_class.button
        }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Math from "../../../assets/classes covers/Math.jpg";
import Arabic from "../../../assets/classes covers/arabic.jpg";
import English from "../../../assets/classes covers/english.jpg";
import French from "../../../assets/classes covers/french.jpg";
import History from "../../../assets/classes covers/history.jpg";
import Philosophy from "../../../assets/classes covers/phalsephe.jpg";
import Physics from "../../../assets/classes covers/physic.jpg";
import Sciences from "../../../assets/classes covers/sinces.jpg";
import Islam from "../../../assets/classes covers/Islam.jpg";
import Geography from "../../../assets/classes covers/gegrophya.jpg";
import Chemistry from "../../../assets/classes covers/chimster.jpg";
import Alwatania from "../../../assets/classes covers/alwataniajpg.jpg";
export default {
  name: "create-class-component",
  data() {
    return {
      status: "close",
      // title
      title: "",
      // note
      note: "",
      // class level
      class_level: "First_grade",
      // subject
      subject: "Math",
      // teacher
      teacher: "",
      // covers list
      covers: {
        Math,
        Arabic,
        English,
        French,
        History,
        Philosophy,
        Physics,
        Sciences,
        Islam,
        Geography,
        Chemistry,
        Alwatania,
      },
      // cover
      cover: Math,
      // api
      api: "",
      // form data
      formData: "",
    };
  },
  mounted() {
    // to open the page smooth
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // create class method
    async CreateClass() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create header
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // update the api
      if (this.$store.state.user.user_type == "super") {
        // update the api
        this.api = this.$store.state.APIs.classes.super.craete;

        // add the super admin id to form data
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        // update admin
        this.api = this.$store.state.APIs.classes.admin.craete;

        // add the admin id to form data
        this.formData.append("admin_id", this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "teacher") {
        // update api
        this.api = this.$store.state.APIs.classes.teacher.create;

        // add the teacher id to form data
        this.formData.append("teacher_id", this.$store.state.user.user._id);
      }

      // add the title
      this.formData.append("title", this.title);

      // add the note
      this.formData.append("note", this.note);

      // add the subject
      this.formData.append("subject", this.subject);

      // add the class level
      this.formData.append("class_level", this.class_level);

      // add the teacher id
      this.formData.append("teacher_id", this.$store.state.choosed_teacher._id);

      await axios
        .post(this.api, this.formData, { headers })
        .then((response) => {
          console.log(response);

          // emptying the choosed teacher
          this.$store.state.choosed_teacher = "";
        })
        .catsh((error) => {
          console.log(error);
        });
    },
  },
  watch: {
    // watch the cover on change
    subject(newCover) {
      // update the cover
      this.cover = this.covers[newCover];
    },
  },
};
</script>
