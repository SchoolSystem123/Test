<template>
  <div
    :class="`show-parent-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <SmallNavComponentVue />
    <SidBarComponentVue />
    <ErrorComponentVue />
    <LoadingComponentVue />

    <!-- container  -->
    <div :class="this.status ? 'cont-open' : 'cont-open'"></div>
    <!-- container  -->

    <!-- scroll to top method -->
    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    <!-- scroll to top method -->
  </div>
</template>

<script>
//? importing components
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import axios from "axios";

export default {
  name: "show-parent-page",
  data() {
    return {
      // open or close the compoenet
      status: false,
      // to open or close the scrollTp button
      scroll_page: 0,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    ErrorComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
  },
  mounted() {
    // to start the loading compoenet on load page
    window.addEventListener("load", () => {
      this.$store.state.loading = "open";
    });

    // call to handel scroll method on scroll
    window.addEventListener("sceoll", this.handelScroll);

    // call to get parent data method
    this.GetParent();
  },
  methods: {
    // get to parent data method
    async GetParent() {
      await axios
        .get(this.$store.state.APIs.parents.get_one, {
          params: {
            parent: this.$route.params.id,
          },
        })
        .then((response) => {
          // open the page conatiner
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the parent data from response to parent var in store
          this.$store.state.parent = response.data.parent_data;
          console(response);
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

    // handel scroll method
    handelScroll() {
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
