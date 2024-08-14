<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_parent_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_parent_form.title
          : this.$store.state.Arabic.delete_parent_form.title
      }}
    </div>

    <button class="delete" @click="DeleteStudent">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_parent_form.delete
          : this.$store.state.Arabic.delete_parent_form.delete
      }}
    </button>
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteParentForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_parent_form.cancel
          : this.$store.state.Arabic.delete_parent_form.cancel
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
          parent_id: this.$store.state.parent_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        data = {
          admin_id: this.$store.state.user.user._id,
          parent_id: this.$store.state.parent_id_for_delete,
        };
      }

      await axios
        .delete(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.parents.super.delete
            : this.$store.state.APIs.parents.admin.delete,
          { data, headers }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete parent form
          this.$store.commit("OpenOrCloseDeleteParentForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete parent form
          this.$store.commit("OpenOrCloseDeleteParentForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
