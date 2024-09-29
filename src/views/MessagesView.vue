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
    // to start the loading animation
    setTimeout(() => {
      this.$store.state.loading = "open";
    }, 100);

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

<style lang="scss">
@import "../Sass/varibels/variables";

// Darck and light English
.messages-page-darck-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-darck;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    // page title
    h2 {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5% 20px 5%;
      color: $font-light;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
    }

    .none-messages {
      width: 90%;
      height: auto;
      margin: 20px 5%;
      color: $font-light;
      padding: 3px;
      background-color: $note-darck;
      border-radius: 5px;
      text-align: center;
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}

.messages-page-light-English {
  width: 100%;
  min-height: 100vh;
  background-color: $body-light;
  direction: ltr;

  .cont-open {
    width: 50%;
    min-height: 100vh;
    margin: auto;
    padding: 10% 0% 5% 0%;
    transition-duration: 0.5s;
    opacity: 1;

    @media (max-width: $phone) {
      width: 100%;
      min-height: 100vh;
      padding: 20% 0% 0% 0%;
    }

    // page title
    h2 {
      width: 90%;
      height: auto;
      padding: 5px 0px;
      margin: 5px 5% 20px 5%;
      color: $font-darck;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
    }

    .none-messages {
      width: 90%;
      height: auto;
      margin: 20px 5%;
      color: $font-darck;
      text-align: center;
      padding: 3px;
      background-color: $note-light;
      border-radius: 5px;
    }
  }

  // closed cont style
  .cont-close {
    @extend .cont-open;
    padding: 20% 0px 10px 0px;
    transition-duration: 0.5s;
    opacity: 0;
    @media (max-width: $phone) {
      padding: 40% 0% 0% 0%;
    }
  }
}
// Darck and light English

// Darck and light Arabic
.messages-page-darck-Arabic {
  @extend .messages-page-darck-English;
  direction: rtl;
}

.messages-page-light-Arabic {
  @extend .messages-page-light-English;
  direction: rtl;
}
// Darck and light Arabic
</style>
