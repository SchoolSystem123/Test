<template>
  <div
    :class="`students-student-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    @click="getToaStudent(this.student_data._id)"
  >
    <!-- student avatar  -->
    <img :src="this.student_data.avatar" alt="" />
    <!-- student avatar  -->

    <div class="info">
      <!-- student name  -->
      <h3>{{ this.student_data.name }}</h3>
      <!-- student name  -->

      <!-- student points  -->
      <p>
        {{ this.$store.state.language == "English"
        ? this.$store.state.English.student_component.points
        : this.$store.state.Arabic.student_component.points }}
        {{ this.student_data.points }}
      </p>
      <!-- student points  -->
      <!-- student GPA  -->
      <p>
        {{ this.$store.state.language == "English"
        ? this.$store.state.English.student_component.gpa
        : this.$store.state.Arabic.student_component.gpa }}
        {{ this.student_data.total_gpa }}
      </p>
      <!-- student GPA  -->
      <!-- student class level  -->
      <p>
        {{ this.$store.state.language == "English"
        ? this.$store.state.English.student_component.class_level
        : this.$store.state.Arabic.student_component.class_level }}
        {{ this.student_data.class_level }}
      </p>
      <!-- student class level  -->
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
  },
  components: {},
  methods: {
    // go to student profiel
    getToaStudent(id) {
      window.location = `/student/${id}`;
    },
  },
};
</script>
