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
              ? this.$store.state.English.dash_teachers_component.title
              : this.$store.state.Arabic.dash_teachers_component.title
          }}
        </h3>
      </div>
      <StartRateTeachersComponentVue />
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <TeacherInTeachersVpageComponentVue
        v-for="(teacher_data, index) in this.$store.state.teachers"
        :key="index"
        :teacher_data="teacher_data"
        :view_style="this.view_style"
        :Dash="true"
      />
    </div>
  </div>
</template>

<script>
import TeacherInTeachersVpageComponentVue from "@/components/teacher/TeacherInTeacherspageComponent.vue";
import StartRateTeachersComponentVue from "@/components/global/buttons/StartRateTeachersComponent.vue";
import axios from "axios";
export default {
  name: "teachers-component",
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
    TeacherInTeachersVpageComponentVue,
    StartRateTeachersComponentVue,
  },
  mounted() {
    // call to Get teachers methdo
    this.GetTeachers();
  },
  methods: {
    // get teachers
    async GetTeachers() {
      // to start the loading animation
      this.$store.state.loading = "open";

      await axios
        .get(this.$store.state.APIs.teachers.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          console.log(response);
          // to stop the loading animation
          this.$store.state.loading = "close";

          // update the status to open the page
          this.status = "open";

          // set the teachers data from response to teachers array in store
          this.$store.state.teachers = response.data.teachers_data;

          this.$store.state.rate_status =
            response.data.teachers_data.length > 0 &&
            response.data.teachers_data[0].rate_status == true
              ? false
              : true;
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

    // get more teachers method
    async GetMoreTeachers() {
      await axios
        .get(this.$store.state.APIs.teachers.get_all, {
          params: {
            limit: this.limit,
            page: this.page,
          },
        })
        .then((response) => {
          // set the teachers data from response to teachers array in store
          this.$store.state.teachers = [
            ...this.$store.state.teachers,
            ...response.data.teachers_data,
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

        // call to Get Teachers method
        this.GetMoreTeachers();
      }
    },
  },
};
</script>
