<template>
  <div
    :class="`cover-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.cover_form_status}`"
  >
    <div class="header">
      <h2>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_class.cover_form_header
            : this.$store.state.Arabic.update_class.cover_form_header
        }}
      </h2>
      <icon
        icon="xmark"
        @click="this.$store.commit('Change_cover_form_status')"
      />
    </div>

    <ul>
      <!-- file input to select the new cover -->
      <input type="file" id="cover" ref="ChangeCover" />
      <!-- file input to select the new cover -->
      <label for="cover">
        <li @click="this.$store.commit('Change_cover_form_status')">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.update_class.new
              : this.$store.state.Arabic.update_class.new
          }}
        </li>
      </label>

      <li @click="Deletecover">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.update_class.delete
            : this.$store.state.Arabic.update_class.delete
        }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "cover-form",
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
    this.$refs.ChangeCover.addEventListener("change", this.handleFileChange);
  },
  methods: {
    handleFileChange(event) {
      this.$store.state.selected_cover = event.target.files;
    },

    Deletecover() {
      // update delete cover var in store
      this.$store.state.delete_cover = "true";

      // close the cover confirm form
      this.$store.commit("Change_cover_form_status");
    },
  },
};
</script>
