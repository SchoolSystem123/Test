<template>
  <div
    :class="`messages-cont-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messages_component.title
            : this.$store.state.Arabic.messages_component.title
        }}
      </h3>

      <div class="count">
        {{ this.messages_count }}
      </div>
    </div>
    <!-- header  -->

    <!-- messages container  -->
    <div class="messgaes-cont">
      <p class="default_message" v-if="this.$store.state.messages.length == 0">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.messages_component.default_message
            : this.$store.state.Arabic.messages_component.default_message
        }}
      </p>
      <MessageInDashComponenet
        v-for="(message_data, index) in this.$store.state.messages"
        :key="index"
        :message_data="message_data"
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
      // messages count
      messages_count: 0,
      // to open the component smooth
      status: "close",
    };
  },
  mounted() {
    // call to get messages count
    this.GetClassesCount();

    // call to the get messages method
    this.GetMessages();
  },
  components: {
    MessageInDashComponenet,
  },
  methods: {
    // get classes count
    async GetClassesCount() {
      await axios
        .get(this.$store.state.APIs.messages.get_count, {
          params: {
            recipient: this.$store.state.user.user_type,
          },
        })
        .then((response) => {
          // set the classes count from response to the class count in data
          this.messages_count = response.data.Messages_count;
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

    // get messages method
    async GetMessages() {
      // to start the loading
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.messages.get_all)
        .then((response) => {
          // to stop the loading
          this.$store.state.loading = "close";

          // to open the componenet smooth
          this.status = "open";

          // set the messages data from response to messages array in store
          this.$store.state.messages = response.data.messages_data;

          // to stop the loading animation
          this.$store.state.loading = "close";
        })
        .catch((error) => {
          // to open the componenet smooth
          this.status = "open";

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
@import "../../../Sass/varibels/variables";
// darck and light English messages component style
.messages-cont-darck-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .messgaes-cont {
    width: 100%;
    height: auto;
    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-light;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-darck;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.messages-cont-darck-English-open::-webkit-scrollbar {
  width: 0px;
}

.messages-cont-darck-English-close {
  @extend .messages-cont-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.messages-cont-light-English-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .messgaes-cont {
    width: 100%;
    height: auto;
    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-darck;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-light;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.messages-cont-light-English-open::-webkit-scrollbar {
  width: 0px;
}

.messages-cont-light-English-close {
  @extend .messages-cont-darck-English-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

// darck and light English messages component style

// darck and light Arabic messages component style
.messages-cont-darck-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .messgaes-cont {
    width: 100%;
    height: auto;
    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-light;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-darck;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.messages-cont-darck-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.messages-cont-darck-Arabic-close {
  @extend .messages-cont-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.messages-cont-light-Arabic-open {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;

    h3 {
      width: 90%;
      height: 100%;
    }

    .count {
      width: auto;
      height: 100%;
      font-size: $x-small;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
    }
  }

  .messgaes-cont {
    width: 100%;
    height: auto;
    @media (min-width: $phone) {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }

    .default_message {
      width: 100%;
      height: auto;
      padding: 5px 0px;
      color: $font-darck;
      margin: 10px 0px;
      padding: 5px;
      border-radius: 5px;
      background-color: $message-light;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      margin: 50px 0px;
    }
  }
}

.messages-cont-light-Arabic-open::-webkit-scrollbar {
  width: 0px;
}

.messages-cont-light-Arabic-close {
  @extend .messages-cont-darck-Arabic-open;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}
// darck and light Arabic messages component style
</style>
