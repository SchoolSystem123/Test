<template>
  <div
    :class="`avatar-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.avatar_form_status}`"
  >
    <div class="header">
      <h2>Avatra actions</h2>
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
          New Avatar
        </li>
      </label>
      <li @click="DeleteAvatar">Delete Avatar</li>
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
    },

    DeleteAvatar() {
      // update delete avatar var in store
      this.$store.state.delete_avatar = true;

      // close the avatar confirm form
      this.$store.commit("Changeavatar_form_status");
    },
  },
};
</script>
