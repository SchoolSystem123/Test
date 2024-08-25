<template>
  <div
    :class="`messages-page-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <LoadingComponentVue />
    <ErrorComponentVue />

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title  -->
      <h2>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messages_page.page_title
            : this.$store.state.Arabic.messages_page.page_title
        }}
      </h2>
      <!-- page title  -->

      <!-- no messages result message  -->
      <div
        class="none-messages"
        v-if="
          this.$store.state.messages && this.$store.state.messages.length == 0
        "
      >
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messages_page.result_message
            : this.$store.state.Arabic.messages_page.result_message
        }}
      </div>
      <!-- no messages result message  -->

      <!-- messages cont -->
      <div class="messages-cont">
        <MessagesComponentVue
          v-for="(Message_data, index) in this.$store.state.messages"
          :key="index"
          :Message_data="Message_data"
        />
      </div>
      <!-- messages cont -->
    </div>
  </div>
</template>

<script>
//? importing components
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import MessagesComponentVue from "@/components/MessagesComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import axios from "axios";

export default {
  name: "messages-page",
  data() {
    return {
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    MessagesComponentVue,
    ErrorComponentVue,
  },
  mounted() {
    // to start the loading animation on load the page
    window.addEventListener("load", () => {
      // start the loading animation
      this.$store.state.loading = "open";
    });

    // check if the user loged in
    if (!this.$store.state.user) {
      // sedn the user to log in page
      window.location = `/login`;
    } else {
      // call to get messages method
      this.GetAllMessages();
    }
  },
  methods: {
    // get all messages method
    async GetAllMessages() {
      // create params
      let params;
      if (
        this.$store.state.user.user_type != "super" &&
        this.$store.state.user.user_type != "admin"
      ) {
        params = {
          recipient: `${this.$store.state.user.user_type}s`,
        };
      }
      await axios
        .get(this.$store.state.APIs.messages.get_all, {
          params,
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

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
