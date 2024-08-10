<template>
  <div
    :class="`delete-admin-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_admin_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_admin_form.title
          : this.$store.state.Arabic.delete_admin_form.title
      }}
    </div>

    <button class="delete" @click="DeleteAdmin">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_admin_form.delete
          : this.$store.state.Arabic.delete_admin_form.delete
      }}
    </button>
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteAdminForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_admin_form.cancel
          : this.$store.state.Arabic.delete_admin_form.cancel
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
    // delete admin method
    async DeleteAdmin() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // create headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // create body data
      const data = {
        super_admin_id: this.$store.state.user.user._id,
        admin_id: this.$store.state.admin_id_for_delete,
      };

      await axios
        .delete(this.$store.state.APIs.admins.super.delete, { data, headers })
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete admin form
          this.$store.commit("OpenOrCloseDeleteAdminForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete admin form
          this.$store.commit("OpenOrCloseDeleteAdminForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
