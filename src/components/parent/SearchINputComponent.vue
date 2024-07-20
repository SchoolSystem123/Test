<template>
  <div
    :class="`search-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.parents_page.search_classes_title
          : this.$store.state.Arabic.parents_page.search_classes_title
      }}
    </p>
    <div class="cont">
      <input
        type="text"
        v-model="this.name"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.parents_page.placeholder
            : this.$store.state.Arabic.parents_page.placeholder
        "
      />
      <icon icon="search" @click="getParentByName" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "search-component",
  data() {
    return {
      // class title
      name: "",
      // classes limit
      limit: 500,
    };
  },
  methods: {
    async getParentByName() {
      // to start loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            // parent name
            name: this.name,
            // limit of parents
            limit: this.limit,
          },
        })
        .then((response) => {
          // check if the response has any parent
          if (response.data.parents_data.length > 0) {
            this.$store.state.parents = response.data.parents_data;
          } else {
            // open the error message form
            this.$store.state.error_form_status = "open";

            // set the error message to error message var ni store
            this.$store.state.error_message = {
              english: "Sorry, no parent with this name was found",
              arabic: "عذرا لا يوجد وليّ امر  بهذا الاسم",
            };
          }

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
