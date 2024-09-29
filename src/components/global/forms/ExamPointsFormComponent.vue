<template>
  <div
    :class="`exam-points-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.exam_points_form}`"
  >
    <!-- header  -->
    <div class="header">
      <h3>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.exam_points_form.header
            : this.$store.state.Arabic.exam_points_form.header
        }}
      </h3>
      <icon
        icon="xmark"
        @click="this.$store.commit('OpenOrCloseTheExamPointsForm')"
      />
    </div>
    <!-- header  -->

    <!-- section   -->
    <div class="section">
      <p>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.exam_points_form.points
            : this.$store.state.Arabic.exam_points_form.points
        }}
        {{ this.Exam_Data.points }} /
        {{ this.Exam_Data.total_questions_points }}
      </p>
      <!-- leav link  -->
      <router-link to="/profile" replace>
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.exam_points_form.leave
            : this.$store.state.Arabic.exam_points_form.leave
        }}
      </router-link>
      <!-- leav link  -->
    </div>
    <!-- section   -->
  </div>
</template>

<script>
export default {
  name: "exam-points-form",
  data() {
    return {
      // time befor leaving
      time: 5,
    };
  },
  props: {
    Exam_Data: Object,
  },
};
</script>

<style lang="scss">
@import "../../../Sass/varibels/variables";

// darck and light English style
.exam-points-form-darck-English-open {
  width: 50%;
  height: 30%;
  position: absolute;
  left: 25%;
  top: 35%;
  z-index: 100;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px $black;
  border-radius: 5px;
  transition-duration: 0.5s;
  direction: ltr;

  @media (max-width: $phone) {
    width: 90%;
    height: 20%;
    top: 40%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .section {
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;

    p {
      width: 60%;
      height: 40px;
      margin: 10px 20%;
      padding: 0px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    a {
      width: 60%;
      height: 40px;
      margin: 0px 20%;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      color: $font-light;
      background-color: $green;
    }
  }
}

.exam-points-form-darck-English-close {
  @extend .exam-points-form-darck-English-open;
  top: -50%;
  z-index: 0;
}

.exam-points-form-light-English-open {
  width: 50%;
  height: 30%;
  position: absolute;
  left: 25%;
  top: 35%;
  z-index: 100;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px $black;
  border-radius: 5px;
  transition-duration: 0.5s;
  direction: ltr;

  @media (max-width: $phone) {
    width: 90%;
    height: 20%;
    top: 40%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .section {
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;

    p {
      width: 60%;
      height: 40px;
      margin: 10px 20%;
      padding: 0px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    a {
      width: 60%;
      height: 40px;
      margin: 0px 20%;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      color: $font-darck;
      background-color: $green;
    }
  }
}

.exam-points-form-light-English-close {
  @extend .exam-points-form-light-English-open;
  top: -50%;
  z-index: 0;
}
// darck and light English style

// darck and light Arabic style
.exam-points-form-darck-Arabic-open {
  width: 50%;
  height: 30%;
  position: absolute;
  left: 25%;
  top: 35%;
  z-index: 100;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px $black;
  border-radius: 5px;
  transition-duration: 0.5s;
  direction: rtl;

  @media (max-width: $phone) {
    width: 90%;
    height: 20%;
    top: 40%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: transparent transparent $border-light transparent;
    color: $font-light;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .section {
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;

    p {
      width: 60%;
      height: 40px;
      margin: 10px 20%;
      padding: 0px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    a {
      width: 60%;
      height: 40px;
      margin: 0px 20%;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      color: $font-light;
      background-color: $green;
    }
  }
}

.exam-points-form-darck-Arabic-close {
  @extend .exam-points-form-darck-Arabic-open;
  top: -50%;
  z-index: 0;
}

.exam-points-form-light-Arabic-open {
  width: 50%;
  height: 30%;
  position: absolute;
  left: 25%;
  top: 35%;
  z-index: 100;
  backdrop-filter: blur(50px);
  box-shadow: 0 0 10px $black;
  border-radius: 5px;
  transition-duration: 0.5s;
  direction: rtl;

  @media (max-width: $phone) {
    width: 90%;
    height: 20%;
    top: 40%;
    left: 5%;
  }

  .header {
    width: 100%;
    height: 40px;
    border: 1px solid;
    border-color: transparent transparent $border-darck transparent;
    color: $font-darck;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    svg {
      position: absolute;
      right: 5px;
      top: 10px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .section {
    width: 100%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;

    p {
      width: 60%;
      height: 40px;
      margin: 10px 20%;
      padding: 0px 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    a {
      width: 60%;
      height: 40px;
      margin: 0px 20%;
      border: none;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      outline: none;
      color: $font-light;
      background-color: $green;
    }
  }
}

.exam-points-form-light-Arabic-close {
  @extend .exam-points-form-light-Arabic-open;
  top: -50%;
  z-index: 0;
}
// darck and light Arabic style
</style>
