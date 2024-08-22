<template>
  <div
    :class="`create-message-${this.$store.state.mood}-${this.$store.state.language}-${this.status}`"
  >
    <!-- header  -->
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.page_title
          : this.$store.state.Arabic.create_message.page_title
      }}
    </div>
    <!-- header  -->

    <!-- form  -->
    <div class="form">
      <!-- title  -->
      <label for="title">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.title
          : this.$store.state.Arabic.create_message.title
      }}</label>

      <input
        type="text"
        id="title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_message.title_placeholder
            : this.$store.state.Arabic.create_message.title_placeholder
        "
      />
      <!-- title  -->

      <!-- description  -->
      <label for="description">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.description
          : this.$store.state.Arabic.create_message.description
      }}</label>

      <textarea
        id="description"
        v-model="this.description"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_message.description_placeholder
            : this.$store.state.Arabic.create_message.description_placeholder
        "
      >
      </textarea>
      <!-- description  -->

      <!-- note  -->
      <label for="note">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.note
          : this.$store.state.Arabic.create_message.note
      }}</label>

      <textarea
        id="note"
        v-model="this.note"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.create_message.note_placeholder
            : this.$store.state.Arabic.create_message.note_placeholder
        "
      >
      </textarea>
      <!-- note  -->

      <!-- recipient  -->
      <label for="recipient">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.Recipient
          : this.$store.state.Arabic.create_message.Recipient
      }}</label>

      <select name="" id="recipient" v-model="this.recipient">
        <option
          v-for="(recipient, index) in this.$store.state.recipient_list"
          :key="index"
          :value="recipient.value"
        >
          {{
            this.$store.state.language == "English"
              ? recipient.English
              : recipient.Arabic
          }}
        </option>
      </select>
      <!-- recipient  -->

      <!-- level  -->
      <label for="level">{{
        this.$store.state.language == "English"
          ? this.$store.state.English.create_message.level
          : this.$store.state.Arabic.create_message.level
      }}</label>

      <select name="" id="level" v-model="this.level">
        <option
          v-for="(level, index) in this.$store.state.messages_level_list"
          :key="index"
          :value="level.value"
        >
          {{
            this.$store.state.language == "English"
              ? level.English
              : level.Arabic
          }}
        </option>
      </select>
      <!-- level  -->

      <button @click="CreateMessage">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.create_message.button
            : this.$store.state.Arabic.create_message.button
        }}
      </button>
    </div>
    <!-- form  -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "create-message-component",
  data() {
    return {
      // status
      status: "close",
      // title
      title: "",
      // description
      description: "",
      // note
      note: "",
      // recipient
      recipient: "public",
      // level
      level: "normal",
      // formData
      formData: "",
    };
  },
  components: {},
  mounted() {
    setTimeout(() => {
      this.status = "open";
    }, 500);
  },
  methods: {
    // create message mthod
    async CreateMessage() {
      // to craete new formData
      this.formData = new FormData();

      // to start the loading animation
      this.$store.state.loading = "open";

      // craete headers
      const headers = {
        Authorization: `Bearer ${this.$store.state.user.token}`,
      };

      // add the editor id to body data
      if (this.$store.state.user.user_type == "super") {
        this.formData.append("super_admin_id", this.$store.state.user.user._id);
        console.log(`super admin id`, this.$store.state.user.user._id);
      } else if (this.$store.state.user.user_type == "admin") {
        console.log(`admin id`, this.$store.state.user.user._id);
        this.formData.append("admin_id", this.$store.state.user.user._id);
      }

      // add the title to body data
      this.formData.append("title", this.title);

      // add description to body data
      this.formData.append("description", this.description);

      // add the note to body data
      this.formData.append("note", this.note);

      // add the recipient to body data
      this.formData.append("recipient", this.recipient);

      // add the level to body data
      this.formData.append("level", this.level);

      await axios
        .post(
          this.$store.state.user.user_type == "super"
            ? this.$store.state.APIs.messages.super.create
            : this.$store.state.APIs.messages.admin.create,
          this.formData,
          {
            headers,
          }
        )
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          console.log(response);
          // update the active_component_in_dash in store
          this.$store.state.active_component_in_dash = "messages";
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
