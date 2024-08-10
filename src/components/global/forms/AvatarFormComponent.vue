<template>
  <div
    :class="`avatar-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.avatar_form_status}`"
  >
    <div class="header">
      <h2>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_profile.avatar_form_header
            : this.$store.state.Arabic.update_profile.avatar_form_header
        }}
      </h2>
      <icon
        icon="xmark"
        @click="this.$store.commit('Changeavatar_form_status')"
      />
    </div>

    <ul>
      <!-- file input to select the new avatar -->
      <input type="file" id="avatar" ref="avatar" />
      <!-- file input to select the new avatar -->
      <label for="avatar">
        <li @click="this.$store.commit('Changeavatar_form_status')">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_profile.new
              : this.$store.state.Arabic.update_profile.new
          }}
        </li>
      </label>

      <li @click="DeleteAvatar">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_profile.delete
            : this.$store.state.Arabic.update_profile.delete
        }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "avatar-form",
  data() {
    return {
      selectedFiles: "",
    };
  },
  props: {
    input: String,
  },
  mounted() {
    //  call to the handleFileChange method on select any image
    this.$refs.avatar.addEventListener("change", this.handleFileChange);
  },
  methods: {
    handleFileChange(event) {
      this.$store.state.selectd_images = event.target.files;
      console.log(event.target.files);
    },

    DeleteAvatar() {
      // update delete avatar var in store
      this.$store.state.delete_avatar = "true";

      // close the avatar confirm form
      this.$store.commit("Changeavatar_form_status");
    },
  },
};
</script>
