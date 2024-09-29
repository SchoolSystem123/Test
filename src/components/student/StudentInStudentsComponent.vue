<template>
  <div
    :class="`students-student-page-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
    id="student"
    @click="getToaStudent(this.student_data._id)"
  >
    <!-- student avatar  -->
    <img :src="this.student_data.avatar" alt="" />
    <!-- student avatar  -->

    <div class="info">
      <!-- student name  -->
      <h3>{{ this.student_data.name }}</h3>
      <!-- student name  -->

      <!-- student points  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.student_component.points
            : this.$store.state.Arabic.student_component.points
        }}
        {{ this.student_data.points }}
      </p>
      <!-- student points  -->
      <!-- student GPA  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.student_component.gpa
            : this.$store.state.Arabic.student_component.gpa
        }}
        {{ this.student_data.total_gpa }}
      </p>
      <!-- student GPA  -->
      <!-- student class level  -->
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.student_component.class_level
            : this.$store.state.Arabic.student_component.class_level
        }}
        {{ this.student_data.class_level }}
      </p>
      <!-- student class level  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "student-in-students-page",
  data() {
    return {};
  },
  props: {
    student_data: Object,
    view_style: String,
  },
  components: {},
  methods: {
    // go to student profiel
    getToaStudent(id) {
      window.location = `/student/${id}`;
    },
  },
};
</script>

<style lang="scss">
@import "../../Sass/varibels/variables";
// darck style
.students-student-page-darck-English-list {
  width: 90%;
  height: 90px;
  margin: 5px 5%;
  border-radius: 10px;
  display: flex;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;

  // admin avatar
  img {
    width: 80px;
    height: 80px;
    margin: 5px;
    border-radius: 5px;
  }

  .info {
    width: 80%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 2px 1%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }
  }

  .buttons {
    width: 15%;
    height: 100%;
    margin: 0px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    button {
      width: 100%;
      height: 40%;
      border: none;
      border-radius: 5px;
      color: #ffffff;
      cursor: pointer;
      background-color: #008fe2;
    }
  }
}

.students-student-page-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-page-darck-English-window-restore {
  @extend .students-student-page-darck-English-list;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;

  // admin avatar
  img {
    width: 96%;
    height: 160px;
    margin: 2%;
    border-radius: 10px;
  }

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-light;
    }

    p {
      color: $font-light;
      max-width: 90%;
      height: auto;
      margin: 1px 2%;
      font-size: $x-small;
      padding: 2px;
      border-radius: 3px;
      background-color: $note-darck;
    }
  }
}

.students-student-page-darck-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.students-student-page-light-English-list {
  @extend .students-student-page-darck-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.students-student-page-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-page-light-English-window-restore {
  @extend .students-student-page-darck-English-window-restore;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;
  background-color: $card-light;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.students-student-page-light-English-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// darck style
.students-student-page-darck-Arabic-list {
  @extend .students-student-page-darck-English-list;
}

.students-student-page-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-page-darck-Arabic-window-restore {
  @extend .students-student-page-darck-English-window-restore;
}

.students-student-page-darck-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style

// light style
.students-student-page-light-Arabic-list {
  @extend .students-student-page-light-English-list;
  background-color: $card-light;

  .info {
    // admin name
    h3 {
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.students-student-page-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-page-light-Arabic-window-restore {
  @extend .students-student-page-darck-English-window-restore;
  background-color: $card-light;
  width: 45%;
  margin: 10px 2%;
  height: auto;
  flex-wrap: wrap;

  .info {
    width: 100%;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0px 5px 5px 5px;

    // admin name
    h3 {
      width: 100%;
      color: $font-darck;
    }

    p {
      color: $font-darck;
      background-color: $note-light;
    }
  }
}

.students-student-page-light-Arabic-window-restore:hover {
  box-shadow: 0 0 5px $black;
}
// darck style
</style>
