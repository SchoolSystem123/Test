<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_student_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_student_form.title
          : this.$store.state.Arabic.delete_student_form.title
      }}
    </div>

    <button class="delete" @click="DeleteStudent">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_student_form.delete
          : this.$store.state.Arabic.delete_student_form.delete
      }}
    </button>
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteStudentForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_student_form.cancel
          : this.$store.state.Arabic.delete_student_form.cancel
      }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-admin",
  data() {
    return {};
  },
  methods: {
    // delete student method
    async DeleteStudent() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // create body data
      let data;

      // check if the user is super
      if (this.$store.state.user.user_type == "super") {
        data = {
          super_admin_id: this.$store.state.user.user._id,
          student_id: this.$store.state.student_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        data = {
          admin_id: this.$store.state.user.user._id,
          student_id: this.$store.state.student_id_for_delete,
        };
      }

      await axios
        .delete(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.students.super.delete
            : this.$store.state.APIs.students.admin.delete,
          { data, headers }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete student form
          this.$store.commit("OpenOrCloseDeleteStudentForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete student form
          this.$store.commit("OpenOrCloseDeleteStudentForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
