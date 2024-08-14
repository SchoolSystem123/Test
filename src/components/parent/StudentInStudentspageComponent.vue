<template>
  <div
    :class="`students-student-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
  >
    <!-- student avatar  -->
    <img
      :src="this.student_data.avatar"
      alt="avatar"
      @click="GetToStudent(this.student_data._id)"
    />
    <!-- student avatar  -->

    <div class="info" @click="GetToStudent(this.student_data._id)">
      <!-- student name  -->
      <h3>{{ this.student_data.name }}</h3>
      <!-- student name  -->

      <!-- student classes length  -->
      <p>🏛️ : {{ this.student_data.classes.length }}</p>
      <!-- student classes length  -->

      <!-- student classes length  -->
      <p>
        ⚧️ : {{ this.student_data.gender }}
        {{ this.student_data.gender == "male" ? "🚹" : "🚺" }}
      </p>
      <!-- student classes length  -->

      <!-- student points -->
      <p>📍 : {{ this.student_data.points }}</p>
      <!-- student points  -->

      <!-- student total_gpa -->
      <p>📌 : {{ this.student_data.total_gpa }}</p>
      <!-- student total_gpa  -->

      <!-- student class lavel -->
      <p>🏫🪜🎚️ : {{ this.student_data.class_level }}</p>
      <!-- student class lavel  -->
    </div>

    <div
      class="buttons"
      v-if="
        (this.Dash && !this.$store.state.user.user_type == 'admin') ||
        this.$store.state.user.user_type == 'super'
      "
    >
      <!-- admins buttons -->
      <button @click="GoToUpdateStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.update
            : this.$store.state.Arabic.dash_teachers_component.update
        }}
      </button>
      <button @click="DeleteStudent">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.dash_teachers_component.delete
            : this.$store.state.Arabic.dash_teachers_component.delete
        }}
      </button>
      <!-- admins buttons -->
    </div>
  </div>
</template>

<script>
export default {
  name: "student-in-students-apge-component",
  data() {
    return {};
  },
  props: {
    student_data: Object,
    view_style: String,
    Dash: Boolean,
  },
  components: {},
  methods: {
    GetToStudent(id) {
      window.location = `/student/${id}`;
    },

    // delete Student
    DeleteStudent() {
      // update student id for delete in store
      this.$store.state.student_id_for_delete = this.student_data._id;

      console.log(this.$store.state.delete_student_form_status);

      // open the delete admin form verify
      this.$store.commit("OpenOrCloseDeleteStudentForm");
    },

    // Go update student
    GoToUpdateStudent() {
      // update the student_id_for_update var in store
      this.$store.state.student_for_update = this.student_data;

      // update the active component name
      this.$store.state.active_component_in_dash = "update-student";
    },
  },
};
</script>
