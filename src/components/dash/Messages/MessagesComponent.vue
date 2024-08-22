<template>
  <div
    :class="`messages-cont-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">Messgaes</div>
    <!-- header  -->

    <!-- messages container  -->
    <div class="messgaes-cont">
      <p class="default_message">No Any Message</p>
      <MessageInDashComponenet
        v-for="(message_data, index) in this.$store.state.messages"
        :key="index"
      />
    </div>
    <!-- messages container  -->
  </div>
</template>

<script>
import axios from "axios";
import MessageInDashComponenet from "./MessageInDashComponenet.vue";
export default {
  name: "message-component",
  data() {
    return {
      // to open the component smooth
      status: "close",
    };
  },
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);

    // call to the get messages method
    this.GetMessages();
  },
  components: {
    MessageInDashComponenet,
  },
  methods: {
    // get messages method
    async GetMessages() {
      // to start the loading
      this.$store.state.loading = "open";
      console.log("sended the request ...");
      await axios
        .get(this.$store.state.APIs.messages.get_all)
        .then((response) => {
          console.log(response);
          // to stop the loading
          this.$store.state.loading = "close";

          // set the messages data from response to messages array in store
          this.$store.state.messages = response.data.messages_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
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
  },
};
</script>
