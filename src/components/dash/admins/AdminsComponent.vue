<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}`"
    @scroll="handleScroll"
  >
    <!-- admins header  -->
    <div class="header">
      <div class="title">
        <h3>
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.dash_admins_component.title
              : this.$store.state.Arabic.dash_admins_component.title
          }}
        </h3>
      </div>
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <AdminInAdminpagecomponentVue
        v-for="(admin_data, index) in this.$store.state.admins"
        :key="index"
        :admin_data="admin_data"
        :view_style="this.view_style"
        :Dash="true"
      />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AdminInAdminpagecomponentVue from "@/components/admin/AdminInAdminspagecomponent.vue";

export default {
  name: "admins-component",
  data() {
    return {
      status: "close",
      // default elements style
      view_style: "list",
      // limit of admins documents
      limit: 20,
      // page of admins documents
      page: 1,
      // window scroll page
      scroll_page: 0,
    };
  },
  mounted() {
    // call to Get Admins methdo
    this.GetAdmins();

    // window.addEventListener("scroll", this.handleScroll);
  },
  components: {
    AdminInAdminpagecomponentVue,
  },
  methods: {
    // get admins method
    async GetAdmins() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.admins.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = "open";

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the admins data from response to admins array in store
          this.$store.state.admins = response.data.admins_data;
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

    // get more admins method
    async GetMoreAdmins() {
      await axios
        .get(this.$store.state.APIs.admins.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the admins data from response to admins array in store
          this.$store.state.admins = [
            ...this.$store.state.admins,
            ...response.data.admins_data,
          ];
        })
        .catch((error) => {
          // to set the reqeust's error message to error message var in store
          this.$store.state.error_message = error.response.data.message;

          // to open the error form
          this.$store.state.error_form_status = "open";
        });
    },

    // handel scroll method
    handleScroll(event) {
      this.scroll_page = event.target.scrollTop;
      // check if the window height is donw
      if (this.scroll_page > 350) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call to Get More Admins method
        this.GetMoreAdmins();
      }
    },
  },
};
</script>
