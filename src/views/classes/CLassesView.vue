<template>
  <div
    :class="`classes-${this.$store.state.mood}-${this.$store.state.language}`"
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
        this.$store.state.classes && this.$store.state.classes.length > 0
          ? `cont-open`
          : `cont-close`
      "
    >
      <!-- small nav scomponent  -->
      <SmallNavComponentVue />
      <!-- small nav scomponent  -->

      <!-- create class shurt cut component  -->
      <CreateClassShurtCutBtnComponentVue
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
            ? this.$store.state.English.classes_page.page_title
            : this.$store.state.Arabic.classes_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <!-- search by title  -->
      <SearchINputComponentVue />
      <!-- search by title  -->

      <!-- classes container -->
      <div class="classes-cont">
        <p class="results">
          {{
            this.$store.state.language == "English"
              ? this.$store.state.English.classes_page.results_message
              : this.$store.state.Arabic.classes_page.results_message
          }}
        </p>
        <ClassesPageClassComponentVue
          v-for="(classOb, index) in this.$store.state.classes"
          :key="index"
          :class_data="classOb"
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
import SearchINputComponentVue from "@/components/class/SearchINputComponent.vue";
import ClassesPageClassComponentVue from "@/components/class/ClassesPageClassComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import CreateClassShurtCutBtnComponentVue from "@/components/global/shurtCutsButtons/CreateClassShurtCutBtnComponent.vue";

export default {
  name: "classes-page",
  data() {
    return {
      scroll_page: 0,
      // page index
      page: 1,
      // limit od classes documents
      limit: 20,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    SearchINputComponentVue,
    ClassesPageClassComponentVue,
    LoadingComponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
    CreateClassShurtCutBtnComponentVue,
  },
  mounted() {
    // to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call the get classes method on load the page
    this.GetCLasses();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get classes method
    async GetCLasses() {
      await axios
        .get(this.$store.state.APIs.classes.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((Response) => {
          // copy the classes from response and add that to classes array in store
          this.$store.state.classes = [
            ...this.$store.state.classes,
            ...Response.data.classes_data,
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

        // call the get classes method to get more classes
        await this.GetCLasses();
      }

      // to start scroll to top component
      this.scroll_page = window.scrollY;
    },
  },
};
</script>
