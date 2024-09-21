<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_home_work_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_home_work_form.title
          : this.$store.state.Arabic.delete_home_work_form.title
      }}
    </div>

    <!-- delete button  -->
    <button class="delete" @click="DeleteHomWork">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_home_work_form.delete
          : this.$store.state.Arabic.delete_home_work_form.delete
      }}
    </button>
    <!-- delete button  -->

    <!-- cancel button   -->
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteHomeWorkForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_home_work_form.cancel
          : this.$store.state.Arabic.delete_home_work_form.cancel
      }}
    </button>
    <!-- cancel button   -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-home-work",
  data() {
    return {
      // api
      api: "",
    };
  },
  methods: {
    // delete message method
    async DeleteHomWork() {
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
        // update the api
        this.api = this.$store.state.APIs.home_works.super.delete;

        // update the body data
        data = {
          super_admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        // update the api
        this.api = this.$store.state.APIs.home_works.admin.delete;

        // update the body data
        data = {
          admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        // update the api
        this.api = this.$store.state.APIs.home_works.teacher.delete;

        // update the body data
        data = {
          teacher_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work_id_for_delete,
        };
      }

      await axios
        .delete(this.api, { data, headers })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete teacher form
          this.$store.commit("OpenOrCloseDeleteHomeWorkForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete admin form
          this.$store.commit("OpenOrCloseDeleteHomeWorkForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
