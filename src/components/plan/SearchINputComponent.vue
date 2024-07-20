<template>
  <div
    :class="`search-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.plans_page.search_classes_title
          : this.$store.state.Arabic.plans_page.search_classes_title
      }}
    </p>
    <div class="cont">
      <input
        type="text"
        v-model="this.title"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.plans_page.placeholder
            : this.$store.state.Arabic.plans_page.placeholder
        "
      />
      <icon icon="search" @click="getParentByName" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  title: "search-component",
  data() {
    return {
      // class title
      title: "",
      // classes limit
      limit: 500,
    };
  },
  methods: {
    async getParentByName() {
      // to start loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.plans.get_all, {
          params: {
            // plan title
            title: this.title,
            // limit of plans
            limit: this.limit,
          },
        })
        .then((response) => {
          // check if the response has any plan
          if (response.data.plans_data.length > 0) {
            this.$store.state.plans = response.data.plans_data;
          } else {
            // open the error message form
            this.$store.state.error_form_status = "open";

            // set the error message to error message var ni store
            this.$store.state.error_message = {
              english: "Sorry, no plan with this title was found",
              arabic: "عذرا لا يوجد خطة  بهذا العنوان",
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
