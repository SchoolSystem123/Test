<template>
  <div
    :class="`search-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <p>
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.admins_page.search_admin_name
          : this.$store.state.Arabic.admins_page.search_admin_name
      }}
    </p>
    <div class="cont">
      <input
        type="text"
        v-model="this.name"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.admins_page.placeholder
            : this.$store.state.Arabic.admins_page.placeholder
        "
      />
      <icon icon="search" @click="getAdminsByName" />
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
    async getAdminsByName() {
      // to start loading animation
      this.$store.state.loading = "open";

      axios
        .get(this.$store.state.APIs.admins.get_all, {
          params: {
            name: this.name,
          },
        })
        .then((response) => {
          // check if the response has any admin
          if (response.data.admins_data.length > 0) {
            // set the admins data from response to admins array in store
            this.$store.state.admins = response.data.admins_data;
          } else {
            // open the error message form
            this.$store.state.error_form_status = "open";

            // set the error message to error message var ni store
            this.$store.state.error_message = {
              english: "Sorry, no admin with this name was found",
              arabic: "عذرا لا يوجد مدير بهذا الاسم",
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
