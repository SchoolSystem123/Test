<template>
  <div
    :class="`section-cont-${this.status}-${this.$store.state.mood}-${this.$store.state.language}`"
    @scroll="handleScroll"
  >
    <!-- admins header  -->
    <div class="header">
      <div class="teachers-title">
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

// darck and light English style
.section-cont-open-darck-English {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: ltr;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

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

    // header title
    .teachers-title {
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

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
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

.section-cont-open-darck-English::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-English {
  @extend .section-cont-open-darck-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English {
  @extend .section-cont-open-darck-English;
  .header {
    border-color: transparent transparent $border-darck transparent;
    // header title
    .teachers-title {
      border-color: transparent transparent $border-darck transparent;
      h3 {
        color: $font-darck;
      }

      .count {
        color: $font-darck;
      }
    }
  }
}

.section-cont-close-light-English {
  @extend .section-cont-open-light-English;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-English::-webkit-scrollbar {
  width: 0px;
}
// darck and light English style

// darck and light Arabic style
.section-cont-open-darck-Arabic {
  width: 96%;
  height: 96%;
  margin: 2%;
  border-radius: 10px;
  padding: 5% 5px 5px 5px;
  overflow-y: scroll;
  transition-duration: 0.5s;
  opacity: 1;
  direction: rtl;

  @media (min-width: $phone) {
    padding: 5px;
  }

  .header {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;

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

    // header title
    .teachers-title {
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

      .count {
        width: auto;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: $font-light;
        font-size: $x-small;
        background-color: none;
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

.section-cont-open-darck-Arabic::-webkit-scrollbar {
  width: 0px;
}

.section-cont-close-darck-Arabic {
  @extend .section-cont-open-darck-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic {
  @extend .section-cont-open-darck-Arabic;
  .header {
    border-color: transparent transparent $border-darck transparent;
    // header title
    .teachers-title {
      border-color: transparent transparent $border-darck transparent;
      h3 {
        color: $font-darck;
      }

      .count {
        color: $font-darck;
      }
    }
  }
}

.section-cont-close-light-Arabic {
  @extend .section-cont-open-light-Arabic;
  padding: 30% 5px 5px 5px;
  opacity: 0;
}

.section-cont-open-light-Arabic::-webkit-scrollbar {
  width: 0px;
}
// darck and light Arabic style
</style>
