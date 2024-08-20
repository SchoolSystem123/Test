<template>
  <div
    :class="`delete-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.delete_class_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.title
          : this.$store.state.Arabic.delete_class_form.title
      }}
    </div>

    <button class="delete" @click="DeleteClass">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.delete
          : this.$store.state.Arabic.delete_class_form.delete
      }}
    </button>
    <button
      class="cancel"
      @click="this.$store.commit('OpenOrCloseDeleteClassForm')"
    >
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_class_form.cancel
          : this.$store.state.Arabic.delete_class_form.cancel
      }}
    </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "verify-delete-class",
  data() {
    return {};
  },
  methods: {
    // delete class method
    async DeleteClass() {
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
          class_id: this.$store.state.class_id_for_delete,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        data = {
          admin_id: this.$store.state.user.user._id,
          class_id: this.$store.state.class_id_for_delete,
        };
      }

      await axios
        .delete(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.classes.super.delete
            : this.$store.state.APIs.classes.admin.delete,
          { data, headers }
        )
        .then(() => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete class form
          this.$store.commit("OpenOrCloseDeleteClassForm");

          window.location.reload();
        })
        .catch((error) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // close the verify delete class form
          this.$store.commit("OpenOrCloseDeleteClassForm");

          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },
  },
};
</script>
