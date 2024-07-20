<template>
  <div
    :class="`verify-delete-hw-${this.$store.state.delete_hw_form_status}-${this.$store.state.language}`"
  >
    <h3 class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.delete_hw_form.message
          : this.$store.state.Arabic.delete_hw_form.message
      }}
    </h3>
    <button class="delete" @click="deleteHW">Delete</button>
    <button class="cancel" @click="this.$store.commit('OpenOrCloseDeleteHW')">
      Cancel
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "verify-delete-home-work-form",
  data() {
    return {
      api: "",
      body: "",
    };
  },
  mounted() {
    if (this.$store.state.user.user_type == "super") {
      this.api = this.$store.state.APIs.home_works.super.delete;
    } else if (this.$store.state.user.user_type == "admin") {
      this.api = this.$store.state.APIs.home_works.admin.delete;
    } else if (this.$store.state.user.user_type == "teacher") {
      this.api = this.$store.state.APIs.home_works.teacher.delete;
    }
  },
  props: {
    home_work_id: String,
  },
  methods: {
    SelectBody() {
      if (this.$store.state.user.user_type == "super") {
        this.body = {
          super_admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      } else if (this.$store.state.user.user_type == "admin") {
        this.body = {
          admin_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      } else if (this.$store.state.user.user_type == "teacher") {
        this.body = {
          teacher_id: this.$store.state.user.user._id,
          home_work_id: this.$store.state.home_work._id,
        };
      }
    },

    // delete home work method
    async deleteHW() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // to close confirm form
      this.$store.state.delete_hw_form_status = "close"

      // call to select the body method
      this.SelectBody();

      // create headers
      const config = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      }

      try {
        await axios
          .delete(this.api, { data : this.body , headers : config })
          .then(() => {
            // to stope the loading animation
            this.$store.state.loading = "close";

            // to remove the class data from store to reload whene send user to class page
            this.$store.state.class = "";

            // send the user to class page
            window.location = `/class/${this.$store.state.home_work.class_id._id}`
          })
          .catch((error) => {
            // to stope the loading animation
            this.$store.state.loading = "close";

            // to set the error message to error message var in store
            this.$store.state.error_message = error.response.data.message;

            // to open the error from 
            this.$store.state.error_form_status = "open";
            console.log(error);
          });
      } catch (error) {
        console.log(`error is : ${error}`)
        // to set the error message to error message var in store
        this.$store.state.error_message = error.response.data.message;

        // to open the error from 
        this.$store.state.error_form_status = "open";
      }
    },
  },
};
</script>
