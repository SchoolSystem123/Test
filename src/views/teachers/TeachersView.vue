<template>
  <div
    :class="`teachers-${this.$store.state.mood}-${this.$store.state.language}`"
  >
    <!-- small nav bar component  -->
    <SmallNavComponentVue />
    <!-- small nav bar component  -->

    <!-- sidbar component  -->
    <SidBarComponentVue />
    <!-- sidbar component  -->

    <!-- loading animation component  -->
    <LoadingComponentVue />
    <!-- loading animation component  -->

    <!-- error form component  -->
    <ErrorComponentVue />
    <!-- error form component  -->

    <div :class="this.status ? 'cont-open' : 'cont-close'">
      <!-- page title  -->
      <h3 class="page-title">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.teachers_page.page_title
            : this.$store.state.Arabic.teachers_page.page_title
        }}
      </h3>
      <!-- page title  -->

      <SearchByNameComponentVue />

      <!-- results conatiner  -->
      <div :class="`result-cont-${this.view_style}`">
        <!-- results headers  -->
        <div class="results-heade">
          <p>
            {{
              this.$store.state.language == "English"
                ? this.$store.state.English.teachers_page.results_message
                : this.$store.state.Arabic.teachers_page.results_message
            }}
          </p>
          <icon :icon="this.view_style" @click="ChangeIconStyle" />
        </div>
        <!-- results headers  -->

        <!-- admin component   -->
        <TeacherInTeachersVpageComponentVue
          v-for="(teacher_data, index) in this.$store.state.teachers"
          :key="index"
          :teacher_data="teacher_data"
          :view_style="this.view_style"
        />
        <!-- admin component   -->
      </div>
    </div>

    <ScrollTopComponentVue :scroll_page="this.scroll_page" />
  </div>
</template>

<script>
import axios from "axios";
import SmallNavComponentVue from "@/components/global/nav/SmallNavComponent.vue";
import SidBarComponentVue from "@/components/global/SidBarComponent.vue";
import LoadingComponentVue from "@/components/global/LoadingComponent.vue";
import SearchByNameComponentVue from "@/components/teacher/SearchByNameComponent.vue";
import ScrollTopComponentVue from "@/components/global/ScrollTopComponent.vue";
import ErrorComponentVue from "@/components/global/ErrorComponent.vue";
import TeacherInTeachersVpageComponentVue from "../../components/teacher/TeacherInTeacherspageComponent.vue";

export default {
  name: "admin-page",
  data() {
    return {
      view_style: "list",
      // limit of admins documents
      limit: 20,
      // page index
      page: 1,
      scroll_page: 0,
      // open or close the compoenet
      status: false,
    };
  },
  components: {
    SmallNavComponentVue,
    SidBarComponentVue,
    LoadingComponentVue,
    SearchByNameComponentVue,
    ScrollTopComponentVue,
    ErrorComponentVue,
    TeacherInTeachersVpageComponentVue,
  },
  mounted() {
    // to start the loading animation on loaded the page
    window.addEventListener("load", () => {
      // to start the loading animation
      this.$store.state.loading = "open";
    });

    // call the get teachers method on load the page
    this.GetTeachers();

    // handel scroll
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    // get teachers method
    async GetTeachers() {
      await axios
        .get(this.$store.state.APIs.teachers.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          console.log(response.data);
          // open the page conatiner
          this.status = true;

          // to stop the loading animation
          this.$store.state.loading = "close";

          // set the teachers data from response to teachers array in store
          this.$store.state.teachers = [
            ...this.$store.state.teachers,
            ...response.data.teachers_data,
          ];
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

    // change view style method
    ChangeIconStyle() {
      this.view_style = this.view_style == "list" ? "window-restore" : "list";
    },

    // handleScroll
    handleScroll() {
      // check if the window height is donw
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 600
      ) {
        this.scroll_page = window.scrollY;

        // to change page
        this.page += 1;

        // call the get teachers method to get more teachers
        this.GetTeachers();
      }
    },
  },
};
</script>
