<template>
  <div
    :class="`update-subject-form-${this.$store.state.mood}-${this.$store.state.language}-${this.$store.state.update_subject_form_status}`"
  >
    <div class="header">
      {{
        this.$store.state.language == "English"
          ? this.$store.state.English.add_day_to_plan_form.title
          : this.$store.state.Arabic.add_day_to_plan_form.title
      }}
      <icon
        icon="xmark"
        @click="this.$store.commit('OpenOrCloseUpdateSubjectForm')"
      />
    </div>

    <div class="form">
      <!-- Day  -->
      <label for="day">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.day
            : this.$store.state.Arabic.add_day_to_plan_form.day
        }}</label
      >

      <input
        type="text"
        id="day"
        v-model="this.day"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.add_day_to_plan_form.day_placeholder
            : this.$store.state.Arabic.add_day_to_plan_form.day_placeholder
        "
      />
      <!-- day  -->

      <!-- subject  -->
      <label for="subject">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.subjects
            : this.$store.state.Arabic.add_day_to_plan_form.subjects
        }}</label
      >

      <input
        type="text"
        id="subject"
        v-model="this.subject"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.add_day_to_plan_form.subject_placeholder
            : this.$store.state.Arabic.add_day_to_plan_form.subject_placeholder
        "
      />
      <!-- subject  -->

      <!-- start  -->
      <label for="start">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.start
            : this.$store.state.Arabic.add_day_to_plan_form.start
        }}</label
      >

      <input
        type="text"
        id="start"
        v-model="this.start"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.add_day_to_plan_form.start_placeholder
            : this.$store.state.Arabic.add_day_to_plan_form.start_placeholder
        "
      />
      <!-- start  -->

      <!-- end  -->
      <label for="end">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.end
            : this.$store.state.Arabic.add_day_to_plan_form.end
        }}</label
      >

      <input
        type="text"
        id="end"
        v-model="this.end"
        :placeholder="
          this.$store.state.language == 'English'
            ? this.$store.state.English.add_day_to_plan_form.end_placeholder
            : this.$store.state.Arabic.add_day_to_plan_form.end_placeholder
        "
      />
      <!-- end  -->

      <!-- add subject button  -->
      <button class="add-subject" @click="addSubject">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.add_subject
            : this.$store.state.Arabic.add_day_to_plan_form.add_subject
        }}
      </button>
      <!-- add day button  -->

      <!-- add day button  -->
      <button class="add-day" @click="addDay">
        {{
          this.$store.state.language == "English"
            ? this.$store.state.English.add_day_to_plan_form.add
            : this.$store.state.Arabic.add_day_to_plan_form.add
        }}
      </button>
      <!-- add day button  -->
    </div>
  </div>
</template>

<script>
export default {
  name: "add-subject",
  data() {
    return {
      // day
      day: "",
      // subject
      subject: "",
      // start
      start: "",
      // end
      end: "",
      // subjects array
      subjects: [],
    };
  },
  methods: {
    // emptyingAllData
    emptyingAllData() {
      // emptying day
      this.day = "";
      // emptying subject
      this.subject = "";
      // emptying start time
      this.start = "";
      // emptying end time
      this.end = "";
    },

    // emptyingSubject
    emptyingSubject() {
      // emptying subject
      this.subject = "";
      // emptying start time
      this.start = "";
      // emptying end time
      this.end = "";
    },

    // add the day to plan info in store
    addDay() {
      this.$store.state.plan_info.push({
        day: this.day,
        subjects: this.subjects,
      });

      // call to emptyingAllData method
      this.emptyingAllData();

      // emptying the subjects array
      this.subjects = [];
      console.log(this.$store.state.plan_info);
    },

    // add subject to subjects's array
    addSubject() {
      this.subjects.push({
        subject: this.subject,
        start: this.start,
        end: this.end,
      });

      // call to emptyingSubject method
      this.emptyingSubject();
    },
  },
};
</script>

<style lang="scss">
@import "../../../../../Sass/varibels/variables";

// darck and light English style
.update-subject-form-darck-English-open {
  width: 70%;
  min-height: 100px;
  position: absolute;
  z-index: 40;
  top: 10%;
  left: 15%;
  border-radius: 5px;
  background-color: $card-darck;
  transition-duration: 0.5s;
  direction: ltr;

  @media (max-width: $phone) {
    width: 90%;
    left: 5%;
    top: 20%;
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
      right: 15px;
      top: 13px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 96%;
    height: auto;
    margin: 0px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      pupdateing: 5px 0px;
      margin: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    input {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      background-color: $body-light;
      border-radius: 5px;
      pupdateing: 0px 10px;
    }

    .update-day {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      border: none;
      outline: none;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 5px 0px;
    }

    .update-subject {
      @extend .update-day;
      background-color: $blue;
    }
  }
}

.update-subject-form-darck-English-close {
  @extend .update-subject-form-darck-English-open;
  top: -100%;
}

.update-subject-form-light-English-open {
  width: 70%;
  min-height: 100px;
  position: absolute;
  z-index: 40;
  top: 10%;
  left: 15%;
  border-radius: 5px;
  background-color: $card-light;
  transition-duration: 0.5s;
  direction: ltr;

  @media (max-width: $phone) {
    width: 90%;
    left: 5%;
    top: 20%;
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
      right: 15px;
      top: 13px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 96%;
    height: auto;
    margin: 0px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      pupdateing: 5px 0px;
      margin: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    input {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      background-color: $body-light;
      border-radius: 5px;
      pupdateing: 0px 10px;
    }

    .update-day {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      border: none;
      outline: none;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 5px 0px;
    }

    .update-subject {
      @extend .update-day;
      background-color: $blue;
    }
  }
}

.update-subject-form-light-English-close {
  @extend .update-subject-form-light-English-open;
  top: -100%;
}
// darck and light English style

// darck and light Arabic style
.update-subject-form-darck-Arabic-open {
  width: 70%;
  min-height: 100px;
  position: absolute;
  z-index: 40;
  top: 10%;
  left: 15%;
  border-radius: 5px;
  background-color: $card-darck;
  transition-duration: 0.5s;
  direction: rtl;

  @media (max-width: $phone) {
    width: 90%;
    left: 5%;
    top: 20%;
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
      left: 15px;
      top: 13px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 96%;
    height: auto;
    margin: 0px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      pupdateing: 5px 0px;
      margin: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-light transparent;
      color: $font-light;
    }

    input {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      background-color: $body-light;
      border-radius: 5px;
      pupdateing: 0px 10px;
    }

    .update-day {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      border: none;
      outline: none;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 5px 0px;
    }

    .update-subject {
      @extend .update-day;
      background-color: $blue;
    }
  }
}

.update-subject-form-darck-Arabic-close {
  @extend .update-subject-form-darck-Arabic-open;
  top: -100%;
}

.update-subject-form-light-Arabic-open {
  width: 70%;
  min-height: 100px;
  position: absolute;
  z-index: 40;
  top: 10%;
  left: 15%;
  border-radius: 5px;
  background-color: $card-light;
  transition-duration: 0.5s;
  direction: rtl;

  @media (max-width: $phone) {
    width: 90%;
    left: 5%;
    top: 20%;
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
      left: 15px;
      top: 13px;
      font-size: $large;
      cursor: pointer;
    }
  }

  .form {
    width: 96%;
    height: auto;
    margin: 0px 2%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;

    label {
      width: 100%;
      height: auto;
      pupdateing: 5px 0px;
      margin: 5px 0px;
      border: 1px solid;
      border-color: transparent transparent $border-darck transparent;
      color: $font-darck;
    }

    input {
      width: 100%;
      height: 40px;
      margin: 5px 0px;
      border: none;
      outline: none;
      background-color: $body-light;
      border-radius: 5px;
      pupdateing: 0px 10px;
    }

    .update-day {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      border: none;
      outline: none;
      background-color: $green;
      color: $font-light;
      cursor: pointer;
      margin: 5px 0px;
    }

    .update-subject {
      @extend .update-day;
      background-color: $blue;
    }
  }
}

.update-subject-form-light-Arabic-close {
  @extend .update-subject-form-light-Arabic-open;
  top: -100%;
}
// darck and light Arabic style
</style>
