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
              ? this.$store.state.English.dash_parents_component.title
              : this.$store.state.Arabic.dash_parents_component.title
          }}
        </h3>
      </div>
      <StartRateTeachersComponentVue />
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <ParentInParentsPageComponentDash
        v-for="(parents_data, index) in this.$store.state.parents"
        :key="index"
        :parents_data="parents_data"
        :view_style="this.view_style"
        :Dash="true"
      />
    </div>
  </div>
</template>

<script>
import ParentInParentsPageComponentDash from "@/components/parent/ParentInParentsPageComponentDash.vue";
import axios from "axios";
export default {
  name: "students-component",
  data() {
    return {
      status: "close",
      // limit of teachers documents
      limit: 20,
      // page of teachers
      page: 1,
      // elements view style
      view_style: "list",
    };
  },
  components: {
    ParentInParentsPageComponentDash,
  },
  mounted() {
    // call to Get parents methdo
    this.GetParents();
  },
  methods: {
    // get parents
    async GetParents() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // to stop the loading animation
          this.$store.state.loading = "close";

          // update the status to open the page
          this.status = "open";

          // set the parents data from response to parents array in store
          this.$store.state.parents = response.data.parents_data;
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

    // get more parents method
    async GetMoreParents() {
      await axios
        .get(this.$store.state.APIs.parents.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the parents data from response to parents array in store
          this.$store.state.parents = [
            ...this.$store.state.parents,
            ...response.data.parents_data,
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

        // call to Get Parents method
        this.GetMoreParents();
      }
    },
  },
};
</script>
