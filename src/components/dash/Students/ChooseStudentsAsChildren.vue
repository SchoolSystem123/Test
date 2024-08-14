<template>
  <div
    :class="`children-container-${this.$store.state.mood}-${this.$store.state.choose_children}`"
  >
    <div
      @click="test"
      class="child"
      v-for="(child, index) in this.$store.state.students"
      :key="index"
    >
      <img :src="child.avatar" alt="avatar" />
      <h4>{{ child.name }}</h4>
      <p>{{ child.level }}</p>
      <p>{{ child.birth_date }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "children-component",
  data() {
    return {
      // limit of documents
      limit: 20,
      // page of documents
      page: 1,
    };
  },
  mounted() {
    // call to GetStudents methods
    this.GetStudents();
    // if (this.$store.state.choose_children == "open") {
    // }
  },
  methods: {
    // get students
    async GetStudents() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.students.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the students data from response to students array in store
          this.$store.state.students = response.data.students_data;
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
    test() {},
  },
};
</script>
