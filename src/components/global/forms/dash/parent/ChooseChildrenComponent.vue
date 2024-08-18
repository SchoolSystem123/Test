<template>
  <div
    :class="`choose-children-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.choose_children_status}`"
  >
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.title
            : this.$store.state.Arabic.choose_children_form.title
        }}
      </h3>
      <icon icon="xmark" @click="CloseForm" />
    </div>

    <div class="search">
      <input
        v-model="this.student_id"
        type="text"
        :placeholder="
          this.$store.state.language == `English`
            ? this.$store.state.English.choose_children_form.placeholder
            : this.$store.state.Arabic.choose_children_form.placeholder
        "
      />
      <button @click="GetStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.button
            : this.$store.state.Arabic.choose_children_form.button
        }}
      </button>
    </div>

    <div class="cards">
      <h4>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.choose_children_form.section_title
            : this.$store.state.Arabic.choose_children_form.section_title
        }}
      </h4>

      <div class="card" v-if="this.$store.state.geted_student">
        <img :src="this.$store.state.geted_student.avatar" alt="avatar" />

        <div class="info">
          <h3>{{ this.$store.state.geted_student.name }}</h3>

          <p>
            ⚧️ : {{ this.$store.state.geted_student.gender }}
            {{ this.$store.state.geted_student.gender == "male" ? "🚹" : "🚺" }}
          </p>
          <p v-if="this.$store.state.geted_student.class">
            {{ this.$store.state.geted_student.class.length }}
          </p>
          <p>🏫🪜🎚️ : {{ this.$store.state.geted_student.class_level }}</p>
          <p>📆 : {{ this.$store.state.geted_student.birth_date }}</p>
          <p>📝📑🔖 : {{ this.$store.state.geted_student.finished_exams }}</p>
          <p>📍 : {{ this.$store.state.geted_student.points }}</p>
          <p>📌 : {{ this.$store.state.geted_student.total_gpa }}</p>
        </div>

        <!-- add button  -->
        <button @click="addChild">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.choose_children_form.add_button
              : this.$store.state.Arabic.choose_children_form.add_button
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
  name: "choose-children",
  data() {
    return {
      // student id
      student_id: "",
    };
  },
  methods: {
    // Get Student by id
    async GetStudent() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.students.get_one, {
          params: {
            student_id: this.student_id.split(":")[1],
          },
        })
        .then((response) => {
          // to stope the loading animation
          this.$store.state.loading = "close";

          // set the geted student to student data in store
          this.$store.state.geted_student = response.data.user_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to emptying the geted_student in store
          this.$store.state.geted_student = "";

          // open the error from
          this.$store.state.error_form_status = "open";

          // set the error message to error message in store
          this.$store.state.error_message = error.response.data.message;
        });
    },

    // add the child
    addChild() {
      // find and check to exists studnet in array
      const existingStudent = this.$store.state.choosed_children.find(
        (student) => student._id === this.$store.state.geted_student._id
      );

      if (!existingStudent) {
        // add the student
        this.$store.state.choosed_children.push({
          name: this.$store.state.geted_student.name,
          avatar: this.$store.state.geted_student.avatar,
          _id: this.$store.state.geted_student._id,
        });
      }
    },

    // close form
    CloseForm() {
      // to emptyin thegeted student in store
      this.$store.state.geted_student = "";

      // to close the form
      this.$store.commit("ChooseChildren");

      // to emptying the student idvar in data
      this.student_id = "";
    },
  },
};
</script>
