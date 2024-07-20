<template>
  <div
    :class="`home_works-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <!-- loading component  -->
    <LoadingComponentVue />
    <!-- loading component  -->

    <!-- error form component  -->
    <ErrorComponentVue />
    <!-- error form component  -->

    <div
      :class="
        this.$store.state.home_works && this.$store.state.home_works.length > 0
          ? `cont-open`
          : `cont-close`
      "
    >
      <!-- small nav scomponent  -->
      <SmallNavComponentVue />
      <!-- small nav scomponent  -->

      <!-- create class shurt cut component  -->
      <CreateHWShurtCutBtnComponentVue
        v-if="
          this.$store.state.user &&
          this.$store.state.user.user_type != 'student' &&
          this.$store.state.user.user_type != 'parent'
        "
      />
      <!-- create class shurt cut component  -->

      <!-- page title  -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.home_works_page.page_title
            : this.$store.state.Arabic.home_works_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <!-- search by title  -->
      <SearchINputComponentVue />
      <!-- search by title  -->

      <!-- home_works container -->
      <div class="home_works-cont">
        <p class="results">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.home_works_page.results_message
              : this.$store.state.Arabic.home_works_page.results_message
          }}
        </p>
        <HWPageHWComponentVue
          v-for="(home_work_data, index) in this.$store.state.home_works"
          :key="index"
          :home_work_data="home_work_data"
        />
      </div>

      <ScrollTopComponentVue :scroll_page="this.scroll_page" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import SearchINputComponentVue from "@/components/homeWorks/SearchINputComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CreateHWShurtCutBtnComponentVue from "@/components/global/shurtCutsButtons/CreateHWShurtCutBtnComponent.vue";
import HWPageHWComponentVue from '@/components/homeWorks/HWPageHWComponent.vue';

export default {
  name: "home_works-page",
  data() {
    return {
      scroll_page: 0,
      // page index
      page: 1,
      // limit od home_works documents
      limit: 20,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    SearchINputComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
    CreateHWShurtCutBtnComponentVue,
    HWPageHWComponentVue
  },
  mounted() {
    // to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call the get home_works method on load the page
    this.GetHomeWorks();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get home_works method
    async GetHomeWorks() {
          console.log("Response")

      await axios
        .get(this.$store.state.APIs.home_works.get_home_work_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          console.log(Response)
          // copy the home_works from response and add that to home_works array in store
          this.$store.state.home_works = [
            ...this.$store.state.home_works,
            ...Response.data.home_works_data,
          ];

          // to stope the loading animation
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

    // handleScroll
    async handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        // to change page
        this.page += 1;

        // call the get home_works method to get more home_works
        await this.GetHomeWorks();
      }

      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
