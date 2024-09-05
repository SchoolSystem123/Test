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
        <div class="count">{{ this.teachers_count }}</div>
      </div>
      <StartRateTeachersComponentVue />
    </div>
    <!-- admins header  -->

    <div class="cards-section">
      <TeacherInTeachersComponent
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
import TeacherInTeachersComponent from "@/components/teacher/TeacherInTeachersComponent.vue";
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
      // teachers count
      teachers_count: 0,
    };
  },
  components: {
    TeacherInTeachersComponent,
    StartRateTeachersComponentVue,
  },
  mounted() {
    // call to get teachers count
    this.GetTeachersCount();

    // call to Get teachers methdo
    this.GetTeachers();
  },
  methods: {
    //get to all teachers count
    async GetTeachersCount() {
      await axios
        .get(this.$store.state.APIs.teachers.get_count)
        .then((response) => {
          // set the students count to the students count in data
          this.teachers_count = response.data.teachers_count;
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

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light style
.section-cont-open-darck {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    p {
      padding: 7px 20px;
      border-radius: 5px;
      color: $font-light;
      background-color: $note-darck;
      margin: 5px;
      font-size: $small;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    button {
      padding: 7px 17px;
      border-radius: 5px;
      color: $font-light;
      background-color: $blue;
      cursor: pointer;
      border: none;
      outline: none;
      margin: 5px;
      @media (max-width: $phone) {
        font-size: $x-small;
        padding: 6px 10px;
      }
    }

    // header title
    .title {
      width: 100%;
      height: 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      h3 {
        width: auto;
        height: auto;
        color: $font-light;
      }

      svg {
        padding: 3px;
        border-radius: 3px;
        color: $font-light;
        border: 1px solid $border-light;
        cursor: pointer;
      }
    }
  }

  .cards-section {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    align-items: center;
  }
}

.section-cont-open-darck::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck {
  @extend .section-cont-open-darck;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light {
  @extend .section-cont-open-darck;
  .header {
    // header title
    .title {
      border-color: transparent transparent $border-darck transparent;
      h3 {
        color: $font-darck;
      }
    }
  }
}

.section-cont-close-light {
  @extend .section-cont-open-light;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light::-webkit-scrollbar {
  width: 0px;
}
// darck and light style
</style>
