<template>
  <div :class="`student-${this.$store.state.mood}-${this.view_style}`" @click="GoToStudent(this.student_data._id)">
    <!-- avatar -->
    <img :src="this.student_data.avatar" alt="avatar">

    <h2>{{ this.student_data.name }}</h2>
  </div>
</template>

<script>
export default {
  name : "student-component",
  props : {
    student_data : Object,
    view_style : String
  },
  methods : {
    GoToStudent(id) {
      // add the student id after new page link
      window.location = `/student/${id}`;
    }
  }
}
</script>
