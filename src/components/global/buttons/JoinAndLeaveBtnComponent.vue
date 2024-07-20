<template>
  <button
    @click="JoinToClass"
    :class="`btn-${this.$store.state.theme}`"
    v-if="this.method_type == 'Join'"
  >
    {{
      this.$store.state.language == "English"
        ? this.$store.state.English.class_page.buttons.join
        : this.$store.state.Arabic.class_page.buttons.join
    }}
  </button>

  <button
    @click="LeaveToClass"
    :class="`btn-${this.$store.state.theme}`"
    v-if="this.method_type == 'Leave'"
  >
    {{
      this.$store.state.language == "Arabic"
        ? this.$store.state.Arabic.class_page.buttons.leave
        : this.$store.state.English.class_page.buttons.leave
    }}
  </button>
  <!-- <p>{{this.$store.state.user.user}}</p> -->
</template>

<script>
import axios from "axios";

export default {
  name: "join-leave-btn-component",
  data() {
    return {
      // check if the user's classes array is has a class_id prop
      method_type: this.$store.state.user.user.classes.includes(this.class_id)
        ? "Leave"
        : "Join" || "Join", // default button value
      user: JSON.parse(window.localStorage.getItem("Ss-user")), // get the user from localStorage
    };
  },
  props: {
    class_id: String,
  },
  methods: {
    // join to class method
    async JoinToClass() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // craete body data
      const body_data = {
        student_id: this.$store.state.user.user._id,
        class_id: this.class_id,
      };

      try {
        axios
          .put(this.$store.state.APIs.classes.join_leave.join, body_data, {
            headers,
          })
          .then((response) => {
            // set the classdata after joind to class in store
            this.$store.state.class.students =
              response.data.class_data.students;

            // add the class id to user in localStorage
            this.user.user.classes.push(this.class_id);

            // save the user in localStorage
            window.localStorage.setItem("Ss-user", JSON.stringify(this.user));

            // to stop the loading animation
            this.$store.state.loading = "close";
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // set the error message to error message in store
            this.$store.state.error_message = error.response.data.message;

            // open the error form
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to stop the loading animation
        this.$store.state.loading = "close";

        // set the error message to error message in store
        this.$store.state.error_message = error.response.data.message;

        // open the error form
        this.$store.state.error_form_status = "open";
      }

      // to change the method type
      this.ChangeMethod();
    },

    // leave from class method
    async LeaveToClass() {
      // to start the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // craete body data
      const body_data = {
        student_id: this.$store.state.user.user._id,
        class_id: this.class_id,
      };

      try {
        axios
          .put(this.$store.state.APIs.classes.join_leave.leave, body_data, {
            headers,
          })
          .then((response) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // set the classdata after joind to class in store
            this.$store.state.class.students =
              response.data.class_data.students;

            // delete the class id from user's classes array
            this.user.user.classes = this.user.user.classes.filter(
              (classId) => classId != this.class_id
            );

            // save the user in localStorage
            window.localStorage.setItem("Ss-user", JSON.stringify(this.user));
          })
          .catch((error) => {
            // to stop the loading animation
            this.$store.state.loading = "close";

            // set the error message to error message in store
            this.$store.state.error_message = error.response.data.message;

            // open the error form
            this.$store.state.error_form_status = "open";
          });
      } catch (error) {
        // to stop the loading animation
        this.$store.state.loading = "close";

        // set the error message to error message in store
        this.$store.state.error_message = error.response.data.message;

        // open the error form
        this.$store.state.error_form_status = "open";
      }

      // to change the method type
      this.ChangeMethod();
    },

    // change method type
    ChangeMethod() {
      this.method_type = this.method_type == "Join" ? "Leave" : "Join";
    },
  },
};
</script>
