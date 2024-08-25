<template>
  <div
    :class="`students-student-${this.$store.state.mood}-${this.$store.state.language}-${this.view_style}`"
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
  name: "student-in-students-apge-component",
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

// darck and light English style
.students-student-darck-English-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: ltr;

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
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
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
      color: $font-light;
      cursor: pointer;
      background-color: $blue;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}

.students-student-darck-English-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-light-English-list {
  @extend .students-student-darck-English-list;
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

.students-student-light-English-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light English style

// darck and light Arabic style
.students-student-darck-Arabic-list {
  width: 98%;
  height: 90px;
  margin: 5px 1%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  background-color: $card-darck;
  transition-duration: 0.5s;
  cursor: pointer;
  direction: rtl;

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
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }

    // admin color
    .admin {
      background-color: green;
      color: $font-light;
    }

    // supper admin color
    .super-admin {
      background-color: red;
      color: $font-light;
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
      color: $font-light;
      cursor: pointer;
      background-color: $blue;
      @media (max-width: $phone) {
        font-size: $xx-small;
      }
    }
  }
}

.students-student-darck-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}

.students-student-light-Arabic-list {
  @extend .students-student-darck-Arabic-list;
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

.students-student-light-Arabic-list:hover {
  box-shadow: 0 0 5px $black;
}
// darck and light Arabic style
</style>
