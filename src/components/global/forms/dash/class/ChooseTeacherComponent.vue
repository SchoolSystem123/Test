<template>
  <div
    :class="`choose-teacher-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.choose_teacher_status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_teacher_form.title
            : this.$store.state.Arabic.choose_teacher_form.title
        }}
      </h3>
      <icon icon="xmark" @click="CloseForm" />
    </div>

    <div class="search">
      <input
        v-model="this.teacher_id"
        type="text"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.choose_teacher_form.placeholder
            : this.$store.state.Arabic.choose_teacher_form.placeholder
        "
      />
      <button @click="GetTeacher">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_teacher_form.button
            : this.$store.state.Arabic.choose_teacher_form.button
        }}
      </button>
    </div>

    <div class="cards">
      <h4>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_teacher_form.section_title
            : this.$store.state.Arabic.choose_teacher_form.section_title
        }}
      </h4>

      <div class="card" v-if="this.$store.state.geted_teacher">
        <img :src="this.$store.state.geted_teacher.avatar" alt="avatar" />

        <div class="info">
          <h3>{{ this.$store.state.geted_teacher.name }}</h3>

          <p>
            ⚧️ : {{ this.$store.state.geted_teacher.gender }}
            {{ this.$store.state.geted_teacher.gender == "male" ? "🚹" : "🚺" }}
          </p>

          <p v-if="this.$store.state.geted_teacher.class">
            {{ this.$store.state.geted_teacher.class.length }}
          </p>

          <p>🏫🪜🎚️ : {{ this.$store.state.geted_teacher.class_level }}</p>

          <p v-if="this.$store.state.geted_teacher.editor" class="editor">
            {{ this.$store.state.geted_teacher.editor ? "editor" : null }}
          </p>

          <p v-if="this.$store.state.geted_teacher.classes">
            🏛️ : {{ this.$store.state.geted_teacher.classes.length }}
          </p>

          <p>📚📖📑 : {{ this.$store.state.geted_teacher.subject }}</p>

          <p>⭐ : {{ this.$store.state.geted_teacher.rate }}</p>
        </div>

        <!-- add button  -->
        <button @click="SelectTeacher">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.choose_teacher_form.add_button
              : this.$store.state.Arabic.choose_teacher_form.add_button
          }}
        </button>
        <!-- add button -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "choose-teacher",
  data() {
    return {
      // teacher id
      teacher_id: "",
    };
  },
  methods: {
    // Get Teacher by id
    async GetTeacher() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.teachers.get_one, {
          params: {
            teacher_id: this.teacher_id.split(":")[1],
          },
        })
        .then((response) => {
          // to stope the loading animation
          this.$store.state.loading = "close";

          // set the geted student to student data in store
          this.$store.state.geted_teacher = response.data.user_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_teacher in store
          this.$store.state.geted_teacher = "";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // select teacher
    async SelectTeacher() {
      this.$store.state.choosed_teacher = this.$store.state.geted_teacher;
    },

    // close form
    CloseForm() {
      // to emptyin thegeted student in store
      this.$store.state.geted_teacher = "";

      // to close the form
      this.$store.commit("ChooseTeacher");

      // to emptying the student idvar in data
      this.teacher_id = "";
    },
  },
};
</script>
